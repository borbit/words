require('../../js/bootstrap')
require('../../js/changelog')

var React = require('react')
var Layout = require('../../blocks/layout/layout')
var LayoutStore = require('../../blocks/layout/layout.store')
var FriendsStore = require('../../js/stores/friends')
var GamesActions = require('../../js/actions/games')
var GameActions = require('../../js/actions/game')
var GamesStore = require('../../js/stores/games')
var GameStore = require('../../js/stores/game')
var UsersStore = require('../../js/stores/users')
var MeStore = require('../../js/stores/me')
var debug = require('debug')
var io = require('io-client')
var _ = require('lodash')

UsersStore.setState(app.users)
GamesStore.setState(app.games)
FriendsStore.setState(app.friends)
GameStore.setState(app.game)
MeStore.setState(app.me)

React.render(<Layout/>, document.getElementsByTagName('main')[0])

debug.io = debug('io')
debug.assets = debug('assets')

io = io.connect(app.config.url_io)
io.on('connect', () => {
  debug.io('connected')
  listenUpdates()
})
io.on('reconnect', () => {
  debug.io('reconnected')
  listenUpdates()
})
io.on('reconnect_failed', () => {
  debug.io('reconnect failed')
})
io.on('disconnect', () => {
  debug.io('disconnected')
  io.reconnect()
})
io.on('error', (error) => {
  debug.io('error', error)
})

io.on('game:update', (data) => {
  debug.io('game:update', data)
  GamesActions.receiveUpdates(data)
  if (data.id == GameStore.getState().get('id')) {
    GameActions.receiveUpdates(data)
  } else {
    GamesActions.incrNotifications(data.id)
  }
  notify()
})

io.on('game:message', (data) => {
  debug.io('game:message', data)
  if (data.id == GameStore.getState().get('id')) {
    GameActions.receiveUpdates(data)
  } else {
    GamesActions.incrNotifications(data.id)
  }
  notify()
})

io.on('game:new', (data) => {
  debug.io('game:new', data)
  GamesActions.receiveNew(data)
  notify()
})

function listenUpdates() {
  debug.io('user:connect')
  io.emit('user:connect', {
    userFBId: app.me.fb_id
  })
}

var $ = require('jquery')
var $title = $('title')
var title = $title.html()
var notifications = 0

var beep = document.createElement('audio')
beep.src = '/sound/beep.mp3'
beep.addEventListener('loadeddata', function() {
  debug.assets('beep sound loaded')
})
beep.addEventListener('error', function(err) {
  debug.assets('beep sound error', err)
})

function signal() {
  beep.pause()
  beep.currentTime = 0
  beep.play()
}

function notify() {
  if (document.hidden) {
    $title.html(`(${++notifications}) ${title}`)
    signal()
  }
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    $title.html(title)
    notifications = 0
  }
})

var prevField = null
var favicon = document.createElement('img')
favicon.src = '/img/favicon.gif'
favicon.addEventListener('load', function() {
  debug.assets('favicon loaded')
})
favicon.addEventListener('error', function(err) {
  debug.assets('favicon error', err)
})

GameStore.listen(drawFavicon)
drawFavicon()

function drawFavicon() {
  let game = GameStore.getState()
  let field = game.get('field') || ''

  if (prevField == field) {
    return
  }

  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  canvas.height = 16
  canvas.width = 16
  prevField = field

  ctx.drawImage(favicon, 0, 0)

  _.each(_.range(0, 15), (y) => {
  _.each(_.range(0, 15), (x) => {
    let letter = field[y*15+x]

    if (letter && letter != ' ') {
      let b = _.random(40, 120)
      let color = `rgb(${b},${b},${b})`

      ctx.fillStyle = color
      ctx.fillRect(x, y, 1, 1)
    }
  })
  })

  let links = document.getElementsByTagName('link')
  let head = document.getElementsByTagName('head')[0]

  _.each(_.toArray(links), (link) => {
    if (link.getAttribute('rel') == 'shortcut icon') {
      head.removeChild(link)
    }
  })

  let link = document.createElement('link')
  link.type = 'image/png'
  link.rel = 'shortcut icon'
  link.href = canvas.toDataURL('image/png')

  head.appendChild(link)
}