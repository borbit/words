var React = require('react')
var moment = require('moment')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="games__game list-group-item" onClick={this.onPlay}>
      <i className="fa fa-play-circle games__play"></i>
      <i className="fa fa-times games__delete"></i>
      <User user={this.props.game.get('opponent')}>
        Почали: {moment(+this.props.game.get('created_at')).fromNow()}<br/>
        Зкiнчили: {moment(+this.props.game.get('finished_at')).fromNow()}<br/>
        Залишилось лiтер: {this.props.game.get('letters_count')}<br/>
        Скор: {`${this.props.game.get('opponent_score')}/${this.props.game.get('my_score')}`}
      </User>
    </div>
  )
}