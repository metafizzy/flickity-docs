var gulp = require('gulp');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var frontMatter = require('gulp-front-matter');
var path = require('path');
var transfob = require('transfob');
var pageNav = require('./utils/page-nav');
var highlightCodeBlock = require('./utils/highlight-code-block');
var hb = require('gulp-hb');
var hbLayouts = require('handlebars-layouts');
var extendPageLayout = require('./utils/extend-page-layout');

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

  var content = gulp.task( 'content', function() {
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
      .pipe( extendPageLayout() )
      // add file path data
      .pipe( transfob( function( file, enc, next ) {
        file.rootPath = path.relative( file.path, file.cwd + '/content/' )
          .replace( /\.\.$/, '' );
        file.basename = path.basename( file.path, '.hbs' );
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
        .helpers( hbLayouts )
        .helpers( helpers )
      )
      .pipe( highlightCodeBlock() )
      .pipe( pageNav() )
      .pipe( rename({ extname: '.html' }) )
      .pipe( gulp.dest('build') );
  });

  if ( site.data.isDev ) {
    gulp.watch( [ contentSrc, pageTemplateSrc, dataSrc, partialsSrc ], content );
  }

};
