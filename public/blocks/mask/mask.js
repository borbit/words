var React = require('react')
var render = require('./mask.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  },

  onClick(e) {
    this.props.onClick && this.props.onClick()
    e.stopPropagation()
  }
})