var React = require('react')
var Preview = require('../preview/preview')
var User = require('../user/user')
var moment = require('moment')

module.exports = function() {
  return (
    <div className="games__game list-group-item" onClick={this.onPlay}>
      <div className="games__preview">
        <Preview field={this.props.game.get('field')}/>
      </div>
      <User user={this.props.game.get('opponent')}>
        Почали: {moment(+this.props.game.get('created_at')).fromNow()}<br/>
        Попер. хiд: {moment(+this.props.game.get('last_turn_at')).fromNow()}<br/>
        Залишилось лiтер: {this.props.game.get('letters_count')}<br/>
        Рахунок: {`${this.props.game.get('opponent_score')}/${this.props.game.get('my_score')}`}
      </User>
    </div>
  )
}