require('../../js/bootstrap')

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

React.render(<Layout/>, document.getElementsByTagName('main')[0])

io = io.connect('ws://localhost:5001')
io.on('connect', () => {
  console.log('IO CONNECTED')
})

io.on('game:update', (data) => {
  GamesActions.getGame(data.gameId)
  GamesActions.getGames()
})

GamesActions.getGame.listen(function(gameId) {
  io.emit('game:listen', {gameId: gameId})
})