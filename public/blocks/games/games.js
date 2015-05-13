var React = require('react')
var Reflux = require('reflux')
var GamesStore = require('../../js/stores/games')
var GameStore = require('../../js/stores/game')
var MeStore = require('../../js/stores/me')
var render = require('./games.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GamesStore, 'games')
  , Reflux.connect(GameStore, 'game')
  , Reflux.connect(MeStore, 'me')
  ],

  getInitialState() {
    return {
      games: GamesStore.getState()
    , game: GamesStore.getState()
    , me: MeStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})