require('../../js/bootstrap')
require('../../js/changelog')

var React = require('react')
var Layout = require('../../blocks/layout/layout')
var LayoutStore = require('../..//blocks/layout/layout.store')
var FriendsStore = require('../../blocks/friends/friends.store')
var GamesActions = require('../../js/actions/games')
var GamesStore = require('../../js/stores/games')
var GameStore = require('../../js/stores/game')
var MeStore = require('../../js/stores/me')
var io = require('io-client')

GamesStore.setState(app.games)
FriendsStore.setState(app.friends)
MeStore.setState(app.me)

if (app.games[0]) {
  GameStore.setState(app.games[0])
}

React.render(<Layout/>, document.getElementsByTagName('main')[0])

io = io.connect('ws://192.168.10.118:5001')
io.on('connect', () => {
  console.log('IO CONNECTED')
})

io.on('game:update', (data) => {
  let game = GameStore.getState()
  if (game.get('id') == data.gameId) {
    GamesActions.getGame(data.gameId)
  }
  GamesActions.getGames()
})

GamesActions.getGame.listen(function(gameId) {
  io.emit('game:listen', {gameId: gameId})
})