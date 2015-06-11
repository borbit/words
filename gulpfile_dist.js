var gulp = require('gulp')
var gulpRev = require('gulp-rev')
var gulpReplace = require('gulp-replace')
var gulpUglify = require('gulp-uglify')
var gulpCSSO = require('gulp-csso')
var paths = require('./gulpfile_paths')
var _ = require('lodash')

//
//
gulp.task('images', () => {
  return gulp
    .src(paths.globAllImg)
    .pipe(gulp.dest(paths.assetsDir))
})

//
//
gulp.task('rev', ['compile', 'images'], () => {
  let filesToRev = [
    paths.globAssetsImg
  , paths.globAssetsCss
  , paths.globAssetsJs
  ]

  return gulp
    .src(filesToRev)
    .pipe(gulpRev())
    .pipe(gulp.dest(paths.assetsDistDir))
    .pipe(gulpRev.manifest())
    .pipe(gulp.dest(paths.assetsDistDir))
})

//
//
gulp.task('css-rev', ['rev'], () => {
  let rev = require(paths.assetsManifest)
  let regexp = /url\([^data:image]['"]?([^\)'"]*)['"]?\)/g
  let replace = gulpReplace(regexp, (__, url) => {
    url = _.trim(url, '/')
    url = `url("/${rev[url] || url}")`
    return url
  })

  return gulp
    .src(`${paths.assetsDistDir}/**/*.css`)
    .pipe(replace)
    .pipe(gulp.dest(paths.assetsDistDir))
})

//
//
gulp.task('css-csso', ['css-rev'], () => {
  return gulp
    .src(`${paths.assetsDistDir}/**/*.css`)
    .pipe(gulpCSSO())
    .pipe(gulp.dest(paths.assetsDistDir))
})

//
//
gulp.task('js-uglify', ['rev'], () => {
  return gulp
    .src(`${paths.assetsDistDir}/**/*.js`)
    .pipe(gulpUglify())
    .pipe(gulp.dest(paths.assetsDistDir))
})

//
//
gulp.task('dist', [
  'rev'
, 'css-csso'
, 'js-uglify'
])