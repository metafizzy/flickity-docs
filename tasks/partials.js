var gulp = require('gulp');
var path = require('path');
var partialsSrc = 'modules/*/**/*.mustache';
var getTransform = require('./utils/get-transform');


module.exports = function( site ) {

  gulp.task( 'partials', function() {
    site.partials = {};

    return gulp.src( partialsSrc )
      .pipe( getTransform( function( file, enc, next ) {
        var name = path.basename( file.path, path.extname( file.path ) );
        site.partials[ name ] = file.contents.toString();
        next( null, file );
      }) );
  });

  site.watch( partialsSrc, [ 'content' ] );

};
