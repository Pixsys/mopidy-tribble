var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var path = require('path');
var gutil = require('gulp-util');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var gulpreact = require('gulp-react');

gulp.task('browserify', function() {
    gulp.src('client/js/main.js')
        .pipe(plumber())
        .pipe(browserify({transform: 'reactify', debug: true}))
        .on('error', gutil.log)
        .pipe(concat('main.js'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
    gulp.src('client/index.html')
        .pipe(gulp.dest('dist'));

    gulp.src('client/css/main.css')
        .pipe(gulp.dest('dist/css'));

    gulp.src(['node_modules/jquery/dist/jquery.min.js',
              './node_modules/pickadate/lib/compressed/picker.js',
              './node_modules/pickadate/lib/compressed/picker.date.js'])
        .pipe(gulp.dest('dist/js/lib'));
});

gulp.task('less', function () {
    gulp.src('./client/css/main.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('lint', function() {
    return gulp.src('./client/js/**/**/*.js')
        .pipe(plumber())
        .pipe(gulpreact()) // compile jsx before linting
        .on('error', gutil.log)
        .pipe(jshint())
        .pipe(plumber.stop())
        .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['lint', 'browserify', 'copy', 'less']);

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('client/**/*.*', ['default']).on('change', livereload.changed);
});