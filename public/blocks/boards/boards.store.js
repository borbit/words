var Reflux = require('reflux')
var Immutable = require('immutable')
var StoreMixin = require('../../js/mixins/store')
var BoardsActions = require('./boards.actions')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],

  init() {
    this.listenToMany(BoardsActions)
    this.state = Immutable.Map({
      currBoard: 'score'
    , currType: 'daily'
    })
  },

  onGetBoard(boardType, boardName) {
    let data = Immutable.Map({
      list: Immutable.List()
    , loading: true
    })
    this.state = this.state.set(boardType + boardName, data)
    this.state = this.state.set('nextBoard', boardName)
    this.state = this.state.set('nextType', boardType)
    this.trigger(this.state)
  },

  onGetBoardCompleted(board) {
    if (this.state.get('nextBoard') != board.name ||
        this.state.get('nextType') != board.type) {
      return
    }
    let data = Immutable.Map({
      list: Immutable.fromJS(board.list)
    , loading: false
    })
    this.state = this.state.set(board.type + board.name, data)
    this.state = this.state.set('currBoard', board.name)
    this.state = this.state.set('currType', board.type)
    this.trigger(this.state)
  }
})