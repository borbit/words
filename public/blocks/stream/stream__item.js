var React = require('react')
var render = require('./stream__item.jsx')
var $ = require('jquery')

module.exports = React.createClass({
  componentDidMount() {
    $(this.refs.avatar.getDOMNode()).tooltip({
      delay: {show: 300, hide: 100}
    , container: 'body'
    , placement: 'top'
    })
  },

  componentWillUnmount() {
    $(this.refs.avatar.getDOMNode()).tooltip('destroy')
  },

  render() {
    return render.call(this)
  }
})
