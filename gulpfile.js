var gulp = require('gulp'),
    watch = require('gulp-watch'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    tsify = require('tsify'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
gulp.task('default', ['build'], function () {
});
gulp.task('build', ['clean'], function () {
    runSequence('ts-compile', 'html-copy', 'js-copy', 'ts-watch');
});
gulp.task('clean', function (cb) {
    return rimraf('./dist', cb);
});

gulp.task('ts-compile', function () {
    //return browserify('./app/app.ts')
    //    .plugin(tsify)
    //    .transform(babelify)
    //    .bundle()
    //    .on('error', function (error) { console.error(error.toString());this.emit('end'); })
    //    .pipe(source('app.js'))
    //    .pipe(gulp.dest('dist'));
    return gulp.src('app/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('dist'))
});
gulp.task('html-copy', function () {
   gulp.src('app/**/*.html')
       .pipe(watch('app/**/*.html'))
       .pipe(gulp.dest('dist'));
});
gulp.task('js-copy', function () {
    gulp.src('app/**/*.js')
        .pipe(gulp.dest('dist'));
});
gulp.task('ts-watch', function () {
    return gulp.watch('./app/**/*.ts', ['ts-compile']);
});