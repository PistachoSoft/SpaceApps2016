var gulp = require('gulp'),
  runSequence = require('run-sequence').use(gulp);

/**
 * Build task.
 */
gulp.task('build:js', function() {
  runSequence(
    ['copy:js'],
    ['html2js'],
    ['concat:js'],
    ['uglify']
  );
});

gulp.task('build:css', function() {
  runSequence(
    ['sass'],
    ['concat:css']
  );
});

gulp.task('build', function() {
  runSequence(
    ['clean:tmp', 'clean:dist'],
    ['build:js', 'build:css']
  );
});
