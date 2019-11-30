'use strict';

// const  { src, dest, watch, series, parallel, lastRun } = require('gulp'),
const { gulp, src, dest, series, parallel } = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  imageDataURI = require('gulp-image-data-uri'),
  sass = require('gulp-sass'),
  minifyCSS = require('gulp-minify-css'),
  purify = require('gulp-purifycss'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync').create();

// paths
var paths = {
  html: {
    src: './*.html',
    dist: 'dist/'
  },
  css: {
    src: "src/sass/**/*.scss",
    dist: "dist/css/"
  },
  js: {
    src: 'src/js/*.js',
    dist: 'dist/js/'
  },
  img: {
    src: 'src/img/*',
    dist: 'dist/img/'
  }
};

// private task example
/*function taskName () {
  // do stuff here
}*/

// public task example
/*exports.taskName = function () {
  // do stuff here
}*/

// compile sass to css
function css() {
  return src(paths.css.src)
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(purify([paths.js.dist, paths.html.src]))
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(paths.css.dist))
    .pipe(browserSync.stream())
}
exports.css = css;

// concat + minify scripts
function js() {
  return src(paths.js.src)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(paths.js.dist))
    .pipe(browserSync.stream())
}
exports.js = js;

// compress images
function img() {
  return src(paths.img.src)
    // No options
    // .pipe(imagemin())

    // With options
    .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
              ]
      })
          ], {
      verbose: true
    }))
    .pipe(dest(paths.img.dist))
}
exports.img = img;

// convert images to data uri
exports.datauri = function() {
  return src(paths.img.src)
    .pipe(imageDataURI())
    // combine css into one file
    .pipe(concat('data-uri.css'))
    .pipe(dest(paths.css.dist));
}

// minify html
function html() {
  return src('index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('./dist'));
}
exports.html = html

// browsersync + watch
function sync() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "/index.html"
    }
  });
  // You can use a single task
  // watch('src/*.css', css);

  // Or a composed task
  watch([paths.html.src, paths.js.src, paths.css.src],
      parallel(html, css, js)
    )
    .on('change', browserSync.reload);
}
exports.sync = sync;


// exports
exports.dev = series(html, css, js, sync);
exports.default = series(
  html,
  parallel(css, js),
  img, sync
);