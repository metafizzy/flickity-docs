let highlightjs = require('highlight.js');
let transfob = require('transfob');

highlightjs.configure({
  classPrefix: '',
});

let hljsJavascript = highlightjs.getLanguage('javascript');
// highlight Flickity & flkty
/* eslint-disable camelcase */
hljsJavascript.keywords.flickity_keyword = 'Flickity';
hljsJavascript.keywords.flickity_var = 'flkty';
/* eslint-enable camelcase */

hljsJavascript.contains.push({
  className: 'jquery_var',
  begin: /\$grid/,
});

let reFirstLine = /.*\n/;

function replaceCodeBlock( match, leadingWhiteSpace, block ) {
  let langMatch = block.match( reFirstLine );
  let language = langMatch && langMatch[0] || '';
  // remove leading whitespace from code block
  if ( leadingWhiteSpace && leadingWhiteSpace.length ) {
    let reLeadingWhiteSpace = new RegExp( '^' + leadingWhiteSpace, 'gim' );
    block = block.replace( reLeadingWhiteSpace, '' );
  }
  // remove first line
  block = block.replace( reFirstLine, '' );

  // highlight code
  let highlighted = block;
  if ( language ) {
    highlighted = highlightjs.highlight( block, {
      language: language.trim(),
      illegal: false,
    } ).value;
  }
  // wrap in <pre><code>
  let html = `<pre><code class="${language}">${highlighted}</code></pre>`;
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
