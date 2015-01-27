var fs = require('fs');
var through2 = require('through2');

module.exports = function() {
  var pageContent = fs.readFileSync( 'templates/page.mustache', 'utf8' );

  return through2.obj( function( file, enc, callback ) {
    var contents = file.contents.toString();
    contents = pageContent.replace( '{{{content}}}', contents );
    file.contents = new Buffer( contents );

    this.push( file );
    callback();
  });
};
