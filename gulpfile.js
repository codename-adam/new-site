var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');


// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

// Sass task
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('./**/*.scss', ['sass']);
  gulp.watch('./*.html', browserSync.reload)
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})