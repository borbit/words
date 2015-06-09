var Reflux = require('reflux')
var Immutable = require('immutable')
var StoreMixin = require('../../js/mixins/store')
var BoardsActions = require('./boards.actions')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],

  init() {
    this.listenToMany(BoardsActions)
    this.state = Immutable.Map({
      current: 'score'
    })
  },

  onGetBoard(boardName) {
    let data = Immutable.Map({
      list: Immutable.List()
    , loading: true
    })
    this.state = this.state.set(boardName, data)
    this.state = this.state.set('next', boardName)
    this.trigger(this.state)
  },

  onGetBoardCompleted(board) {
    if (this.state.get('next') != board.name) {
      return
    }
    let data = Immutable.Map({
      list: Immutable.fromJS(board.list)
    , loading: false
    })
    this.state = this.state.set(board.name, data)
    this.state = this.state.set('current', board.name)
    this.trigger(this.state)
  }
})