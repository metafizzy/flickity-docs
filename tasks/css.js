var gulp = require('gulp');
var concat = require('gulp-concat');
var getGlobPaths = require('./utils/get-glob-paths');

var cssSrc = [
  // dependencies
  'bower_components/normalize.css/normalize.css',
  // flickity
  'bower_components/flickity/css/flickity.css',
  // base
  'css/*.css',
  // modules
  'modules/*/**/*.css'
];

gulp.task( 'css', function() {
  gulp.src( cssSrc )
    .pipe( concat('flickity-docs.css') )
    .pipe( gulp.dest('build/css') );
});

module.exports = function( site ) {
  site.data.css_paths = getGlobPaths( cssSrc );
};
