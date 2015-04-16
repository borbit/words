var React = require('react')
var render = require('./table.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})