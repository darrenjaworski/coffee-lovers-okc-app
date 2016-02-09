var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var depScripts = [
  './app/assets/bower/angular/angular.js',
  './app/assets/bower/angular-route/angular-route.js',
  './app/assets/bower/angular-sanitize/angular-sanitize.js'
];

var appScripts = [
  './app/app.js',
  './app/navigation/navigation.js',
  './app/shop/shop.js',
  './app/blog/blog.js',
  './app/home/home.js',
  './app/components/map/map.js',
  './app/components/map/map-directive.js'
];

gulp.task('bower', function() {
  return bower('./app/bower_components')
    .pipe(gulp.dest('./app/assets/bower'))
});

gulp.task('compress-dep', function() {
  return gulp.src(depScripts)
    .pipe(concat('dep.concat.js'))
    .pipe(rename('dep.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/assets/scripts/'));
});

gulp.task('compress-app', function(){
  return gulp.src(appScripts)
    .pipe(concat('app.concat.js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/assets/scripts/'));
});

gulp.task('css', function(){
  gulp.src(['./app/assets/bower/Materialize/dist/css/materialize.min.css', './app/assets/css/app.css'])
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: "./app/"
    }
  });
});
