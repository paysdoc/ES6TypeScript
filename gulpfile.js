var gulp = require('gulp'),
    watch = require('gulp-watch'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    tsify = require('tsify');

//gulp.task('default', function () {
//    console.log('default');
//});


gulp.task('ts-compile', function () {
    return browserify('./src/app.ts')
        .plugin(tsify)
        .transform(babelify)
        .bundle()
        .on('error', function (error) { console.error(error.toString());this.emit('end'); })
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'))
});
gulp.task('html-copy', function () {
   gulp.src('src/**/*.html')
       .pipe(watch('src/**/*.html'))
       .pipe(gulp.dest('dist'));
});
//gulp.task('default', function () {
//    return gulp.src('src/**/*.js')
//        .pipe(watch('src/**/*.js'))
//        .pipe(gulp.dest('dist'));
//        //.pipe(gulp.dest('newfiles'))
//        //.pipe(filterAdded.restore())
//        //.pipe(gulp.dest('oldfiles'));
//});