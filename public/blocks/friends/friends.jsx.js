var React = require('react')
var FriendsFriend = require('./friends__friend')

module.exports = function() {
  let rows = []
  let friends = this.state.friends.sortBy((friend) => {
    let rank = friend.get('ranks').get('score')
    return rank >= 0 ? rank : 10000
  })
  
  friends.forEach((friend) => {
    rows.push(<FriendsFriend friend={friend}/>)
  })

  return (
    <div className="friends">
      <h4>Друзi <span className="badge">{friends.count()}</span></h4>
      <div className="friends__list list-group">
        {rows}
      </div>
    </div>
  )
}