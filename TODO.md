# To Do

[] Implement Gulp's [`lastRun()`](https://gulpjs.com/docs/en/api/lastrun) API on gulp-imagemin task.  
[] Use Gulp's  [`watch()`](https://gulpjs.com/docs/en/api/watch) instead of gulp-watch plugin.  
[] Concat css files with `gulp-concat`.  
[] Replace gulp-minify-css + gulp-purifycss with [gulp-postcss](https://github.com/postcss/gulp-postcss).  
[] Update browserSync task  
	```
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
```  
[] Split gulp tasks across multiple files  
	- https://github.com/gulpjs/gulp/blob/master/docs/recipes/split-tasks-across-multiple-files.md  
	- http://macr.ae/article/splitting-gulpfile-multiple-files.html  
	- http://man.hubwiz.com/docset/Gulp.docset/Contents/Resources/Documents/recipes/split-tasks-across-multiple-files.html  
	- https://gist.github.com/heldr/a3429c31ff45937c13de  
	- https://gist.github.com/thomastuts/a4dafc20d49662e4e13a  