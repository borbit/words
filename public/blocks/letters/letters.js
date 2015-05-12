var React = require('react')
var {PureRenderMixin} = React.addons
var Dragging = require('./letters-dragging')
var render = require('./letters.jsx')
var _ = require('lodash')

module.exports = React.createClass({
  mixins: [
    PureRenderMixin
  ],

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
    this.dragging.on('place', (placed) => {
      this.props.onPlace(placed)
    })
  },

  draggingOff() {
    this.dragging &&
    this.dragging.destroy()
  },

  render() {
    return render.call(this)
  }
})