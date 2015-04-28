var React = require('react')
var moment = require('moment')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="games__game list-group-item">
      <button className="btn btn-default btn-xs games__play" onClick={this.onPlay}>Грати</button>
      <User user={this.props.game.get('opponent')}>
        Почали: {moment(+this.props.game.get('created_at')).fromNow()}<br/>
        Залишилось лiтер: {this.props.game.get('letters_count')}<br/>
        Окуляри: {`${this.props.game.get('opponent_score')}/${this.props.game.get('my_score')}`}
      </User>
    </div>
  )
}