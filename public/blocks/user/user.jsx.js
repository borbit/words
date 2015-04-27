var React = require('react')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  var user = this.props.user
  var className = 'user'

  if (this.props.theme) {
    className += ' user_' + this.props.theme
  }
  
  return (
    <div className={className}>
      <div className="user__avatar"><Avatar facebookId={user.get('fb_id')}/></div>
      <div className="user__info">
        {user.get('fb_name')}<br/>
        {this.props.children}
      </div>
    </div>
  )
}