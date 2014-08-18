var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var paths = {
  js: ['./js/**/*.js', './js/**/*.jsx']
};

gulp.task('js', function() {
  return browserify()
    .transform(reactify) // transpile JSX
    .add('./js/app.jsx') // application root
    .bundle()
    .pipe(source('bundle.js')) // desired output filename
    .pipe(gulp.dest('./browser/js')); // desired output destination
});

// watch for changes and rebuild
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['js', 'watch']);
