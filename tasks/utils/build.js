// hacking gulp-build
// https://github.com/tjeastmond/gulp-build/blob/master/index.js


var hbs = require('handlebars');
var path = require('path');
var gutil = require('gulp-util');
var getTransform = require('./get-transform');

function logError( err, filePath ) {
  filePath = filePath || '';
  gutil.log(
    gutil.colors.red('Handlebars Error'),
    gutil.colors.cyan( path.basename( filePath + ' :' ) ) ,
    err.message
  );
}

module.exports = function( data, options ) {
  data = data || {};

  if ( options && options.helpers ) {
    for ( var helperName in options.helpers ) {
      var helper = options.helpers[ helperName ];
      hbs.registerHelper( helperName, helper );
    }
  }

  if ( options && options.partials ) {
    for ( var partialName in options.partials ) {
      var partialTemplate = options.partials[ partialName ];
      hbs.registerPartial( partialName, partialTemplate );
    }
  }

  var build = function( file, encoding, callback ) {
    var fileContents = file.contents.toString();
    var template = '';

    // add file data, front matter data to data obj
    data.page = file.frontMatter;
    data.filePath = path.relative( file.cwd, file.path );
    data.rootPath = path.relative( file.path, file.cwd + options.rootPathBase )
      .replace( /\.\.$/, '' );
    data.basename = path.basename( file.path, path.extname( file.path ) );

    try {
      if ( options && options.layout ) {
        hbs.registerPartial( 'body', fileContents );
        template = hbs.compile( options.layout );
      } else {
        template = hbs.compile( fileContents );
      }
    } catch ( err ) {
      logError( err );
      return callback();
    }

    try {
      file.contents = new Buffer( template( data ) );
    } catch ( err ) {
      logError( err, file.path );
    }

    return callback( null, file );
  };

  return getTransform( build );
};
