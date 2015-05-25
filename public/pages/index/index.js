require('../../js/bootstrap')
require('../../js/changelog')

var React = require('react')
var Layout = require('../../blocks/layout/layout')
var LayoutStore = require('../..//blocks/layout/layout.store')
var FriendsStore = require('../../blocks/friends/friends.store')
var GamesActions = require('../../js/actions/games')
var GameActions = require('../../js/actions/game')
var GamesStore = require('../../js/stores/games')
var GameStore = require('../../js/stores/game')
var LogsActions = require('../../js/actions/logs')
var LogsStore = require('../../js/stores/logs')
var MeStore = require('../../js/stores/me')
var io = require('io-client')

FriendsStore.setState(app.friends)
GamesStore.setState(app.games)
MeStore.setState(app.me)

if (app.games[0]) {
  GameStore.setState(app.games[0])
  LogsStore.setState(app.logs)
}

React.render(<Layout/>, document.getElementsByTagName('main')[0])

io = io.connect(`ws://${app.config.host}:${app.config.port_io}`)
io.on('connect', () => {
  console.log('IO CONNECTED')
  if (app.games[0]) {
    io.emit('game:listen', {
      gameId: app.games[0].id
    })
  }
})

io.on('game:update', (data) => {
  let game = GameStore.getState()
  if (game.get('id') == data.gameId) {
    GameActions.get(data.gameId)
    LogsActions.get(data.gameId)
  }
  GamesActions.getGames()
})

GameActions.get.listen(function(gameId) {
  io.emit('game:listen', {gameId: gameId})
})