var React = require('react')
var moment = require('moment')
var User = require('../user/user')
var cn = require('classnames')

module.exports = function() {
  let className = cn({
    'games__game list-group-item': true
  , 'games__game_current': this.props.current
  })

  let lastTurnAt = this.props.game.get('last_turn_at')

  if (!lastTurnAt) {
    lastTurnAt = this.props.game.get('created_at')
  }
  
  return (
    <div className={className} onClick={this.onPlay}>
      {this.props.current &&
        <i className="fa fa-play-circle games__play"></i>}
      <User user={this.props.game.get('opponent')}>
        <i className="fa fa-clock-o"></i> {moment(+lastTurnAt).fromNow()}<br/>
        <i className="fa fa-star"></i> {this.props.game.get('opponent_score')}-{this.props.game.get('my_score')}
      </User>
    </div>
  )
}