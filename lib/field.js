const _ = require('lodash')
const FIELD_SIZE = 15

module.exports = {
  FIELD_SIZE: FIELD_SIZE,

  serialize(field) {
    let fieldString = ''
    for (let y = 0; y < FIELD_SIZE; y++) {
    for (let x = 0; x < FIELD_SIZE; x++) {
      fieldString += field[y][x] || ' '
    }}
    return _.trimRight(fieldString)
  },

  deserialize(fieldString) {
    let field = []
    for (let y = 0; y < FIELD_SIZE; y++) {
    for (let x = 0; x < FIELD_SIZE; x++) {
      field[y] || (field[y] = [])
      field[y][x] = fieldString[y*FIELD_SIZE+x] || ' '
    }}
    return field
  },

  defineNewWords(fieldString, letters) {
    let field = this.deserialize(fieldString)
    let words = []
    let word = null

    _.each(letters, (l) => {
      field[l.y][l.x] = l.letter
    })

    // all horizontal
    for (let y = 0; y < FIELD_SIZE; y++, word = []) {
    for (let x = 0; x < FIELD_SIZE; x++) {
      if (field[y][x] != ' ') {
        word || (word = [])
        word.push({x: x, y: y, letter: field[y][x]})
      } else if (word) {
        words.push(word)
        word = null
      }
      if (x == FIELD_SIZE-1 && word) {
        words.push(word)
      }
    }}

    // all vertical
    for (let x = 0; x < FIELD_SIZE; x++, word = []) {
    for (let y = 0; y < FIELD_SIZE; y++) {
      if (field[y][x] != ' ') {
        word || (word = [])
        word.push({x: x, y: y, letter: field[y][x]})
      } else if (word) {
        words.push(word)
        word = null
      }
      if (y == FIELD_SIZE-1 && word) {
        words.push(word)
      }
    }}

    words = _.filter(words, (word) => {
      return word.length > 1
    })

    words = _.filter(words, (word) => {
      return _.any(word, (wl) => {
      return _.any(letters, (ll) => {
        return wl.x == ll.x &&
               wl.y == ll.y
      })})
    })

    return {
      cells: words
    , words: _.map(words, (word) => {
        return _.map(word, (letter) => {
          return letter.letter
        }).join('')
      })
    }
  },

  checkPlacement(fieldString, letters) {
    let field = this.deserialize(fieldString)
    let allLettersCount = 0

    _.each(letters, (l) => {
      field[l.y][l.x] = l.letter
    })

    for (var y = 0; y < FIELD_SIZE; y++) {
    for (var x = 0; x < FIELD_SIZE; x++) {
      if (field[y][x] != ' ') {
        allLettersCount++
      }
    }}

    function countAdjacent(x, y) {
      let count = 0
      if (field[y][x-1] && field[y][x-1] != ' ') {
        field[y][x-1] = ' '
        count += countAdjacent(x-1, y)
        count++
      }
      if (field[y][x+1] && field[y][x+1] != ' ') {
        field[y][x+1] = ' '
        count += countAdjacent(x+1, y)
        count++
      }
      if (field[y-1] && field[y-1][x] != ' ') {
        field[y-1][x] = ' '
        count += countAdjacent(x, y-1)
        count++
      }
      if (field[y+1] && field[y+1][x] != ' ') {
        field[y+1][x] = ' '
        count += countAdjacent(x, y+1)
        count++
      }
      return count
    }

    let adjLettersCount = countAdjacent(
      letters[0].x, letters[0].y)

    let isFieldEmpty = !fieldString
    let isFromCenter = _.any(letters, (letter) => {
      return letter.x == 7 && letter.y == 7
    })

    if (isFieldEmpty && !isFromCenter) {
      return false
    }
    if (allLettersCount > adjLettersCount) {
      return false
    }

    return true
  }
}