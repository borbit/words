const React = require('react')
const Reflux = require('reflux')
const FIELD = require('../../../lib/field')
const GameStore = require('../../js/stores/game')
const GameActions = require('../../js/actions/game')
const render = require('./board__body.jsx')
const _ = require('lodash')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  ],

  getInitialState() {
    return {
      game: GameStore.getState()
    , confirmPlay: false
    , confirmResign: false
    , confirmPass: false
    , confirmSwap: false
    , error: null
    , letters: []
    , words: []
    }
  },

  onPlace(letters) {
    this.setState({letters: letters})
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
    let field = this.state.game.get('field')

    if (!FIELD.checkPlacement(field, letters)) {
      return this.setState({
        error: 'Не правильне розташування лiтер'
      })
    }
    
    this.setState({
      words: FIELD.defineNewWords(field, letters)
    , confirmPlay: true
    })
  },

  onPlayConfirm() {
    GameActions.play(this.state.game.get('id'), this.state.letters)
    this.onPlayCancel()
  },

  onPlayCancel() {
    this.setState({confirmPlay: false})
  },

  onResign() {
    this.setState({confirmResign: true})
  },

  onResignConfirm() {
    GameActions.resign(this.state.game.get('id'))
    this.onResignCancel()
  },

  onResignCancel() {
    this.setState({confirmResign: false})
  },

  onPass() {
    if (this.state.game.get('my_turn')) {
      this.setState({confirmPass: true})
    }
  },

  onPassConfirm() {
    GameActions.pass(this.state.game.get('id'))
    this.onPassCancel()
  },

  onPassCancel() {
    this.setState({confirmPass: false})
  },

  onSwap() {
    if (this.state.game.get('my_turn')) {
      this.setState({confirmSwap: true})
    }
  },

  onSwapConfirm(letters) {
    GameActions.swap(this.state.game.get('id'), letters)
    this.onSwapCancel()
  },

  onSwapCancel() {
    this.setState({confirmSwap: false})
  },

  render() {
    return render.call(this)
  }
})