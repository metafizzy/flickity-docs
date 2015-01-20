/*jshint node: true, undef: true, unused: true */

var gulp = require('gulp');

var replace = require('gulp-replace');

// --------------------------  -------------------------- //

var highlightjs = require('highlight.js');
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

gulp.task( 'content', function() {
  gulp.src( contentSrc )
    .pipe( replace( /```[^```]+```/gi, highlightCodeBlock ) )
    .pipe( gulp.dest('build') );
});

// ----- copy assets ----- //

var assetsSrc = [
  'css/*.*',
  'js/*.*'
];

gulp.task( 'copy-assets', function() {
  // base opt for copying directory content
  // http://stackoverflow.com/a/25038015/182183
  gulp.src( assetsSrc, { base: '.' } )
    .pipe( gulp.dest('build') );
});

// ----- copy prod assets ----- //

var prodAssetsSrc = assetsSrc.concat([
  'fonts/*.*'
]);

gulp.task( 'copy-prod-assets', function() {
  gulp.src( prodAssetsSrc, { base: '.' } )
    .pipe( gulp.dest('build') );
});

// -----  ----- //

// TODO copy flickity src
// gulp.task( 'copy-flickity', function() {});

// TODO concat css

// TODO concat & minify js

// ----- watch ----- //

gulp.task( 'watch', function() {
  gulp.watch( contentSrc, [ 'content' ] );
  gulp.watch( assetsSrc, [ 'copy-assets' ] );
});

// ----- default ----- //

gulp.task( 'default', [
  'content',
  'copy-prod-assets'
] );
