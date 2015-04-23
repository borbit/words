var React = require('react')
var render = require('./board.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})