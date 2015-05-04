const React = require('react')
const Reflux = require('reflux')
const GameStore = require('../../js/stores/game')
const GameActions = require('../../js/actions/game')
const render = require('./board__body.jsx')
const _ = require('lodash')

const ERROR_ONE_WORD = 'Маэ бути одне слово'
const ERROR_CONNECT_TO_PREVIOUS = 'Слово маэ з\'эднуватися з попереднiми'
const ERROR_START_FROM_CENTER = 'Слово маэ починатися з середини поля'
const ERROR_STRIGHT_LINE = 'Слово маэ буди в одну лiнiю'

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  ],

  getInitialState() {
    return {
      game: GameStore.getState()
    , confirmPlay: false
    , confirmPass: false
    , error: null
    , letters: []
    , words: []
    }
  },

  onResetError() {
    if (this.state.error) {
      this.setState({error: null})
    }
    if (this.state.game.get('error')) {
      GameActions.resetError()
    }
  },

  onPlay() {
    let letters = this.state.letters
    letters = _.sortBy(letters, l => l.y)
    letters = _.sortBy(letters, l => l.x)

    let isHor = _.uniq(_.map(letters, l => l.y)).length == 1
    let isVer = _.uniq(_.map(letters, l => l.x)).length == 1

    if (!isHor && !isVer) {
      return this.setState({
        error: ERROR_STRIGHT_LINE
      })
    }
    
    let field = []
    let fieldString = this.state.game.get('field')
    let isFieldEmpty = !fieldString

    for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
      field[y] || (field[y] = [])
      field[y][x] = fieldString[y*15+x] || ' '
    }}

    let all = []

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
        return this.setState({
          error: ERROR_ONE_WORD
        })
      }
    }

    if (!isFieldEmpty && all.length <= letters.length) {
      return this.setState({
        error: ERROR_CONNECT_TO_PREVIOUS
      })
    }

    if (isFieldEmpty && !_.any(letters, (letter) => {
      return letter.x == 7 && letter.y == 7
    })) {
      return this.setState({
        error: ERROR_START_FROM_CENTER
      })
    }
    
    this.setState({
      words: this.getNewWords(letters)
    , confirmPlay: true
    })
  },

  getNewWords(letters) {
    let all = this.getAllWords(letters)

    return _.filter(all, (word) => {
      return _.any(word, (wl) => {
        return _.any(letters, (ll) => {
          return wl.x == ll.x &&
                 wl.y == ll.y
        })
      })
    })
  },

  getAllWords(letters) {
    let field = deserializeField(game.field)
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

    return words
  },

  onPass() {
    this.setState({confirmPass: true})
  },

  onPlayConfirm() {
    GameActions.play(this.state.game.get('id'), this.state.letters)
    this.setState({confirmPlay: false})
  },

  onPassConfirm() {
    GameActions.pass(this.state.game.get('id'))
    this.setState({confirmPass: false})
  },

  render() {
    return render.call(this)
  }
})