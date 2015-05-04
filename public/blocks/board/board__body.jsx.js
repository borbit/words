var React = require('react')
var Field = require('../field/field')
var Letters = require('../letters/letters')
var Confirm = require('../confirm/confirm')
var Alert = require('../alert/alert')

module.exports = function() {
  return (
    <div className="panel-body board__body">
      <div className="board__field">
        <Field field={this.state.game.get('field') || ''}/>
      </div>
      <div className="board__letters">
        <button className="board__btn board__btn_pass btn btn-default" onClick={this.onPass} disabled={!this.state.game.get('my_turn')}>
          {!this.state.game.get('passing') &&
            <i className="fa fa-random"></i>}
          {this.state.game.get('passing') &&
            <i className="fa fa-spin fa-circle-o-notch"></i>}
        </button>
        <button className="board__btn board__btn_play btn btn-default" onClick={this.onPlay} disabled={!this.state.game.get('my_turn') || !this.state.placed.length || this.state.game.get('playing')}>
          {!this.state.game.get('playing') &&
            <i className="fa fa-play-circle"></i>}
          {this.state.game.get('playing') &&
            <i className="fa fa-spin fa-circle-o-notch"></i>}
        </button>
        <Letters 
          letters={this.state.game.get('my_letters')}
          onPlace={this.onPlace}/>
      </div>
      {this.state.error &&
        <Alert title="Помилка" onClose={this.onResetError}>
          {this.state.error}
        </Alert>}
      {this.state.game.get('error') &&
        <Alert title="Помилка" onClose={this.onResetError}>
          {this.state.game.get('error')}
        </Alert>}
      {this.state.confirmPlay &&
        <Confirm onOK={this.onPlayConfirm}>
          Ви впевненi що хочете цього?
        </Confirm>}
      {this.state.confirmPass &&
        <Confirm onOK={this.onPassConfirm}>
          Ви впевненi що хочете цього?
        </Confirm>}
    </div>
  )
}