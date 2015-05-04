var React = require('react')
var {PureRenderMixin} = React.addons
var render = require('./field.jsx')

module.exports = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  render() {
    return render.call(this)
  }
})