var React = require('react')
var render = require('./menu.jsx')
var $ = require('jquery')

module.exports = React.createClass({
  componentDidMount() {
    $(this.getDOMNode()).on('touchmove', (e) => {
      e.stopPropagation()
    })
  },

  render() {
    return render.call(this)
  }
})