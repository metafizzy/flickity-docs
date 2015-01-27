/*jshint node: true, undef: true, unused: true */

var gulp = require('gulp');
var concat = require('gulp-concat');
var highlightjs = require('highlight.js');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var build = require('gulp-build');

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
  'bower_components/imagesloaded/imagesloaded.js',
  // flickity
  'bower_components/flickity/js/utils.js',
  'bower_components/flickity/js/unipointer.js',
  'bower_components/flickity/js/cell.js',
  'bower_components/flickity/js/prev-next-button.js',
  'bower_components/flickity/js/page-dots.js',
  'bower_components/flickity/js/player.js',
  'bower_components/flickity/js/drag.js',
  'bower_components/flickity/js/animate.js',
  'bower_components/flickity/js/cell-change.js',
  'bower_components/flickity/js/flickity.js'
];


// concat & minify js
gulp.task( 'js', function() {
  gulp.src( jsSrc )
    .pipe( uglify() )
    .pipe( concat('flickity-docs.min.js') )
    .pipe( gulp.dest('build/js') );
});


// ----- css ----- //

var cssSrc = [
  // flickity
  'bower_components/flickity/css/flickity.css',
  // docs
  'css/styles.css'
];

gulp.task( 'css', function() {
  gulp.src( cssSrc )
    .pipe( concat('flickity-docs.css') )
    .pipe( gulp.dest('build/css') );
});

// ----- content ----- //

highlightjs.configure({
  classPrefix: ''
});

var reFirstLine = /.*\n/;

function highlightCodeBlock( block ) {
  // remove ticks
  block = block.replace( /```/g, '' );
  var langMatch = block.match( reFirstLine );
  var language = langMatch && langMatch[0];
  // remove first line
  block = block.replace( reFirstLine, '' );
  if ( language ) {
    language = language.trim();
  }

  var highlighted = language ? highlightjs.highlight( language, block, true ).value : block;
  var html = '<pre><code' +
    ( language ? ' class="' + language + '"' : '' ) + '>' +
    highlighted + '</code></pre>';

  return html;
}

var contentSrc = 'content/*.html';

gulp.task( 'content', buildContent() );

gulp.task( 'content-dev', buildContent( true ) );

function buildContent( isDev ) {
  return function() {
    gulp.src( contentSrc )
      .pipe( replace( /```[^```]+```/gi, highlightCodeBlock ) )
      .pipe( build({
        is_dev: isDev,
        cssSrc: cssSrc,
        jsSrc: jsSrc
      }) )
      .pipe( gulp.dest('build') );
  }
}

// ----- default ----- //

gulp.task( 'default', [
  'content',
  'js',
  'css',
  'dist',
  'prod-assets'
] );

// ----- watch ----- //

gulp.task( 'watch', function() {
  gulp.watch( contentSrc, [ 'content' ] );
  gulp.watch( 'css/*.css', [ 'css' ] );
});
