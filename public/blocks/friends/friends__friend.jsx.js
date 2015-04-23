var React = require('react')
var Avatar = require('../avatar/avatar')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="friends__friend">
      <button className="friends__play" onClick={this.onPlay}>Створити гру</button>
      <User user={this.props.friend}/>
    </div>
  )
}