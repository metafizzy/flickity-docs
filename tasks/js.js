var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var getGlobPaths = require('./utils/get-glob-paths');

var jsSrc = [
  // dependencies
  'bower_components/get-size/get-size.js',
  'bower_components/desandro-matches-selector/matches-selector.js',
  'bower_components/ev-emitter/ev-emitter.js',
  'bower_components/fizzy-ui-utils/utils.js',
  'bower_components/unipointer/unipointer.js',
  'bower_components/unidragger/unidragger.js',
  'bower_components/tap-listener/tap-listener.js',
  // flickity
  'bower_components/flickity/js/cell.js',
  'bower_components/flickity/js/slide.js',
  'bower_components/flickity/js/animate.js',
  'bower_components/flickity/js/flickity.js',
  'bower_components/flickity/js/drag.js',
  'bower_components/flickity/js/prev-next-button.js',
  'bower_components/flickity/js/page-dots.js',
  'bower_components/flickity/js/player.js',
  'bower_components/flickity/js/add-remove-cell.js',
  'bower_components/flickity/js/lazyload.js',
  // flickity add-ons
  'bower_components/imagesloaded/imagesloaded.js',
  'bower_components/flickity-imagesloaded/flickity-imagesloaded.js',
  'bower_components/flickity-as-nav-for/as-nav-for.js',
  'bower_components/flickity-bg-lazyload/bg-lazyload.js',
  // draggabilly
  'bower_components/draggabilly/draggabilly.js',
  // fizzy docs modules
  'bower_components/fizzy-docs-modules/*/*.js',
  // docs
  'js/boilerplate.js',
  // modules
  'modules/**/*.js',
  // init
  'js/init.js',
];

// concat & minify js
gulp.task( 'docs-js', function() {
  gulp.src( jsSrc )
    .pipe( uglify() )
    .pipe( concat('flickity-docs.min.js') )
    .pipe( gulp.dest('build/js') );
});

gulp.task( 'copy-js', function() {
  gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe( gulp.dest('build/js') );
});

gulp.task( 'js', [ 'docs-js', 'copy-js' ] );

module.exports = function( site ) {

  site.data.js_paths = getGlobPaths( jsSrc );

};
