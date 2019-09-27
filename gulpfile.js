// 編譯 sass ， minify css
// babel 、 browserify 、 uglify
// 編譯 pug

const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

const babel = require('gulp-babel')

function defaultTask (cb) {
  console.log('Let\'s, start')
  cb()
}

function sassToCss () {
  return gulp.src('sass/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      postcss(
        [autoprefixer({ overrideBrowserslist: ['last 5 version'] })]
      )
    )
    .pipe(rename('m.css'))
    .pipe(gulp.dest('./css'))
}

function bundleJS () {
  return gulp.src('js/index.js')
    .pipe(babel())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./dist'))
}

exports.default = gulp.series(defaultTask, sassToCss, bundleJS)
