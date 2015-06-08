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
    setTimeout(() => {
      this.draggingOn()
    }, 0)
  },
  
  componentDidUpdate() {
    setTimeout(() => {
      this.draggingOn()
    }, 0)
  },

  componentWillUpdate() {
    this.draggingOff()
  },

  componentWillUnmount() {
    this.draggingOff()
  },

  draggingOn() {
    this.dragging = Dragging(this.getDOMNode(), this.props.field)
    this.dragging.on('place', (placed) => {
      this.props.onPlace(placed)
    })
  },

  draggingOff() {
    this.dragging &&
    this.dragging.destroy()
  },

  reset() {
    this.forceUpdate()
  },

  render() {
    return render.call(this)
  }
})