function watchTask(){
    watch(
        [files.scssPath, files.jsPath],
        parallel(scssTask, jsTask)
    );
}