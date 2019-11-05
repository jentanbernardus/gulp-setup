const   { src, dest, series, parallel } = require('gulp'),
        htmlmin = require('gulp-htmlmin'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        concat = require('gulp-concat'),
        imagemin = require('gulp-imagemin');
        sass = require('gulp-sass'),
        minifyCSS = require('gulp-minify-css'),
        watch = require('gulp-watch'),
        browsersync = require('browser-sync').create();

// --------------------------------------------------------------
//  PATH VARIABLES
// --------------------------------------------------------------
var jsSrc = 'src/js/*.js',
    jsDist = 'dist/js/',
    cssSrc = 'src/css/*.css',
    cssDist = 'dist/css/',
    sassSrc = 'src/sass/*.scss',
    imgSrc = 'src/img/*'
    imgDist = 'dist/img/'
// --------------------------------------------------------------
//  SASS
// --------------------------------------------------------------
function css () {
  return src(sassSrc)	// find all .scss files in sass directory
    .pipe(sass())	// run sass
    .pipe(minifyCSS())	// minify CSS
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(cssDist))	// create css file in directory dist/css
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
    .pipe(dest(jsDist));
}
exports.js = js;


// --------------------------------------------------------------
//  IMAGES
// --------------------------------------------------------------
exports.img = function () {
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


// --------------------------------------------------------------
//  HTML
// --------------------------------------------------------------
exports.html = function()  {
    return src('index.htm')
    .pipe(htmlmin({
    	collapseWhitespace: true,
    	collapseInlineTagWhitespace: true,
    	removeComments: true
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('dist'));
}
// --------------------------------------------------------------
//  WATCH
// --------------------------------------------------------------
exports.watch = function (){
    watch(
        [cssSrc, jsSrc, sassSrc],
        parallel(css, js)
    );
}
// --------------------------------------------------------------
//  BROWSERSYNC
// --------------------------------------------------------------








