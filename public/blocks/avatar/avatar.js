var React = require('react')
var render = require('./avatar.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})