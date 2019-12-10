# Gulp + Sass + Bootstrap Boilerplate

[![Build Status](https://travis-ci.org/jentanbernardus/gulp-setup.svg?branch=master)](https://travis-ci.org/jentanbernardus/gulp-setup) ![David](https://img.shields.io/david/dev/jentanbernardus/gulp-setup) ![David](https://david-dm.org/jentanbernardus/gulp-setup/status.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/972d7042d4206115fba2/maintainability)](https://codeclimate.com/github/jentanbernardus/gulp-setup/maintainability) [![CircleCI](https://circleci.com/gh/jentanbernardus/gulp-setup/tree/master.svg?style=svg)](https://circleci.com/gh/jentanbernardus/gulp-setup/tree/master) [![Codeship Status for jentanbernardus/gulp-setup](https://app.codeship.com/projects/c62364c0-fd69-0137-de11-3e3fa64fe83e/status?branch=master)](https://app.codeship.com/projects/377549) [![Known Vulnerabilities](https://snyk.io/test/github/jentanbernardus/gulp-setup/badge.svg)](https://snyk.io/test/github/jentanbernardus/gulp-setup/) ![Maintenance](https://img.shields.io/maintenance/yes/2019)

## Gulp plugins

-  gulp-htmlmin
-  gulp-uglify
-  gulp-rename
-  gulp-concat
-  gulp-imagemin
-  gulp-image-data-uri
-  gulp-sass
-  gulp-minify-css
-  gulp-purifycss
-  gulp-watch
-  browser-sync

---

## Gulp Tasks

1.  `gulp css`: compile sass to css + minify
2.  `gulp js`: concat + minify scripts
3.  `gulp img`: compress images
4.  `gulp html`: minify html
5.  `gulp sync`: browsersync + watch

---

__Private task example__
```
function taskName () {
  // do stuff here
}
```

__Public task example__
```
exports.taskName = function () {
  // do stuff here
}
```

_Work in progress..._