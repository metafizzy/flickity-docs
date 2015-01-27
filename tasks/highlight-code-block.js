var highlightjs = require('highlight.js');
var through2 = require('through2');

highlightjs.configure({
  classPrefix: ''
});

var reFirstLine = /.*\n/;

function replaceCodeBlock( match, block ) {
  var langMatch = block.match( reFirstLine );
  var language = langMatch && langMatch[0];
  // remove first line
  block = block.replace( reFirstLine, '' );
  if ( language ) {
    language = language.trim();
  }
  // highlight code
  var highlighted = language ? highlightjs.highlight( language, block, true ).value : block;
  // wrap in <pre><code>
  var html = '<pre><code' +
    ( language ? ' class="' + language + '"' : '' ) + '>' +
    highlighted + '</code></pre>';
  return html;
}

module.exports = function() {
  return through2.obj( function( file, enc, callback ) {
    var contents = file.contents.toString();
    contents = contents.replace( /```([^```]+)```/gi, replaceCodeBlock );
    file.contents = new Buffer( contents );
    this.push( file );
    callback();
  });
};
