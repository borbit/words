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
FriendsStore.setState(app.friends)
GamesStore.setState(app.games)
GameStore.setState(app.game)
MeStore.setState(app.me)

React.render(<Layout/>, document.getElementsByTagName('main')[0])

debug.io = debug('io')

io = io.connect(`ws://${app.config.host}:${app.config.port_io}`)
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
  debug.io('game:update')
  if (data.gameId == GameStore.getState().get('id')) {
    GameActions.receiveUpdates(data.updates)
  }
})
io.on('game:message', (data) => {
  debug.io('game:message')
  if (data.gameId == GameStore.getState().get('id')) {
    GameActions.receiveMessage(data.message)
  }
})

function listenUpdates() {
  debug.io('user:connect')
  io.emit('user:connect', {
    userFBId: app.me.fb_id
  })
}