var gulp = require('gulp'),
  requireDir = require('require-dir'),
  runSequence = require('run-sequence').use(gulp);

requireDir('build/tasks', {
  recurse: true
});

// Register default build.
gulp.task('default', function() {
  runSequence(['build'], ['concurrent']);
});
