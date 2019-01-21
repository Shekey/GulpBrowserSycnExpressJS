var gulp = require('gulp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer')
var nodemon = require('gulp-nodemon');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;
var paths = {
  sass: {
      src: "./app/source/scss/*",
      dest: "./app/dist/css/"
  },

  html: {
      src: "./app/source/html/*.njk",
      dest: "./app/dist/html/"
  },

  images: {
      src: "./app/source/images/**/*",
      dest: "./app/dist/images/'"
  },

  js: {
      src: "./app/source/scripts/*.js",
      dest: "./app/dist/scripts/"
  }
}


// CSS task
var sassFunction = function () {
  return gulp.src(paths.sass.src)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename('style.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(browserSync.stream());
}

var copyHtml = function () {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}

var images = function() {
  return gulp.src(paths.images.src)
  .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest(paths.images.dest))
  .pipe(browserSync.stream());

}
var scripts = function() {
  return gulp.src(paths.js.src)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

var nodemon = function () {
    return gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
      script: 'app.js',
      watch: ['app.js']
    })
      .on('start', function onStart() {
        if (!called) { cb(); }
        called = true;
      })
      .on('restart', function onRestart() {
        setTimeout(function reload() {
          browserSync.reload({
            stream: false
          });
        }, BROWSER_SYNC_RELOAD_DELAY);
      });
  });
}

function watchFiles() {
  browserSync.init({
    proxy: 'http://localhost:9001',
    port: 4000,
    open: true
  });

  copyHtml();
  sassFunction();
  images();
  scripts();

  gulp.watch(paths.html.src, copyHtml).on('change', browserSync.reload);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.js.src, scripts);
  gulp.watch(paths.sass.src, sassFunction);
}
exports.default = watchFiles;
exports.watch = watchFiles;
