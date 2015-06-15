var Reflux = require('reflux')
var Immutable = require('immutable')
var StoreMixin = require('../mixins/store')
var GameActions = require('../actions/game')
var Immutable = require('immutable')
var _ = require('lodash')

module.exports = Reflux.createStore({
  mixins: [StoreMixin],
  
  init() {
    this.state = Immutable.Map()
    this.listenToMany(GameActions);
  },

  // GET
  onGet(id) {
    this.state = this.state.set('loading', id)
    this.trigger(this.state)
  },
  onGetCompleted(data) {
    this.setState(data)
  },

  // ADD
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

  // PLAY
  onPlay() {
    this.state = this.state.set('playing', true)
    this.trigger(this.state)
  },
  onPlayCompleted(data) {
    this.state = this.state.set('playing', false)
    this.onReceiveUpdates(data)
  },
  onPlayFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.state = this.state.set('playing', false)
    this.trigger(this.state)
  },

  // PASS
  onPass() {
    this.state = this.state.set('passing', true)
    this.trigger(this.state)
  },
  onPassCompleted(data) {
    this.state = this.state.set('passing', false)
    this.onReceiveUpdates(data)
  },
  onPassFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.state = this.state.set('passing', false)
    this.trigger(this.state)
  },

  // RESIGN
  onResign() {
    this.state = this.state.set('resigning', true)
    this.trigger(this.state)
  },  
  onResignCompleted(data) {
    this.state = this.state.set('resigning', false)
    this.onReceiveUpdates(data)
  },
  onResignFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.state = this.state.set('resigning', false)
    this.trigger(this.state)
  },

  // SWAP
  onSwap() {
    this.state = this.state.set('swapping', true)
    this.trigger(this.state)
  },
  onSwapCompleted(data) {
    this.state = this.state.set('swapping', false)
    this.onReceiveUpdates(data)
  },
  onSwapFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.state = this.state.set('swapping', false)
    this.trigger(this.state)
  },

  // Done
  onDone() {
    this.state = this.state.set('donning', true)
    this.trigger(this.state)
  },
  onDoneCompleted(data) {
    this.state = this.state.set('donning', false)
    this.onReceiveUpdates(data)
  },
  onDoneFailed(data) {
    this.state = this.state.set('error', data.responseJSON.error)
    this.state = this.state.set('donning', false)
    this.trigger(this.state)
  },

  // UPDATES
  onReceiveUpdates(updates) {
    let logs = updates.logs || []
    let chat = updates.chat || []
    let data = _.omit(updates, 'logs', 'chat')

    this.state = this.state.withMutations((state) => {
      _.each(data, (value, key) => {
        state.set(key, value)
      })
    })

    this.state = this.state.withMutations((state) => {
      _.each(logs, (log) => {
        state.set('logs', state.get('logs').push(log))
      })
      _.each(chat, (message) => {
        state.set('chat', state.get('chat').push(message))
      })
    })
    
    this.trigger(this.state)
  },

  onMessageCompleted(data) {
    this.onReceiveUpdates(data)
  }
})