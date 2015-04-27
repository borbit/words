var React = require('react')
var Reflux = require('reflux')
var MeStore = require('../../js/stores/me')
var render = require('./board.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(MeStore)
  ],

  getInitialState() {
    return {
      me: MeStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})