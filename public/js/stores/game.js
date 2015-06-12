var Reflux = require('reflux')
var Immutable = require('immutable')
var StoreMixin = require('../mixins/store')
var GameActions = require('../actions/game')
var Immutable = require('immutable')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],
  
  init() {
    this.state = Immutable.Map()
    this.listenToMany(GameActions);
  },

  onGet(id) {
    this.state = this.state.set('loading', id)
    this.trigger(this.state)
  },

  onGetCompleted(data) {
    this.setState(data)
  },

  onAdd() {
    this.state = this.state.set('loading', true)
    this.trigger(this.state)
  },

  onAddCompleted(data) {
    this.setState(data)
  },

  onAddFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.trigger(this.state)
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

  onSwap() {
    this.state = this.state.set('swapping', true)
    this.trigger(this.state)
  },
  
  onSwapCompleted(data) {
    this.setState(data)
  },

  onSwapFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.state = this.state.set('swapping', false)
    this.trigger(this.state)
  }
})