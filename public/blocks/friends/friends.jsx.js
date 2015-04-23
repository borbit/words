var React = require('react')
var FriendsFriend = require('./friends__friend')

module.exports = function() {
  var friends = []
  this.state.friends.forEach((friend) => {
    friends.push(<FriendsFriend friend={friend}/>)
  })

  return (
    <div className="friends">
      <div className="friends__list">
        {friends}
      </div>
    </div>
  )
}