var io = require('io-server')
var http = require('http')
var express = require('express')
var expressState = require('express-state')
var expressSession = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var engines = require('consolidate')
var passport = require('passport')
var config = require('config')
var _ = require('lodash')

var app = express()
app.set('strict routing', false)
app.set('views', 'public/pages')
app.set('state namespace', 'app')
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)
app.enable('trust proxy')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressSession({secret: 'keyboard cat'}))
app.use(express.static(config.assets_dir_path))
app.use(express.static(config.assets_dist_dir_path))
app.use(express.static(config.public_dir_path))
app.use(passport.initialize())
app.use(passport.session())
expressState.extend(app)

var moment = require('moment')
moment.locale('uk')

try {
  var manifest = require(config.dist_manifest_path)
} catch(e) {
  var manifest = {}
}

app.locals.asset = (src) => {
  if (manifest[src]) {
    return `/dist/${manifest[src]}`
  }
  return src
}

app.all('*', (req, res, next) => {
  var allowed = [
    '/login'
  , '/login/cb'
  , '/logout'
  ]
  if (_.contains(allowed, req.path)) {
    return next()
  }
  if (_.startsWith(req.path, '/dict')) {
    return next()
  }
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
})

var routes = [
  require('lib/routes/auth')
, require('lib/routes/games')
, require('lib/routes/boards')
, require('lib/routes/dict')
, require('lib/routes/index')
]

routes.forEach((route) => {
  route(app)
})

app.use(function(err, req, res, next) {
  res.status(500)
  res.json({
    error: err.message
  })
})

var server = http.createServer(app)
server.listen(config.port, null, (err) => {
  if (err) throw err
  console.log('Application and IO server started on', {
    port: config.port
  })
})

io.listen({server: server})