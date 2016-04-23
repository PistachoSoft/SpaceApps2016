var gulp = require('gulp');

/**
 * Copy files to temporary directory.
 */
gulp.task('copy:js', function() {
  return gulp.src([
    'app/**/*.js'
  ])
  .pipe(gulp.dest('tmp'));
});

gulp.task('copy', [
  'copy:js'
]);
