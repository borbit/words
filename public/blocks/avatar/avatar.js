var React = require('react')
var render = require('./avatar.jsx')

module.exports = React.createClass({
  getDefaultProps() {
    return {
      height: 30
    , width: 30
    }
  },

  render() {
    return render.call(this)
  }
})