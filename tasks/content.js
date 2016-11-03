var gulp = require('gulp');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var frontMatter = require('gulp-front-matter');
var path = require('path');

var pageNav = require('./utils/page-nav');
var highlightCodeBlock = require('./utils/highlight-code-block');
var hb = require('gulp-hb');
var hbLayouts = require('handlebars-layouts');

var contentSrc = [
  'content/**/*.hbs'
];

// ----- page template ----- //

var pageTemplateSrc = 'templates/page.mustache';

var helpers = {
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

  gulp.task( 'content', [  ], function() {
    // exclude 404 if export
    var filterQuery = site.data.isExport ? [ '**', '!**/404.*'] : '**';

    site.data.sourceUrlPath = site.data.isExport ? '' :
      'https://unpkg.com/flickity@' + site.data.flickityMinorVersion + '/dist/';

    // var buildOptions = {
    //   layout: pageTemplate,
    //   partials: site.partials,
    //   helpers: helpers,
    //   rootPathBase: '/content/'
    // };

    return gulp.src( contentSrc )
      .pipe( filter( filterQuery ) )
      .pipe( frontMatter({
        property: 'frontMatter',
        remove: true
      }) )
      // .pipe( build( site.data, buildOptions ) )
      .pipe( hb({
          data: 'data/*.json',
        })
        .partials('templates/*.hbs')
        .partials( 'modules/*/**/*.hbs', {
          parsePartialName: function( options, file ) {
            return path.basename( file.path, '.hbs' );
          }
        } )
        .helpers( hbLayouts )
      )
      .pipe( highlightCodeBlock() )
      .pipe( pageNav() )
      .pipe( rename({ extname: '.html' }) )
      .pipe( gulp.dest('build') );
  });

  site.watch( contentSrc, [ 'content' ] );
  site.watch( pageTemplateSrc, [ 'content' ] );

};
