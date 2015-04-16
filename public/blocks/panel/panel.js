var React = require('react')
var render = require('./panel.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})