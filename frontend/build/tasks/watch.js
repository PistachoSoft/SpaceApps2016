var gulp = require('gulp');

/**
 * Watch task to live compile JSX files.
 * @param {Object} gulp Reference to the current Gulp process.
 */
gulp.task('watch:app:js', function() {
  return gulp.watch('app/**/*.js', [
    'build:js'
  ]);
});

gulp.task('watch:app:css', function() {
  return gulp.watch('app/styles/**/*', [
    'build:css'
  ]);
});

gulp.task('watch:app:html', function() {
  return gulp.watch('app/**/*.html', [
    'build:js'
  ]);
});

gulp.task('watch', [
  'watch:app:js',
  'watch:app:css',
  'watch:app:html'
]);
