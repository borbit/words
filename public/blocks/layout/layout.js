var React = require('react')
var Reflux = require('reflux')
var LayoutStore = require('./layout.store')
var render = require('./layout.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(LayoutStore)
  ],

  getInitialState() {
    return LayoutStore.getState()
  },

  render() {
    return render.call(this)
  }
})