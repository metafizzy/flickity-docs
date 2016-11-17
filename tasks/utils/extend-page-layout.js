var transfob = require('transfob');

// add handlebars layouts syntax to use page layout template
module.exports = function() {
  return transfob( function( file, enc, next ) {
    var contents = file.contents.toString();
    contents = '{{#extend "page"}}{{#content "main"}}' + contents +
      '{{/content}}{{/extend}}';
    file.contents = new Buffer( contents );
    next( null, file );
  });
};
