var React = require('react')
var render = require('./swap.jsx')
var _ = require('lodash')

module.exports = React.createClass({
  getInitialState() {
    return {
      selected: []
    }
  },

  onToggle(index) {
    if (~this.state.selected.indexOf(index)) {
      var selected = _.without(this.state.selected, index)
    } else {
      var selected = this.state.selected.concat([index])
    }
    this.setState({selected: selected})
  },

  onSwap() {
    this.props.onSwap(this.state.selected)
  },

  render() {
    return render.call(this)
  }
})