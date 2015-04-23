var React = require('react')
var Reflux = require('reflux')
var GamesStore = require('./games.store')
var render = require('./games.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GamesStore)
  ],

  getInitialState() {
    return {
      games: GamesStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})