var React = require('react')
var render = require('./tabs.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})