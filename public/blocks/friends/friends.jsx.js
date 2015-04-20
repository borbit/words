var React = require('react')
var Tabs = require('../tabs/tabs')
var TabsTab = require('../tabs/tabs__tab')
var FriendsFriend = require('./friends__friend')

module.exports = function() {
  var friends = []

  this.state.friends.forEach((friend) => {
    friends.push(
      <FriendsFriend
        facebookName={friend.facebook_name}
        facebookId={friend.facebook_id}/>)
  })

  return (
    <div className="friends">
      <Tabs>
        <TabsTab>Друзi</TabsTab>
        <TabsTab>Запросити</TabsTab>
      </Tabs>
      <div className="friends__list">
        {friends}
      </div>
    </div>
  )
}