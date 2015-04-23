var React = require('react')
var draggable = require('./letters-draggable')
var render = require('./letters.jsx')
var _ = require('lodash')

module.exports = React.createClass({
  getInitialState() {
    var letters;  
    letters = ['Б','Б','Т','Р','И','О', '']
    letters = _.map(letters, (letter, i) => {
      return {
        id: _.uniqueId()
      , letter: letter
      }
    })
    return {
      letters: letters
    }
  },

  componentDidMount() {
    draggable(this.getDOMNode())
  },

  render() {
    return render.call(this)
  }
})