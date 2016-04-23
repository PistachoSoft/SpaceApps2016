var gulp = require('gulp'),
  concat = require('gulp-concat'),
  html2js = require('gulp-html2js');

/**
 * Convert HTML templates to js into temporary directory.
 */
gulp.task('html2js', function() {
  return gulp.src('app/**/*.tpl.html')
    .pipe(html2js({
      base: 'app',
      outputModuleName: 'ProjectDulcinea',
      quoteChar: '\''
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('tmp'));
});
