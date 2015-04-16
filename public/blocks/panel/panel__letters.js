var React = require('react')
var render = require('./panel__letters.jsx')
var _ = require('lodash')

module.exports = React.createClass({
  getInitialState() {
    var letters;
    
    letters = ['А','Б','В','Г','Д','Е','И']
    letters = _.map(letters, (letter, i) => {
      return {
        id: _.uniqueId()
      , letter: letter
      , index: i
      }
    })

    return {
      letters: letters
    , current: null
    }
  },

  onLetterDragStart(id) {
    var letter = this.getLetter(id)
    this.state.current = id
    letter.index = null
  },

  onLetterDragEnd() {
    var letter = this.getLetter(this.state.current)
    letter.index = this.getFirstEmptyIndex()
    this.state.current = null
    this.forceUpdate()
  },

  onLetterDrag() {
    
  },

  reorderLetters(id) {
    if (!this.state.current ||
         this.state.current == id) {
      return
    }

    var letters = this.mapLetters()
    var letterCurrent = this.getLetter(this.state.current)
    var letterOvered = this.getLetter(id)

    var ei = this.getFirstEmptyIndex()
    var li = letterOvered.index

    if (ei < li) {
      for (var i = ei + 1; i <= li; i++) {
        letters[i].index--
      }
    }

    this.forceUpdate()
  },

  mapLetters() {
    var letters = {}
    _.each(this.state.letters, (letter) => {
      letters[letter.index] = letter
    })
    return letters
  },

  getLetter(id) {
    return _.find(this.state.letters, (letter) => {
      return letter.id == id
    })
  },

  getClosestEmptyIndex(index) {

  },

  getFirstEmptyIndex() {
    var letters = this.mapLetters()
    for (var i = 0; i < 7; i++) {
      if (!letters[i]) return i
    }
  },

  render() {
    return render.call(this)
  }
})