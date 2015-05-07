var React = require('react')
var FriendsFriend = require('./friends__friend')

module.exports = function() {
  var friends = []
  
  this.state.friends.forEach((friend) => {
    friends.push(<FriendsFriend friend={friend}/>)
  })

  return (
    <div className="friends">
      <h4>Друзi <span className="badge">{friends.length}</span></h4>
      <div className="friends__list list-group">
        {friends}
      </div>
    </div>
  )
}