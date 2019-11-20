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

var paths = {
    css: {
        src: "src/sass/**/*.scss",
        dist: "dist/css/"
    },
    js: {
        src:'src/js/*.js',
        dist: 'dist/js/'
    },
    html: {
        src: './*.html',
        dist: 'dist/'
    },
    img: {
        src: 'src/img/*',
        dist: 'dist/img/'
    }
};

// sass to css
function css () {
  return src(paths.css.src) // find all .scss files in sass directory
    .pipe(sass().on('error',sass.logError))
    .pipe(purify([paths.js.dist, paths.html.src]))
    // .pipe(concat(paths.css.dist))
    .pipe(minifyCSS({ // minify CSS
        keepSpecialComments: 0
    })) 
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(paths.css.dist)) // create css file in directory dist/css
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
function img () {
    return src(paths.img.src)
        .pipe(imagemin())
        // With options
        /*
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
        ]))
        */
        .pipe(dest(paths.img.dist))
}
exports.img = img;

// convert images to data uri
exports.datauri = function () {
    return src (paths.img.src)
    .pipe(imageDataURI())
    // combine css into one file
    .pipe(concat('data-uri.css')) 
    .pipe(dest(paths.css.dist));
}

// minify html
function html()  {
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
    watch('./*.html').on('change',browserSync.reload);
    watch(paths.js.src, paths.css.src).on('change', browserSync.reload);
    watch(
        [paths.html.src, paths.js.src, paths.css.src],
        parallel(html, css, js),
    );
}
exports.sync = sync;

/*
exports.watchTask = function watchTask () {
  browserSync.init({
    server: {
       baseDir: "./dist",
       index: "/index.html"
    }
  });
  watch([paths.html.src, paths.css.src, paths.js.src],
    parallel(html, css, js)
    ).on('change', browserSync.reload);
}
*/

exports.dev = series(html, css, sync);
exports.default = series(
  parallel(html, css, js,),
  img, sync
);