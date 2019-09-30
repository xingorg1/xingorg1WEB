// gulpfile.js
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var paths = {
  // css
  sassWatch: 'scss/**/*.scss',
  css: 'css',
  // html
  htmlWatch: 'html/*.html',
  pugWatch: 'views/*.pug',
  pugWatch2: 'views/**/*.pug',
  html: 'html',
  // img
  imgWatch: 'img/**/**/*',
  img: 'img'
};

gulp.task('pug', function () {
  return gulp.src(paths.pugWatch)
    .pipe(rename(function(path){
      var filename = path.basename.split('_')[1];
      if(!filename) {
        return path;
      }
      path.basename = filename;
      return path;
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.html))
});

gulp.task('html', function () {
  return gulp.src(paths.htmlWatch)
    pipe(browserSync.reload())
});

gulp.task('sass', function () {
  return gulp.src(paths.sassWatch)
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('image', function () {
  return watch(paths.imgWatch)
  .pipe(imagemin())
  .pipe(gulp.dest(paths.img))
});

gulp.task('watch', ['sass'], function () {
  gulp.watch(paths.pugWatch2, ['pug']);
  gulp.watch(paths.sassWatch, ['sass']);
  gulp.watch(paths.htmlWatch).on('change', browserSync.reload);
  gulp.watch(paths.imgWatch, browserSync.reload);
});

gulp.task('browserSync',function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
});

gulp.task('default', ['watch', 'pug' ]);
