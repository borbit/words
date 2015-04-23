var React = require('react')
var render = require('./user.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})