var React = require('react')
var Dragging = require('./letters-dragging')
var render = require('./letters.jsx')

module.exports = React.createClass({
  componentDidMount() {
    this.draggingOn()
  },
  componentDidUpdate() {
    this.draggingOn()
  },

  componentWillUpdate() {
    this.draggingOff()
  },
  componentWillUnmount() {
    this.draggingOff()
  },

  draggingOn() {
    this.dragging = Dragging(this.getDOMNode())
  },

  draggingOff() {
    this.dragging && this.dragging.destroy()
  },

  render() {
    return render.call(this)
  }
})