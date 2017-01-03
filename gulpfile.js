'use strict';

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
const jshint = require('gulp-jshint');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const bower = require('bower');
const sh = require('shelljs');
const runSequence = require('run-sequence');

const paths = {
  sass: ['./scss/**/*.scss'],
  es6: ['./src/**/*.js'],
  html: ['./src/**/*.html'],
  vendor: [
    './vendor/**/*.*'
  ],
  dest: './www'
};

gulp.task('default', ['build']);

gulp.task('build', callback => {
  runSequence(
    'clean', 
    'vendor',
    ['sass', 'babel', 'html', 'index'], 
    callback);
});

gulp.task('vendor', () => 
  gulp.src(paths.vendor, { read: true })
    .pipe(gulp.dest(paths.dest + '/lib')));

gulp.task('lint', () =>
  gulp.src(paths.es6)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish')));

gulp.task('clean', () =>  del([paths.dest + '/**/*.*']));

gulp.task('index', () => 
  gulp.src('./src/index.html')
    .pipe(gulp.dest(paths.dest)));

gulp.task('babel', ['lint'], () => 
  gulp.src(paths.es6)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest + '/js')));

gulp.task('html', () => 
  gulp.src(paths.html, { read: true })
    .pipe(templates('templates.js', { module: 'metronome', standalone: false }))
    .pipe(gulp.dest(paths.dest + '/js')));

gulp.task('vendor', () => 
  gulp.src(paths.vendor + '/')
    .pipe(gulp.dest(paths.dest + '/lib')));

gulp.task('sass', done => {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.dest + '/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.dest + '/css/'))
    .on('end', done);
});

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.es6, ['babel']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch('./src/index.html', ['index']);
});

gulp.task('install', ['git-check'], () => 
  bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    }));

gulp.task('git-check', done => {
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
