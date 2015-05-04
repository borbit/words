var React = require('react')
var {PureRenderMixin} = React.addons
var Dragging = require('./letters-dragging')
var render = require('./letters.jsx')

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
    this.dragging.on('place', (letters) => {
      this.props.onPlace(letters)
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