const   { src, dest, series, parallel } = require('gulp'),
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

// --------------------------------------------------------------
//  PATH VARIABLES
// --------------------------------------------------------------
var jsSrc = 'src/js/*.js',
    jsDist = 'dist/js/',
    cssSrc = 'src/css/*.css',
    cssDist = 'dist/css/',
    sassSrc = 'src/sass/*.scss',
    imgSrc = 'src/img/*',
    imgDist = 'dist/img/',
    htmlSrc = './*.html'
// --------------------------------------------------------------
//  SASS
// --------------------------------------------------------------
function css () {
  return src(sassSrc)	// find all .scss files in sass directory
    //.pipe(sass())	// run sass
    .pipe(sass().on('error',sass.logError))
    .pipe(purify([jsDist, htmlSrc]))
    // .pipe(concat(cssDist))
    .pipe(minifyCSS({ // minify CSS
        keepSpecialComments: 0
    }))	
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(cssDist))	// create css file in directory dist/css
    .pipe(browserSync.stream())
}
exports.css = css;

// --------------------------------------------------------------
//  JAVASCRIPT
// --------------------------------------------------------------
function js() {
  return src(jsSrc)
  .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(jsDist))
}
exports.js = js;


// --------------------------------------------------------------
//  IMAGES
// --------------------------------------------------------------
function img () {
    return src(imgSrc)
        .pipe(imagemin())
        // With options
        /*
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
        ]))
        */
        .pipe(dest(imgDist))
}

// convert images to data uri
// https://github.com/adam-lynch/gulp-image-data-uri
exports.datauri = function () {
    return src (imgSrc)
    .pipe(imageDataURI())
    // combine css into one file
    .pipe(concat('data-uri.css')) 
    .pipe(dest(cssDist));
}
/*
function datauri () {
    return src (imgSrc)
    .pipe(imageDataURI())
    .pipe(dest(cssDist));
}
exports.datauri = datauri;
*/

// minify html
function html()  {
    return src('index.html')
    .pipe(htmlmin({
    	collapseWhitespace: true,
    	collapseInlineTagWhitespace: true,
    	removeComments: true
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('dist'));
}
exports.html = html

// watch files
/*
exports.watch = function (){
    watch(
        [cssSrc, jsSrc, sassSrc],
        parallel(css, js)
    );
}
*/

// browsersync + watch
function sync() {
    browserSync.init({
        server: {
           baseDir: "./dist",
           index: "/index.html"
        }
    });
    // watch(sassSrc).on('change',browserSync.reload);
    watch('./*.html').on('change',browserSync.reload);
    watch(jsSrc, sassSrc).on('change', browserSync.reload);
    watch(
        ['./*.html', jsSrc, sassSrc],
        parallel(html, css, js)
    );
}
exports.sync = sync;

exports.img = img;
exports.default = series(html, css, js, img, sync);