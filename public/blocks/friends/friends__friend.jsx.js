var React = require('react')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  return (
    <div className="friends__friend">
      <button className="friends__play">Створити гру</button>
      <div className="friends__avatar"><Avatar facebookId={this.props.facebookId}/></div>
      <div className="friends__name">{this.props.facebookName}</div>
    </div>
  )
}