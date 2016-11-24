var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var concat = require('gulp-concat');

gulp.task('less', function(){
  return gulp.src('app/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    browser:["safari", "google chrome"]
  });

})


gulp.task('browserSyncReload', function(){
  browserSync.reload();
})

gulp.task('watch',['browserSync','less'],function(){
    gulp.watch("app/less/style.less", ['less']);
    gulp.watch("app/css/*.css", ['browserSyncReload']);	
	gulp.watch("app/**/*.html", ['browserSyncReload']);
})

gulp.task('move-html', function() {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('dist'));
})

gulp.task('minify-css', function() {
    return gulp.src('app/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('build',['move-html','minify-css'], function() {
    console.log("Build complete");
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'));
});
gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dist/js/'));
});