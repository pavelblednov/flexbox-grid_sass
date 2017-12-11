'use strict';

var gulp        = require('gulp'),
	watch       = require('gulp-watch'),
	prefixer    = require('gulp-autoprefixer'),
	sass        = require('gulp-sass'),
	rename      = require("gulp-rename"),
	sourcemaps  = require('gulp-sourcemaps'),
	cssnano     = require('gulp-cssnano'),
	rimraf      = require('rimraf'),

	path = {
		dist:  'css/',
		src:   'scss/flexbox-grid.scss',
		watch: 'scss/**/*.scss',
		clean: './css/'
	};

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('style:build', function () {
	gulp.src(path.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError)) //{outputStyle: 'compact'}
		.pipe(prefixer(['last 25 versions', '> 1%', 'ie 9']))
		.pipe(gulp.dest(path.dist))
		.pipe(cssnano())
		.pipe(rename({suffix: ".min"}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.dist));
});

gulp.task('build', [
	'style:build'
]);

gulp.task('watch', function(){
	watch(path.watch, function(event, cb) {
		gulp.start('style:build');
	});
});

gulp.task('default', ['build']);