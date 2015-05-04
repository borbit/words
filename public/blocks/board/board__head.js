const React = require('react')
const Reflux = require('reflux')
const MeStore = require('../../js/stores/me')
const GameStore = require('../../js/stores/game')
const render = require('./board__head.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  , Reflux.connect(MeStore, 'me')
  ],

  getInitialState() {
    return {
      me: MeStore.getState()
    , game: GameStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})