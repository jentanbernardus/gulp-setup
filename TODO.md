# To Do

[] Implement Gulp's [`lastRun()`](https://gulpjs.com/docs/en/api/lastrun) API on gulp-imagemin task.
[] Use Gulp's  [`watch()`](https://gulpjs.com/docs/en/api/watch) instead of gulp-watch plugin.
[] Concat css files with `gulp-concat`.
[] Replace gulp-minify-css + gulp-purifycss with [gulp-postcss](https://github.com/postcss/gulp-postcss).
[] Update browserSync task
	``
	function browser_sync() {
    browserSync.init({
        server: {
            baseDir: './assets/'
        }
    });
	}
	function reload(done) {
	    browserSync.reload();
	    done();
	}
``