var gulp = require('gulp');
var runSequence = require('run-sequence');

// require browserSync plugin
var browserSync = require('browser-sync').create();
// Requires the gulp-sass plugin
var sass = require('gulp-sass');


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    },
  })
});


gulp.task('sass', function(){
  return gulp.src('assets/scss/main.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({
      stream: true
  }))
});



gulp.task('watch', function(){
  gulp.watch('assets/scss/**/*.scss', ['sass']);
  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch('assets/js/**/*.js', browserSync.reload);
  // Other watchers
});

gulp.task('default', function (callback) {
  runSequence('sass',['browserSync', 'watch'],
    callback
  )
})
