var io = require('io-server')
var express = require('express')
var passport = require('passport')
var engines = require('consolidate')
var config = require('config')
var _ = require('lodash')

var app = express()
app.set('strict routing', false)
app.set('views', 'public/pages')
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)
app.enable('trust proxy')

app.use(express.static(config.assets_dir_path))
app.use(express.static(config.public_dir_path))
app.use(passport.initialize())
app.use(passport.session())

try {
  var manifest = require(config.dist_manifest_path)
} catch(e) {
  var manifest = {}
}

app.locals.asset = (src) => {
  if (manifest[src]) {
    return "/dist/#{manifest[src]}"
  }
  return src
}

([
  require('routes/index')
, require('routes/table')
, require('routes/auth')
]).forEach((route) => {
  route(app)
})

app.all('*', (req, res, next) => {
  var allowed = [
    '/login',
    '/login/cb'
    '/logout'
  ]
  if (_.contains(allowed, req.path)) {
    return next()
  }
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
})

app.listen(config.port, config.host, (err) => {
  if (err) throw err

  console.log('Application server started on', {
    host: config.host,
    port: config.port
  })
})

io.listen(5001, (err) => {
  if (err) throw err

  console.log('IO server started on', {
    port: 5001
  })
})