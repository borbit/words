var React = require('react')
var render = require('./preview.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})