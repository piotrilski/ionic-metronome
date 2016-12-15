const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const templates = require('gulp-angular-templatecache');
const uncache = require('gulp-uncache');
const inject = require('gulp-inject');
const sourcemaps = require('gulp-sourcemaps');
const bower = require('bower');
const sh = require('shelljs');
const series = require('stream-series');

const paths = {
  sass: ['./scss/**/*.scss'],
  es6: ['./src/**/*.js'],
  html: ['./src/**/*.html']
};

gulp.task('default', ['sass', 'babel', 'html']);

gulp.task('babel', function() {
  return gulp.src(paths.es6)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('html', function() {
  return gulp.src(paths.html, { read: true })
    .pipe(templates('templates.js', { module: 'metronome', standalone: false }))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.es6, ['babel']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
