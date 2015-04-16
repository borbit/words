var React = require('react')
var render = require('./aside.jsx')

module.exports = React.createClass({
  render() {
    return render.call(this)
  }
})