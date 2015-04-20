var fs = require('fs')
var del = require('del')
var gulp = require('gulp')
var gulpLess = require('gulp-less')
var gulpBase64 = require('gulp-base64')
var vinylPaths = require('vinyl-paths')
var vinylTransform = require('vinyl-transform')
var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')

// config
var paths = require('./gulpfile_paths')

//
//
gulp.task('compile-page-less', () => {
  var compile = gulpLess({
    relativeUrls: true
  , rootpath: '/blocks'
  })

  compile.on('error', (err) => {
    console.log('less', err)
  })

  var base64Encode = gulpBase64({
    extensions: [/#datauri/i]
  , baseDir: './public'
  })

  return gulp
    .src(paths.globPageLess)
    .pipe(compile)
    .pipe(base64Encode)
    .pipe(gulp.dest(paths.assetsDir))
})

//
//
gulp.task('compile-common-less', () => {
  var compile = gulpLess({
    relativeUrls: true
  , rootpath: '/blocks'
  })

  compile.on('error', (err) => {
    console.log('less', err)
  })

  var base64Encode = gulpBase64({
    extensions: [/#datauri/i]
  , baseDir: './public'
  })

  return gulp
    .src(paths.commonLess)
    .pipe(compile)
    .pipe(base64Encode)
    .pipe(gulp.dest(paths.assetsDir))
})

//
//
gulp.task('compile-page-js', () => {
  var b = browserify({
    cache: {},
    packageCache: {},
    verbose: true,
    debug: true
  })

  b.transform(babelify)

  getExternalModules().forEach((module) => {
    b.exclude(module.name)
  })

  var bundle = vinylTransform(function(filename) {
    b.add(filename)
    return b.bundle()
  });

  bundle.on('error', (err) => {
    console.log('browserify', err.message)
  })

  return gulp
    .src(paths.globPageJs)
    .pipe(bundle)
    .pipe(gulp.dest(paths.assetsDir));
})

//
//
gulp.task('compile-common-js', () => {
  var b = browserify({
    cache: {},
    packageCache: {},
    verbose: true,
    debug: true
  })

  b.transform(babelify);

  getExternalModules().forEach((module) => {
    b.require(module.path, {expose: module.name})
  })

  var bundle = vinylTransform(function(filename) {
    b.add(filename)
    return b.bundle()
  });

  bundle.on('error', (err) => {
    console.log('browserify', err.message)
  })

  return gulp
    .src(paths.commonJs)
    .pipe(bundle)
    .pipe(gulp.dest(paths.assetsDir));
})

//
//
gulp.task('compile', [
  'compile-common-less'
, 'compile-page-less'
, 'compile-common-js'
, 'compile-page-js'
])

// synchroniously read common.coffee and parse
// all the path and names of modules it exposes
// returns: [
//   {path: '../js/libs/jquery.transit.js', name: 'jquery.transit.js'},
//   {path: '../js/libs/jquery.ui.js', name: 'jquery.ui.js'}
// ]
function getExternalModules() {
  var callee = getExternalModules
  
  if (callee.modules) {
    return callee.modules 
  }

  var regexp = /require\(*'(.+)'\)\s*\/\/@expose(\s*as\s*(.+))?/ig
  var content = fs.readFileSync(paths.commonJs)
  var modules = []
  var found
  
  while(found = regexp.exec(content)) {
    modules.push({
      path: found[1],
      name: found[3] || found[1]
    })
  }

  return callee.modules = modules
}