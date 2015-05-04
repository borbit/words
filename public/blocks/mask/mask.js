var React = require('react')
var render = require('./mask.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})