var React = require('react')
var Reflux = require('reflux')
var FIELD = require('../../../lib/field')
var MeStore = require('../../js/stores/me')
var GameStore = require('../../js/stores/game')
var GameActions = require('../../js/actions/game')
var EscapeMixin = require('../../js/mixins/escape')
var render = require('./board__body.jsx')
var _ = require('lodash')

module.exports = React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'game')
  , Reflux.connect(MeStore, 'me')
  , EscapeMixin
  ],

  getInitialState() {
    return {
      me: MeStore.getState()
    , game: GameStore.getState()
    , confirmPlay: false
    , confirmResign: false
    , confirmPass: false
    , confirmSwap: false
    , confirmDone: false
    , confirmPoke: false
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
  },

  onPlay() {
    let letters = this.state.letters
    let field = this.state.game.get('field')

    if (!FIELD.checkPlacement(field, letters)) {
      return this.setState({
        error: 'Неправильне розташування лiтер'
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
    track('Clicks', 'Board - Resign')
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
    track('Clicks', 'Board - Pass')
    this.setState({confirmPass: true})
  },
  onPassConfirm() {
    GameActions.pass(this.state.game.get('id'))
    this.onPassCancel()
  },
  onPassCancel() {
    this.setState({confirmPass: false})
  },

  onSwap() {
    track('Clicks', 'Board - Swap')
    this.setState({confirmSwap: true})
  },
  onSwapConfirm(letters) {
    GameActions.swap(this.state.game.get('id'), letters)
    this.onSwapCancel()
  },
  onSwapCancel() {
    this.setState({confirmSwap: false})
  },

  onDone() {
    track('Clicks', 'Board - Done')
    this.setState({confirmDone: true})
  },
  onDoneConfirm(letters) {
    GameActions.done(this.state.game.get('id'))
    this.onDoneCancel()
  },
  onDoneCancel() {
    this.setState({confirmDone: false})
  },

  onPoke() {
    track('Clicks', 'Board - Poke')
    this.setState({confirmPoke: true})
  },
  onPokeConfirm(letters) {
    GameActions.poke(this.state.game.get('id'))
    this.onPokeCancel()
  },
  onPokeCancel() {
    this.setState({confirmPoke: false})
  },

  onReset() {
    track('Clicks', 'Board - Reset')
    this.setState({letters: []})
    this.refs.letters.reset()
  },

  onEscape() {
    this.onReset()
  },

  render() {
    return render.call(this)
  }
})