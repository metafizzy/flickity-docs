let highlightjs = require('highlight.js');
let transfob = require('transfob');

highlightjs.configure({
  classPrefix: '',
});

let hljsJavascript = highlightjs.getLanguage('javascript');
// highlight Packery
hljsJavascript.keywords.flickity_keyword = 'Flickity';
// highlight packery variables
hljsJavascript.keywords.flickity_var = 'flkty';

hljsJavascript.contains.push({
  className: 'jquery_var',
  begin: /\$grid/,
});

let reFirstLine = /.*\n/;

function replaceCodeBlock( match, leadingWhiteSpace, block ) {
  let langMatch = block.match( reFirstLine );
  let language = langMatch && langMatch[0];
  // remove first line
  block = block.replace( reFirstLine, '' );
  if ( language ) {
    language = language.trim();
  }
  // remove leading whitespace from code block
  if ( leadingWhiteSpace && leadingWhiteSpace.length ) {
    let reLeadingWhiteSpace = new RegExp( '^' + leadingWhiteSpace, 'gim' );
    block = block.replace( reLeadingWhiteSpace, '' );
  }
  // highlight code
  let highlighted = language ? highlightjs.highlight( language, block, true ).value : block;
  // wrap in <pre><code>
  let html = '\n<pre><code' +
    ( language ? ' class="' + language + '"' : '' ) + '>' +
    highlighted + '</code></pre>';
  return html;
}

module.exports = function() {
  return transfob( function( file, enc, next ) {
    let contents = file.contents.toString();
    contents = contents.replace( /\n( *)```([^```]+)```/gi, replaceCodeBlock );
    file.contents = Buffer.from( contents );
    next( null, file );
  } );
};
