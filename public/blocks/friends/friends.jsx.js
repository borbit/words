var React = require('react')
var FriendsFriend = require('./friends__friend')
var Tabs = require('../tabs/tabs')

module.exports = function() {
  var friends = []
  var tabs = [
    {title: 'Грати зараз', active: true}
  , {title: 'Запросити'}
  ]

  this.state.friends.forEach((friend) => {
    friends.push(
      <FriendsFriend
        facebookName={friend.fb_name}
        facebookId={friend.fb_id}/>)
  })

  return (
    <div className="friends">
      <Tabs tabs={tabs}/>
      <div className="friends__list">
        {friends}
      </div>
    </div>
  )
}