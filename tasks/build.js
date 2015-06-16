// hacking gulp-build
// https://github.com/tjeastmond/gulp-build/blob/master/index.js

var through2 = require('through2');
var hbs = require('handlebars');
var path = require('path');

module.exports = function( data, options ) {
  data = data || {};

  hbs.registerHelper( options.helpers );
  hbs.registerPartial( options.partials );

  return through2.obj( function build( file, encoding, callback ) {
    var fileContents = file.contents.toString();
    var template;
    if ( typeof options.layout == 'string' ) {
      hbs.registerPartial( 'body', fileContents );
      template = hbs.compile( options.layout );
    } else {
      template = hbs.compile( fileContents );
    }

    // add file data, front matter data to data obj
    data.page = file.frontMatter;
    data.file_path = path.relative( file.cwd, file.path );
    data.basename = path.basename( file.path, path.extname( file.path ) );

    file.contents = new Buffer( template( data ) );

    return callback( null, file );
  });
};
