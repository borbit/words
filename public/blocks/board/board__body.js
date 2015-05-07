const React = require('react')
const Reflux = require('reflux')
const FIELD = require('../../../lib/field')
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
    , confirmResign: false
    , confirmPass: false
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
    let error = FIELD.findPlacementErrors(field, letters)

    if (error) {
      return this.setState({error: error.message})
    }
    
    this.setState({
      words: FIELD.defineNewWords(findPlacementErrorseld, letters)
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
    this.setState({confirmPass: true})
  },

  onPassConfirm() {
    GameActions.pass(this.state.game.get('id'))
    this.onPassCancel()
  },

  onPassCancel() {
    this.setState({confirmPass: false})
  },

  render() {
    return render.call(this)
  }
})