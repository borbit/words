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
var LogsActions = require('../../js/actions/logs')
var LogsStore = require('../../js/stores/logs')
var MeStore = require('../../js/stores/me')
var debug = require('debug')
var io = require('io-client')
var _ = require('lodash')

UsersStore.setState(app.users)
FriendsStore.setState(app.friends)
GamesStore.setState(app.games)
MeStore.setState(app.me)

if (app.games[0]) {
  LogsStore.setState({list: app.logs})
  GameStore.setState(app.games[0])
}

React.render(<Layout/>, document.getElementsByTagName('main')[0])

debug.io = debug('io')

io = io.connect(`ws://${app.config.host}:${app.config.port_io}`)
io.on('connect', () => {
  debug.io('connected')
  listenGames()
})
io.on('reconnect', () => {
  debug.io('reconnected')
  listenGames()
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
  let game = GameStore.getState()
  if (game.get('id') == data.gameId) {
    GameActions.get(data.gameId)
    LogsActions.get(data.gameId)
  }
  GamesActions.getGames()
})

GameActions.add.completed.listen(function(game) {
  debug.io('game:listen')
  io.emit('game:listen', {
    gameId: game.id
  })
})

function listenGames() {
  if (app.games.length > 0) {
    debug.io('game:listen')
    io.emit('game:listen', {
      gameIds: _.map(app.games, game => game.id)
    })
  }
}