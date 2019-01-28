var gulp = require('gulp');

// copy packery dist to build/
gulp.task( 'dist', function() {
  return gulp.src( 'bower_components/flickity/dist/*.*' )
    .pipe( gulp.dest('build') );
});

module.exports = function() {};
