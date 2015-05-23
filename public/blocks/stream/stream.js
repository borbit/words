var React = require('react')
var Reflux = require('reflux')
var GameStore = require('../../js/stores/game')
var LogsStore = require('../../js/stores/logs')
var MeStore = require('../../js/stores/me')
var render = require('./stream.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  , Reflux.connect(LogsStore, 'logs')
  , Reflux.connect(MeStore, 'me')
  ],

  getInitialState() {
    return {
      game: GameStore.getState()
    , logs: LogsStore.getState()
    , me: MeStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})