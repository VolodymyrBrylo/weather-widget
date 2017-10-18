var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');


gulp.task('sass', function () {
    gulp.src('sass/*.scss')
        .pipe(sass().on('error', function (e) {
            gutil.log(e);
        }))
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});




gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('sass/*.scss', ['sass']).on('change', livereload.changed);
});

gulp.task('default', ['sass', 'watch']);