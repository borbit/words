var React = require('react')
var moment = require('moment')
var User = require('../user/user')
var cn = require('classnames')

module.exports = function() {
  let className = cn({
    'games__game list-group-item': true
  , 'games__game_current': this.props.current
  })

  return (
    <div className={className} onClick={this.onPlay}>
      {this.props.current &&
        <i className="fa fa-play-circle games__play"></i>}
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