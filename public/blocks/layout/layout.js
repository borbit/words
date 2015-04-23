var React = require('react')
var Reflux = require('reflux')
var LayoutStore = require('./layout.store')
var render = require('./layout.jsx')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(LayoutStore, 'layout')
  ],

  getInitialState() {
    return {
      layout: LayoutStore.getState()
    }
  },

  render() {
    return render.call(this)
  }
})