const React = require('react')
const render = require('./board.jsx')
const $ = require('jquery')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})