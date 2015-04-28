var React = require('react')
var Reflux = require('reflux')
var GameStore = require('../../js/stores/game')
var MeStore = require('../../js/stores/me')
var render = require('./board.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  , Reflux.connect(MeStore, 'me')
  ],

  getInitialState() {
    return {
      game: GameStore.getState()
    , me: MeStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})