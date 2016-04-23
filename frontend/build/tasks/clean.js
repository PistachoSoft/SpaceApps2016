var gulp = require('gulp'),
  clean = require('gulp-clean');

/**
 * Clean task for temporary folder.
 */
gulp.task('clean:tmp', function() {
  return gulp.src('tmp', {read: false})
    .pipe(clean({force: true}));
});

/**
 * Clean task for distribution folder.
 */
gulp.task('clean:dist', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean({force: true}));
});

/**
 * General clean task.
 */
gulp.task('clean', ['clean:tmp', 'clean:dist']);
