var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var flatten = require('gulp-flatten');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var minifyHTML = require('gulp-minify-html');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

// a clean task
gulp.task('clean', function(cb) {
  del([
    'app/tmp'
  ], cb);
});

// publish any required html from src to dist
gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('./src/index.html')
    .pipe($.plumber())
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist'));
});

// copy fonts from bower_components to dist/fonts
// flatten() will move all the files to the same level on the dist folder
gulp.task('fonts', function() {
        return gulp.src('./bower_components/*/fonts/**.*')
            .pipe(flatten())
            .pipe(gulp.dest('./dist/fonts'));
});

// compile and publish css styles, bootstrap and font-awesome are included
// in the chain of "require" calls (all starts at ./src/main.less)
gulp.task('styles', function() {
  return gulp.src('./src/app/styles.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
});

// support function to decide if is watching or building?
var bundler = _.memoize(function(watch) {
  var options = {debug: true};

  if (watch) {
    _.extend(options, watchify.args);
  }

  var b = browserify('./src/main.js', options);

  if (watch) {
    b = watchify(b);
  }

  return b;
});

// support function to deal with errors
var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);
  delete args[0].stream;
  $.util.log.apply(null, args);
  this.emit('end');
};

// a function to contain the scripts bulding steps?
function bundle(cb, watch) {
  return bundler(watch).bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
    .pipe(reload({ stream: true }));
}

// the task to initiate the build of the scripts
gulp.task('scripts', function(cb) {
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  bundle(cb, true);
});

// a build task to run all the required tasks at once
gulp.task('build', [
  'clean',
  'html',
  'fonts',
  'styles',
  'scripts'
]);

// a watch task that will run the build task after some change
gulp.task('watch', ['build'], function(cb) {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  // the bundler will react for changes by watchify
  bundler(true).on('update', function() {
    gulp.start('scripts');
  });

  // styles and html are watched by gulp
  gulp.watch(['./src/main.less', './src/**/*.less'], ['styles']);
  gulp.watch(['./src/*.html'], ['html']);
});

// set the watch as the default gulp task
gulp.task('default', ['watch']);
