let gulp = require('gulp');
let rename = require('gulp-rename');
let filter = require('gulp-filter');
let frontMatter = require('gulp-front-matter');
let path = require('path');
let transfob = require('transfob');
let pageNav = require('./utils/page-nav');
let highlightCodeBlock = require('./utils/highlight-code-block');
let hb = require('gulp-hb');

// sources
let contentSrc = 'content/**/*.hbs';
let partialsSrc = [
  'bower_components/fizzy-docs-modules/*/*.hbs',
  'modules/*/**/*.hbs',
];
let dataSrc = 'data/*.json';
let pageTemplateSrc = 'templates/*.hbs';
let contentSrcs = [ contentSrc, pageTemplateSrc, dataSrc ]
  .concat( partialsSrc );

// ----- page template ----- //

let helpers = {
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
  },
};

module.exports = function( site ) {

  let pageTemplate;

  gulp.task( 'getPageTemplate', function() {
    return gulp.src('templates/page.hbs')
      .pipe( transfob( function( file, enc, next ) {
         pageTemplate = file.contents.toString();
         next( null, file );
       } ) );
  } );

  gulp.task( 'buildPages', function() {
    // exclude 404 if export
    let filterQuery = site.data.isExport ? [ '**', '!**/404.*' ] : '**';

    site.data.sourceUrlPath = site.data.isExport ? '' :
      'https://unpkg.com/flickity@2/dist/';

    return gulp.src( contentSrc )
      .pipe( filter( filterQuery ) )
      .pipe( frontMatter({
        property: 'data.page',
        remove: true,
      }) )
      .pipe( transfob( function( file, enc, next ) {
        // add file path data
        file.rootPath = path.relative( file.path, file.cwd + '/content/' )
          .replace( /\.\.$/, '' );
        file.namebase = path.basename( file.path, '.hbs' );
        // wrap contents in page template
        let contents = file.contents.toString();
        let templateParts = pageTemplate.split('{{{main}}}');
        contents = templateParts[0] + contents + templateParts[1];
        file.contents = Buffer.from( contents );

        next( null, file );
      } ) )
      .pipe( hb()
        .partials( pageTemplateSrc )
        .partials( partialsSrc, {
          parsePartialName: function( options, file ) {
            return path.basename( file.path, '.hbs' );
          },
        } )
        .data( dataSrc )
        .data( site.data )
        .helpers( helpers ) )
      .pipe( highlightCodeBlock() )
      .pipe( pageNav() )
      .pipe( rename({ extname: '.html' }) )
      .pipe( gulp.dest('build') );
  } );

  let content = gulp.series( 'getPageTemplate', 'buildPages' );

  gulp.task( 'content', content );

  if ( site.data.isDev ) {
    console.log( contentSrcs.join(',') );
    gulp.watch( contentSrcs, content );
  }

};
