var React = require('react')
var render = require('./menu.jsx')

module.exports = React.createClass({
  getInitialState() {
    return {
      tab: 'games'
    }
  },

  onTab(tab) {
    this.setState({tab: tab})
  },

  render() {
    return render.call(this)
  }
})