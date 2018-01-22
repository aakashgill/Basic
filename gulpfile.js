var gulp = require('gulp');
var uglify = require('gulp-uglify'); // minify js
var gutil = require('gulp-util'); // log ES6 error
var sass = require('gulp-ruby-sass'); //sass compiler only
var prefixer = require('gulp-autoprefixer'); //browser autoprefixer
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
 
// uglify / minimize javascript
gulp.task('uglify', function() {
	gulp.src('app/js/*.js')
	.pipe(uglify().on('error', function(err) {
		gutil.log(gutil.colors.red('[Error]'), err.toString());
		this.emit('end');
		}))
	.pipe(gulp.dest('dist/js/'));
});
	
// all the scss files in styles folder
gulp.task('sass', () =>
	sass('app/styles/**/*.scss')
    	.on('error', sass.logError)
    	.pipe(prefixer('last 3 versions'))
    	.pipe(cleanCSS())
		.pipe(gulp.dest('dist/styles/'))
		.pipe(browserSync.reload({
			stream: true
		}))
);

gulp.task('browserSync', function() {
	browserSync.init({
	  server: {
		baseDir: 'dist'
	  },
	})
});

// watch for changes
gulp.task('watch',['browserSync'], function() {
    gulp.watch('app/styles/**/*.scss', ['sass']);
    gulp.watch('app/js/*.js', ['uglify']);
});

gulp.task('default', ['sass', 'uglify', 'watch']);
