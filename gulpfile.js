var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('./tsconfig.json'),
    browserSync = require('browser-sync').create();

// gulp
gulp.task('default', ['build'], function () {
});
// gulp build
gulp.task('build', ['clean'], function () {
    runSequence('ts-compile', 'html-copy', 'css-copy', 'js-copy', 'ts-watch', 'browser-sync');
});
// delete dist folder
gulp.task('clean', function (cb) {
    return rimraf('./dist', cb);
});
// compile typescript to javascript and place files in dist
gulp.task('ts-compile', function () {
    return gulp.src('app/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('dist'))
});
// watch TS files and compile when changed
gulp.task('ts-watch', function () {
    return gulp.watch('./app/**/*.ts', ['ts-compile']);
});
// copy and watch html
gulp.task('html-copy', function () {
   gulp.src('app/**/*.html')
       .pipe(watch('app/**/*.html'))
       .pipe(gulp.dest('dist'));
});
// copy and watch js
gulp.task('js-copy', function () {
    gulp.src('app/**/*.js')
        .pipe(watch('app/**/*.js'))
        .pipe(gulp.dest('dist'));
});
// copy and watch css
gulp.task('css-copy', function () {
    gulp.src('app/**/*.css')
        .pipe(watch('app/**/*.css'))
        .pipe(gulp.dest('dist'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ['dist', 'dist/src']
        },
        files: [
            'dist/**/*.js',
            'dist/**/*.html',
            'dist/**/*.css'
        ],
        logLevel: 'silent', //debug || info
        notify: false
    });
});