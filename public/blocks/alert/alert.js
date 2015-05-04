var React = require('react')
var render = require('./alert.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})