/*jshint node: true, undef: true, unused: true */

var fs = require('fs');
var glob = require('glob');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// ----- getGlobPaths ----- //

/**
 * takes glob src and returns expanded paths
 * @param {Array} src
 * @returns {Array} paths
 */
function getGlobPaths( src ) {
  // copy src
  var paths = src.slice(0);
  // replace all glob paths with expanded paths
  src.forEach( function( path, i ) {
    if ( glob.hasMagic( path ) ) {
      var files = glob.sync( path );
      // replace glob with paths
      paths.splice.apply( paths, [ i, 1 ].concat( files ) );
    }
  });
  return paths;
}

// ----- prod assets ----- //

var prodAssetsSrc = [
  'fonts/*.*'
];

// copy prod assets
gulp.task( 'prod-assets', function() {
  gulp.src( prodAssetsSrc, { base: '.' } )
    .pipe( gulp.dest('build') );
});

// ----- dist ----- //

// copy flickity dist to build/
gulp.task( 'dist', function() {
  gulp.src( 'bower_components/flickity/dist/*.*' )
    .pipe( gulp.dest('build') );
});

// ----- js ----- //

var jsSrc = [
  // dependencies
  'bower_components/get-style-property/get-style-property.js',
  'bower_components/get-size/get-size.js',
  'bower_components/matches-selector/matches-selector.js',
  'bower_components/eventEmitter/EventEmitter.js',
  'bower_components/eventie/eventie.js',
  'bower_components/doc-ready/doc-ready.js',
  'bower_components/classie/classie.js',
  'bower_components/fizzy-ui-utils/utils.js',
  'bower_components/unipointer/unipointer.js',
  'bower_components/unidragger/unidragger.js',
  'bower_components/tap-listener/tap-listener.js',
  // flickity
  'bower_components/flickity/js/cell.js',
  'bower_components/flickity/js/animate.js',
  'bower_components/flickity/js/flickity.js',
  'bower_components/flickity/js/drag.js',
  'bower_components/flickity/js/prev-next-button.js',
  'bower_components/flickity/js/page-dots.js',
  'bower_components/flickity/js/player.js',
  'bower_components/flickity/js/add-remove-cell.js',
  // flickity-imagesloaded
  'bower_components/imagesloaded/imagesloaded.js',
  'bower_components/flickity-imagesloaded/flickity-imagesloaded.js',
  // flickity-as-nav-for
  'bower_components/flickity-as-nav-for/as-nav-for.js',
  // docs
  'js/controller.js',
  'js/modules/*.js'
];


// concat & minify js
gulp.task( 'js', function() {
  gulp.src( jsSrc )
    .pipe( uglify() )
    .pipe( concat('flickity-docs.min.js') )
    .pipe( gulp.dest('build/js') );
});

// ----- hint ----- //

var jshint = require('gulp-jshint');

gulp.task( 'hint-js', function() {
  return gulp.src('js/**/*.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint-tasks', function() {
  return gulp.src([ 'gulpfile.js', 'tasks/*.js' ])
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint', [ 'hint-js', 'hint-tasks' ]);

// ----- css ----- //

var cssSrc = [
  // dependencies
  'bower_components/normalize.css/normalize.css',
  // flickity
  'bower_components/flickity/css/flickity.css',
  // docs
  'css/web-fonts.css',
  'css/base.css',
  'css/gallery.css',
  'css/modules/*.css'
];

gulp.task( 'css', function() {
  gulp.src( cssSrc )
    .pipe( concat('flickity-docs.css') )
    .pipe( gulp.dest('build/css') );
});

gulp.task( 'css-export', function() {
  // remove web-fonts.css
  var exportCssSrc = cssSrc.slice(0);
  exportCssSrc.splice( cssSrc.indexOf('css/web-fonts.css'), 1 );
  gulp.src( exportCssSrc )
    .pipe( concat('flickity-docs.css') )
    .pipe( gulp.dest('build/css') );
});

// ----- content ----- //

var contentSrc = [
  'content/*.html',
  'content/*.mustache'
];
var highlightCodeBlock = require('./tasks/highlight-code-block');
var build = require('./tasks/build');
var frontMatter = require('gulp-front-matter');
// var gulpFilter = require('gulp-filter');
var path = require('path');
var through2 = require('through2');

var partialsSrc = 'templates/partials/*.*';
var partials = [];

gulp.task( 'partials', function() {
  var addPartial = through2.obj( function( file, enc, callback ) {
    partials.push({
      name: path.basename( file.path, path.extname( file.path ) ),
      tpl: file.contents.toString()
    });
    this.push( file );
    callback();
  });

  return gulp.src( partialsSrc )
    .pipe( addPartial );
});

// ----- buildContent ----- //

var rename = require('gulp-rename');
var pageNav = require('./tasks/page-nav');

var pageTemplateSrc = 'templates/page.mustache';

function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function buildContent( dataOptions ) {
  var pageTemplate = fs.readFileSync( pageTemplateSrc, 'utf8' );
  // gulp task
  return function() {
    var data = extend( dataOptions || {}, {
      css_paths: getGlobPaths( cssSrc ),
      js_paths: getGlobPaths( jsSrc )
    });

    var buildOptions = {
      layout: pageTemplate,
      partials: partials
    };

    gulp.src( contentSrc )
    .pipe( frontMatter({
        property: 'frontMatter',
        remove: true
      }) )
      .pipe( build( data, buildOptions ) )
      .pipe( highlightCodeBlock() )
      .pipe( pageNav() )
      .pipe( rename({ extname: '.html' }) )
      .pipe( gulp.dest('build') );
  };
}

var dependencyTasks = [ 'partials' ];

gulp.task( 'content', dependencyTasks, buildContent() );

gulp.task( 'content-dev', dependencyTasks, buildContent({ is_dev: true }) );

gulp.task( 'content-export', dependencyTasks, buildContent({ is_export: true }) );

// ----- default ----- //

gulp.task( 'default', [
  'hint',
  'content',
  'js',
  'css',
  'dist',
  'prod-assets'
] );

// ----- dev ----- //

gulp.task( 'dev', [
  'hint',
  'content-dev'
] );

// ----- export ----- //

// version of site used in flickity-docs.zip

gulp.task( 'export', [
  'hint',
  'content-export',
  'js',
  'css-export',
  'dist'
] );

// ----- watch ----- //

gulp.task( 'watch', [ 'default' ], function() {
  gulp.watch( contentSrc, [ 'content' ] );
  gulp.watch( partialsSrc, [ 'content' ] );
  gulp.watch( pageTemplateSrc, [ 'content' ] );
  gulp.watch( 'css/*.css', [ 'css' ] );
});


gulp.task( 'watch-dev', [ 'dev' ], function() {
  gulp.watch( contentSrc, [ 'content-dev' ] );
  gulp.watch( partialsSrc, [ 'content-dev' ] );
  gulp.watch( pageTemplateSrc, [ 'content-dev' ] );
});
