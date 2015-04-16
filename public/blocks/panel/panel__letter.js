var React = require('react')
var render = require('./panel__letter.jsx')
var $ = require('jquery')

module.exports = React.createClass({
  getInitialState() {
    return {
      dragging: false
    , deltaX: 0
    , deltaY: 0
    }
  },

  componentDidMount() {
    this._onDragStart = this.onDragStart.bind(this)
    this._onDragEnd = this.onDragEnd.bind(this)
    this._onDrag = this.onDrag.bind(this)

    var $el = $(this.getDOMNode())

    $el.on('dragstart', this._onDragStart)
    $el.on('dragend', this._onDragEnd)
    $el.on('drag', this._onDrag)
  },

  componentDidUnmount() {
    $el.off('dragstart', this._onDragStart)
    $el.off('dragend', this._onDragEnd)
    $el.off('drag', this._onDrag)
  },

  onMouseOver() {
    this.props.onMouseOver(this.props.id)
  },

  onDragStart() {
    this.props.onDragStart(this.props.id)
  },

  onDragEnd() {
    this.props.onDragEnd(this.props.id)
    this.setState({
      deltaX: 0
    , deltaY: 0
    })
  },

  onDrag(e, d) {
    this.setState({
      deltaX: d.deltaX
    , deltaY: d.deltaY
    })
  },

  render() {
    return render.call(this)
  }
})