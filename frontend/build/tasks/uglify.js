var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

/**
 * Uglify task for dist JS files.
 */
gulp.task('uglify', function() {
  return gulp.src(['dist/project-barataria.js'])
    .pipe(uglify({
      outSourceMap: true,
      preserveComments: 'some'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});
