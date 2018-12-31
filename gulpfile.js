var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass= require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin');

gulp.task('js',function(){
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./dist/js'));
})
gulp.task('sass',function(){
	gulp.src('./src/sass/*.scss').pipe(sass())
	//.pipe(cssnano())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./dist/css'));
})
gulp.task('imagemin',function(){
	gulp.src('./src/img/toudi/*')
	.pipe(imagemin())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./dist/img'));
})
//监听
gulp.task('default',function(){
	gulp.watch('./src/js/*.js',['js']);
	gulp.watch('./src/sass/*.scss',['sass']);
	gulp.watch('./src/img/*',['imagemin']);
	
})

