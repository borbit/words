var React = require('react')
var render = require('./field.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})