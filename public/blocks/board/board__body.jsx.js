var React = require('react')
var Field = require('../field/field')
var Letters = require('../letters/letters')
var Confirm = require('../confirm/confirm')
var Alert = require('../alert/alert')
var Swap = require('../swap/swap')

module.exports = function() {
  let playIcon = <i className="fa fa-play-circle"></i>
  let menuIcon = <i className="fa fa-navicon"></i>
  let playDisabled = false
  let menuDisabled = false

  if (this.state.game.get('playing')) {
    playIcon = <i className="fa fa-spin fa-circle-o-notch"></i>
    playDisabled = true
  }

  if (this.state.game.get('resigning') ||
      this.state.game.get('swipping') ||
      this.state.game.get('passing')) {
    menuIcon = <i className="fa fa-spin fa-circle-o-notch"></i>
    menuDisabled = true
  }

  if (!this.state.letters.length ||
      !this.state.game.get('my_turn')) {
    playDisabled = true
  }

  if (!this.state.game.get('id') ||
       this.state.game.get('finished_at')) {
    menuDisabled = true
  }

  return (
    <div className="panel-body board__body">
      <div className="board__field">
        <Field field={this.state.game.get('field') || ''}/>
      </div>
      <div className="board__letters">
        <div className="board__btns board__btns_left">
          <div className="btn-group dropup">
            <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" disabled={menuDisabled}>
              {menuIcon}
            </button>
            <ul className="dropdown-menu">
              <li onClick={this.onSwap} className={!this.state.game.get('my_turn') && 'disabled'}><a>Помiняти лiтери</a></li>
              <li onClick={this.onResign} className={this.state.game.get('finished_at') && 'disabled'}><a>Закiнчити гру</a></li>
              <li onClick={this.onPass} className={!this.state.game.get('my_turn') && 'disabled'}><a>Спасувати</a></li>
            </ul>
          </div>
        </div>
        <div className="board__btns board__btns_right">
          <button className="board__btn btn btn-default" onClick={this.onPlay} disabled={playDisabled}>
            {playIcon}
          </button>
        </div>
        <Letters 
          letters={this.state.game.get('my_letters')}
          field={this.state.game.get('field')}
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
      {this.state.confirmSwap &&
        <Swap
          onSwap={this.onSwapConfirm}
          onCancel={this.onSwapCancel}
          letters={this.state.game.get('my_letters')}>
        </Swap>}
    </div>
  )
}