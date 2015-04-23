var React = require('react')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="games__game">
      <button className="games__play" onClick={this.onPlay}>Грати</button>
      <User user={this.props.game.get('user2')}/>
    </div>
  )
}