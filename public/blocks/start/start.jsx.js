var React = require('react')
var moment = require('moment')
var User = require('../user/user')
var cn = require('classnames')

module.exports = function() {
  let rows = []
  let friends = this.state.friends.sortBy((friend) => {
    let rank = friend.get('ranks').get('score')
    return rank >= 0 ? rank : 10000
  })
  
  friends.forEach((friend) => {
    rows.push(
      <div className="start__user list-group-item">
        <div className="start__ctrl">
          <button className="btn btn-sm btn-default">Створити гру</button>
        </div>
        <div className="start__user-avatar">
          <User user={friend}/>
        </div>
        <div className="start__user-info">
          <span className="start__user-name">{friend.get('fb_name')}</span><br/>
          <span className="start__user-hint">грає {moment(+friend.get('created_at')).toNow(true)}</span>
        </div>
      </div>
    )
  })

  return (
    <div className="start">
      <h4>Бавитись с друзями <span className="badge">{friends.count()}</span></h4>
      <div className="list-group">
        {rows}
      </div>
    </div>
  )
}