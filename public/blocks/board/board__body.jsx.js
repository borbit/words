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
        <div className="board__btns board__btns_left btn-group">
          <button className="board__btn btn btn-default" onClick={this.onResign} disabled={!this.state.game.get('id') || this.state.game.get('finished_at') || this.state.game.get('resigning')}>
            <i className={`fa ${this.state.game.get('resigning') ? 'fa-spin fa-circle-o-notch' : 'fa-close'}`}></i>
          </button>
          <button className="board__btn btn btn-default" onClick={this.onPass} disabled={!this.state.game.get('my_turn') || this.state.game.get('passing')}>
            <i className={`fa ${this.state.game.get('passing') ? 'fa-spin fa-circle-o-notch' : 'fa-random'}`}></i>
          </button>
        </div>
        <div className="board__btns board__btns_right btn-group">
          <button className="board__btn btn btn-default" onClick={this.onPlay} disabled={!this.state.game.get('my_turn') || !this.state.letters.length || this.state.game.get('playing')}>
            <i className={`fa ${this.state.game.get('playing') ? 'fa-spin fa-circle-o-notch' : 'fa-play-circle'}`}></i>
          </button>
        </div>
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
      {this.state.confirmPass &&
        <Confirm 
          onOK={this.onPassConfirm}
          onCancel={this.onPassCancel}>
          Ви впевненi що хочете спасувати?
        </Confirm>}
      {this.state.confirmResign &&
        <Confirm
          onOK={this.onResignConfirm}
          onCancel={this.onResignCancel}>
          Ви впевненi що хочете закiнчити гру?
        </Confirm>}
      {this.state.confirmPlay &&
        <Confirm
          onOK={this.onPlayConfirm}
          onCancel={this.onPlayCancel}>
          Ви впевненi що хочете зiграти {this.state.words.join(', ')}?
        </Confirm>}
    </div>
  )
}