var gulp = require('gulp');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var frontMatter = require('gulp-front-matter');
var path = require('path');
var transfob = require('transfob');
var pageNav = require('./utils/page-nav');
var highlightCodeBlock = require('./utils/highlight-code-block');
var hb = require('gulp-hb');

// sources
var contentSrc = 'content/**/*.hbs';
var partialsSrc = [
  'bower_components/fizzy-docs-modules/*/*.hbs',
  'modules/*/**/*.hbs',
];
var dataSrc = 'data/*.json';
var pageTemplateSrc = 'templates/*.hbs';

// ----- page template ----- //

var helpers = {
  lowercase: function( str ) {
    return str.toLowerCase();
  },
  firstValue: function( ary ) {
    return ary[0];
  },
  plusOne: function( str ) {
    return parseInt( str, 10 ) + 1;
  },
  slug: function( str ) {
    return str.replace( /[^\w\d]+/gi, '-' ).toLowerCase();
  }
};

module.exports = function( site ) {

  var pageTemplate;

  gulp.task( 'getPageTemplate', function() {
    return gulp.src('templates/page.hbs')
       .pipe( transfob( function( file, enc, next ) {
         pageTemplate = file.contents.toString();
         next( null, file );
       }));
  });

  gulp.task( 'buildPages', function() {
    // exclude 404 if export
    var filterQuery = site.data.isExport ? [ '**', '!**/404.*'] : '**';

    site.data.sourceUrlPath = site.data.isExport ? '' :
      'https://unpkg.com/flickity@2/dist/';

    return gulp.src( contentSrc )
      .pipe( filter( filterQuery ) )
      .pipe( frontMatter({
        property: 'data.page',
        remove: true
      }) )
      .pipe( transfob( function( file, enc, next ) {
        // add file path data
        file.rootPath = path.relative( file.path, file.cwd + '/content/' )
          .replace( /\.\.$/, '' );
        file.basename = path.basename( file.path, '.hbs' );
        // wrap contents in page template
        var contents = file.contents.toString();
        var templateParts = pageTemplate.split('{{{main}}}');
        contents = templateParts[0] + contents + templateParts[1];
        file.contents = Buffer.from( contents );

        next( null, file );
      }))
      .pipe( hb()
        .partials( pageTemplateSrc )
        .partials( partialsSrc, {
          parsePartialName: function( options, file ) {
            return path.basename( file.path, '.hbs' );
          }
        } )
        .data( dataSrc )
        .data( site.data )
        .helpers( helpers )
      )
      .pipe( highlightCodeBlock() )
      .pipe( pageNav() )
      .pipe( rename({ extname: '.html' }) )
      .pipe( gulp.dest('build') );
  });

  var content = gulp.task( 'content',
    gulp.series( 'getPageTemplate', 'buildPages' ) );

  if ( site.data.isDev ) {
    gulp.watch( [ contentSrc, pageTemplateSrc, dataSrc, partialsSrc ], content );
  }

};
