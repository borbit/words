var React = require('react')
var render = require('./abc.jsx')

module.exports = React.createClass({
  onLetter(letter) {
    this.props.onLetter(letter)
  },

  render() {
    return render.call(this)
  }
})