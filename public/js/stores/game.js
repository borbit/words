var Reflux = require('reflux')
var Immutable = require('immutable')
var StoreMixin = require('../mixins/store')
var GamesActions = require('../actions/games')
var GameActions = require('../actions/game')
var Immutable = require('immutable')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],
  
  init() {
    this.state = Immutable.Map()
    this.listenTo(GamesActions.getGame.completed, this.setState)
    this.listenTo(GamesActions.addGame.completed, this.setState)
    this.listenToMany(GameActions);
  },

  onPlay() {
    this.state = this.state.set('playing', true)
    this.trigger(this.state)
  },

  onPlayCompleted(data) {
    this.setState(data)
  },

  onPlayFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.state = this.state.set('playing', false)
    this.trigger(this.state)
  },

  onPass() {
    this.state = this.state.set('passing', true)
    this.trigger(this.state)
  },
  
  onPassCompleted(data) {
    this.setState(data)
  },

  onPassFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.state = this.state.set('passing', false)
    this.trigger(this.state)
  },

  onResign() {
    this.state = this.state.set('resigning', true)
    this.trigger(this.state)
  },
  
  onResignCompleted(data) {
    this.setState(data)
  },

  onResignFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.state = this.state.set('resigning', false)
    this.trigger(this.state)
  },

  onResetError() {
    this.state = this.state.delete('error')
    this.trigger(this.state)
  }
})