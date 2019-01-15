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

browserSync.init({
  proxy: 'http://localhost:9001',
  port: 4000,
  open: true
});
// CSS task
var sassFunction = function () {
  gulp.src(['app/source/scss/config.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename('style.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('app/dist/css/'))
    .pipe(browserSync.stream());
}

var copyHtml = function () {
  gulp.src('./app/source/html/*.html')
    .pipe(gulp.dest('./app/dist/html/'));
}

var images = function() {
  gulp.src('./app/source/images/**/*')
  .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest('./app/dist/images/'))
  .pipe(browserSync.stream());

}
var scripts = function() {
  return gulp.src('./app/source/scripts/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js/'))
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
  gulp.watch("./app/source/html/*.html", copyHtml).on('change', browserSync.reload);
  gulp.watch("./app.js",nodemon).on('change', browserSync.reload);
  gulp.watch("./app/source/scss/*.scss", sassFunction);
  gulp.watch("./app/source/images/**/*'", images);
  gulp.watch("./app/source/scripts/*.js",scripts);
}

// All tasks
gulp.task('imagesTask',function(){
  images();
})
gulp.task('watchAllTask',function(){
  watchFiles();
})
gulp.task('scriptsTask',function(){
  scripts();
})
gulp.task('copyHtmlTask',function(){
  copyHtml();
})
gulp.task('sassTask',function(){
  sassFunction();
})

gulp.task('watch', gulp.parallel('imagesTask','watchAllTask','scriptsTask','copyHtmlTask','sassTask'));
