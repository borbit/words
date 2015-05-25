var React = require('react')
var render = require('./party.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})