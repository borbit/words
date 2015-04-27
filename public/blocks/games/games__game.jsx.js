var React = require('react')
var User = require('../user/user')

module.exports = function() {
  var score = `${this.props.game.get('user1_score')}/${this.props.game.get('user2_score')}`
  var letters = this.props.game.get('letters').length
  var opponent = this.props.game.get('user2')

  if (this.props.me.get('fb_id') == opponent.get('fb_id')) {
    opponent = this.props.game.get('user1')
  }

  return (
    <div className="games__game">
      <button className="btn btn-default btn-xs games__play" onClick={this.onPlay}>Грати</button>
      <User user={opponent}>
        Залишилось лiтер: {letters}<br/>
        Окуляри: {score}
      </User>
    </div>
  )
}