let gulp = require('gulp');
let concat = require('gulp-concat');
let getGlobPaths = require('./utils/get-glob-paths');

let cssSrc = [
  // dependencies
  'bower_components/normalize.css/normalize.css',
  // flickity
  'bower_components/flickity/css/flickity.css',
  // flickity add-ons
  'bower_components/flickity-fullscreen/fullscreen.css',
  'bower_components/flickity-fade/flickity-fade.css',
  // fizzy docs modules
  'bower_components/fizzy-docs-modules/*/*.css',
  // base
  'css/*.css',
  // modules
  'modules/*/*.css',
  // demos & submodules
  'modules/*/*/**/*.css',
];

gulp.task( 'css', function() {
  return gulp.src( cssSrc )
    .pipe( concat('flickity-docs.css') )
    .pipe( gulp.dest('build/css') );
} );

module.exports = function( site ) {
  site.data.css_paths = getGlobPaths( cssSrc );
};
