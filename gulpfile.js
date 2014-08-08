'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

gulp.task('default', [], function (cb) {
  runSequence('templates', cb);
});

gulp.task('templates:html', function() {
  var YOUR_LOCALS = {};

  gulp.src(['./templates/html/**/*.jade', '!./templates/html/includes/**'])
    .pipe($.jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/html'))
});

gulp.task('templates:js', function() {
  gulp.src(['./templates/js/**/*.jade', '!./templates/js/includes/**'])
    .pipe($.jade({
      client: true
    }))
    .pipe($.wrapAmd({
      deps: ["jade"],
      params: ["jade"]
    }))
    .pipe(gulp.dest('./dist/js/templates'))
});

gulp.task('templates', ['templates:js', 'templates:html']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./templates/**/*.jade', ['templates']);
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist']));

