'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var compass = require('gulp-compass');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var plumber = require('gulp-plumber');


// BrowserSync & Server
gulp.task('bs', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

/**
 * Build
 */
gulp.task('build:html', function() {
  gulp.src('./assets/*.html')
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build:js', function() {
  gulp.src('./assets/js/*.js')
    .pipe(gulp.dest('./public/js/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build:css', function() {
  gulp.src('./assets/sass/*.scss', { style: 'expanded' })
    .pipe(plumber())
    .pipe(compass({
        config_file: 'config.rb',
        comments: false,
        css: './public/css/',
        sass: './assets/sass/'
    }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('image', function() {
 gulp.src('./assets/images/**')
  .pipe(newer('./assets/images/**'))
  .pipe(imagemin({
      optimizationLevel: 3
    }))
.pipe(gulp.dest('./public/images/'))
.pipe(browserSync.reload({ stream:true }));
});

/**
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch(
    './assets/*.html', 
    ['build:html']);

  gulp.watch(
    './assets/js/*.js', 
    ['build:js']);

  gulp.watch(
    './assets/sass/*.scss', 
    ['build:css']);

  gulp.watch(
    './assets/images/**', 
    ['image']);
});


// 開発
gulp.task('default', ['image', 'build:html', 'build:js', 'build:css', 'bs', 'watch']);