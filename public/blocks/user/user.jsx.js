var React = require('react')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  var user = this.props.user
  var rank = user.get('ranks').get('score')
  
  return (
    <div className="user">
      <div className="user__avatar">
        <Avatar facebookId={user.get('fb_id')}/>
        {rank >= 0 && <div className="user__rank">{rank+1}</div>}
      </div>
    </div>
  )
}