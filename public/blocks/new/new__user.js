var React = require('react')
var render = require('./new__user.jsx')

module.exports = React.createClass({
  onToggle() {
    if (!this.props.disabled) {
      this.props.onToggle()
    }
  },

  render() {
    return render.call(this)
  }
})