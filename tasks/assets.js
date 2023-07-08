let gulp = require('gulp');

gulp.task( 'fonts', function() {
  return gulp.src( 'fonts/*.*', { base: '.' } )
    .pipe( gulp.dest('build') );
} );

gulp.task( 'assets', function() {
  return gulp.src('assets/**/*')
    .pipe( gulp.dest('build') );
} );

// copy prod assets
gulp.task( 'prod-assets', gulp.parallel( 'fonts', 'assets' ) );

module.exports = function() {};
