var React = require('react')
var render = require('./aside.jsx')
var $ = require('jquery')

module.exports = React.createClass({
  componentDidUpdate() {
    $(this.getDOMNode()).find('.aside__btns .btn').tooltip({
      delay: {show: 300, hide: 100}
    , container: 'body'
    , placement: 'auto'
    })
  },

  render() {
    return render.call(this)
  }
})