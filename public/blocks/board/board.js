const React = require('react')
const render = require('./board.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})