var React = require('react')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  var user = this.props.user
  
  return (
    <div className="user">
      <div className="user__avatar"><Avatar facebookId={user.get('fb_id')}/></div>
      <div className="user__name">{user.get('fb_name')}</div>
    </div>
  )
}