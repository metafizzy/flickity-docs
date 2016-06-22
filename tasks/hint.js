var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task( 'hint-js', function() {
  return gulp.src([ 'js/*.js', 'modules/**/*/*.js' ])
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint-tasks', function() {
  return gulp.src([ 'gulpfile.js', 'tasks/*.js' ])
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint', [ 'hint-js', 'hint-tasks' ]);

module.exports = function() {
};
