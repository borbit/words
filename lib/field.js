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
    for (var y = 0; y < FIELD_SIZE; y++) {
    for (var x = 0; x < FIELD_SIZE; x++) {
      if (field[y][x] != ' ') {
        word || (word = [])
        word.push({x: x, y: y, letter: field[y][x]})
      } else if (word) {
        words.push(word)
        word = null
      }
    }}

    // all vertical
    for (var x = 0; x < FIELD_SIZE; x++) {
    for (var y = 0; y < FIELD_SIZE; y++) {
      if (field[y][x] != ' ') {
        word || (word = [])
        word.push({x: x, y: y, letter: field[y][x]})
      } else if (word) {
        words.push(word)
        word = null
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

    return _.map(words, (word) => {
      return _.map(word, (letter) => {
        return letter.letter
      }).join('')
    })
  },

  findPlacementErrors(fieldString, letters) {
    letters = _.sortBy(letters, l => l.y)
    letters = _.sortBy(letters, l => l.x)

    let isHor = _.uniq(_.map(letters, l => l.y)).length == 1
    let isVer = _.uniq(_.map(letters, l => l.x)).length == 1

    if (!isHor && !isVer) {
      return new Error('Word should be in stright line')
    }
    
    let field = this.deserialize(fieldString)
    let all = []

    let isFieldEmpty = !fieldString
    let isFromCenter = _.any(letters, (letter) => {
      return letter.x == 7 && letter.y == 7
    })

    if (isHor) {
      let letter = letters[0]
      let {x, y} = letter
      let i = 0

      while (x--) {
        if (field[y][x] && field[y][x] != ' ') {
          all.push(x)
        } else {
          break
        }
      }
      
      x = letter.x

      while (++x) {
        if (letters[i+1] && letters[i+1].x == x) {
          all.push(letters[++i].x)
        } else if (field[y][x] && field[y][x] != ' ') {
          all.push(x)
        } else if (i == letters.length - 1) {
          break
        }
      }

      all.push(letters[0].x)
      all = _.sortBy(all, x => x)
    }

    if (isVer) {
      let letter = letters[0]
      let {x, y} = letter
      let i = 0

      while (y--) {
        if (field[y] && field[y][x] != ' ') {
          all.push(y)
        } else {
          break
        }
      }
      
      y = letter.y

      while (++y) {
        if (letters[i+1] && letters[i+1].y == y) {
          all.push(letters[++i].y)
        } else if (field[y] && field[y][x] != ' ') {
          all.push(y)
        } else if (i == letters.length - 1) {
          break
        }
      }

      all.push(letters[0].y)
      all = _.sortBy(all, y => y)
    }
    
    for (let i = 0; i < all.length; i++) {
      if (all[i+1] && all[i+1]-1 != all[i]) {
        return new Error('Should be one word')
      }
    }

    if (!isFieldEmpty && letters.length >= all.length) {
      return new Error('Should be connected to existing words')
    }

    if (isFieldEmpty && !isFromCenter) {
      return new Error('Should start from center')
    }

    return false
  }
}