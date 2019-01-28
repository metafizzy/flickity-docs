var gulp = require('gulp');
var concat = require('gulp-concat');
var getGlobPaths = require('./utils/get-glob-paths');

var cssSrc = [
  // dependencies
  'bower_components/normalize.css/normalize.css',
  // flickity
  'bower_components/flickity/css/flickity.css',
  // flickity add-ons
  'bower_components/flickity-fullscreen/fullscreen.css',
  // fizzy docs modules
  'bower_components/fizzy-docs-modules/*/*.css',
  // base
  'css/*.css',
  // modules
  'modules/*/*.css',
  // demos & submodules
  'modules/*/*/**/*.css'
];

gulp.task( 'css', function() {
  return gulp.src( cssSrc )
    .pipe( concat('flickity-docs.css') )
    .pipe( gulp.dest('build/css') );
});

module.exports = function( site ) {
  site.data.css_paths = getGlobPaths( cssSrc );
};
