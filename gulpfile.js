var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var paths = {
  js: ['./js/**/*.js']
}

gulp.task('scripts', function() {
  return browserify()
    .transform(reactify) // transpile JSX
    .add('./js/main.js') // application root
    .bundle()
    .pipe(source('bundle.js')) // desired output filename
    .pipe(gulp.dest('./dist')); // desired output destination
});

// watch for changes and rebuild
gulp.task('watch', function() {
  gulp.watch(paths.js, ['scripts']);
})

gulp.task('default', ['watch', 'scripts']);
