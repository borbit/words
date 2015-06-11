var React = require('react')
var moment = require('moment')
var NewUser = require('./new__user')
var User = require('../user/user')
var Mask = require('../mask/mask')
var cn = require('classnames')

module.exports = function() {
  let friendsRows = []
  let friendsCols = []
  let friendsFBIds = []
  let friends = this.state.friends.sortBy((friend) => {
    let rank = friend.get('ranks').get('score')
    friendsFBIds.push(friend.get('fb_id'))
    return rank >= 0 ? rank : 10000
  })

  let friendsTotal = friends.count()
  let friendsHalf = Math.ceil(friendsTotal / 2)
  
  friends.forEach((friend, i) => {
    let checked = this.state.checked.has(friend.get('fb_id'))
    let disabled = this.state.checked.count() == 3 && !checked

    friendsRows.push(
      <NewUser
        checked={checked}
        disabled={disabled}
        onToggle={this.onToggle.bind(this, friend.get('fb_id'))}
        key={friend.get('fb_id')}
        user={friend}
      />
    )
    if (i+1 == friendsHalf || i+1 == friendsTotal) {
      friendsCols.push(
        <div className="new__col" key={i}>
          <div className="list-group">
            {friendsRows}
          </div>
        </div>
      )
      friendsRows = []
    }
  })

  let usersRows = []
  let usersCols = []
  let users = this.state.users.filter((user) => {
    return user.get('fb_id') != this.state.me.get('fb_id') &&
      !~friendsFBIds.indexOf(user.get('fb_id'))
  })
  
  users = users.sortBy((user) => {
    let rank = user.get('ranks').get('score')
    return rank >= 0 ? rank : 10000
  })

  let usersTotal = users.count()
  let usersHalf = Math.ceil(usersTotal / 2)
  
  users.forEach((user, i) => {
    let checked = this.state.checked.has(user.get('fb_id'))
    let disabled = this.state.checked.count() == 3 && !checked

    usersRows.push(
      <NewUser
        checked={checked}
        disabled={disabled}
        onToggle={this.onToggle.bind(this, user.get('fb_id'))}
        key={user.get('fb_id')}
        user={user}
      />
    )
    if (i+1 == usersHalf || i+1 == usersTotal) {
      usersCols.push(
        <div className="new__col" key={i}>
          <div className="list-group">
            {usersRows}
          </div>
        </div>
      )
      usersRows = []
    }
  })

  return (
    <Mask>
      <div className="new modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={this.props.onClose}>&times;</button>
            <h4 className="modal-title">Створити нову гру</h4>
          </div>
          <div className="modal-body">
            {!!friends.count() &&
              <section className="new__section">
                <h4>Бавитись с друзями <span className="badge">{friends.count()}</span></h4>
                {friendsCols}
              </section>}
            {!!users.count() &&
              <section className="new__section">
                <h4>Бавитись з iньшими <span className="badge">{users.count()}</span></h4>
                {usersCols}
              </section>}
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={this.onCreate} disabled={!this.state.checked.count()}>Створити гру</button>
            <button className="btn btn-default" onClick={this.props.onClose}>&times;</button>
          </div>
        </div>
      </div>
    </Mask>
  )
}