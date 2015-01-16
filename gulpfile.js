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

gulp.task( 'build', function() {
  gulp.src('content/index.html')
    // .pipe( highlight() )
    .pipe( replace( /```[^```]+```/gi, highlightCodeBlock ) )
    .pipe( gulp.dest('build') );
});

gulp.task( 'watch', function() {
  gulp.watch( 'content/*.html', [ 'build' ] );
});
