var React = require('react')
var Reflux = require('reflux')
var GamesStore = require('./games.store')
var MeStore = require('../../js/stores/me')
var render = require('./games.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GamesStore)
  , Reflux.connect(MeStore)
  ],

  getInitialState() {
    return {
      games: GamesStore.getState()
    , me: MeStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})