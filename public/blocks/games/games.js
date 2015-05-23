var React = require('react')
var Reflux = require('reflux')
var GamesStore = require('../../js/stores/games')
var GameStore = require('../../js/stores/game')
var render = require('./games.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GamesStore, 'games')
  , Reflux.connect(GameStore, 'game')
  ],

  getInitialState() {
    return {
      games: GamesStore.getState()
    , game: GameStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})