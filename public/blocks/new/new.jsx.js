var React = require('react')
var moment = require('moment')
var User = require('../user/user')
var Mask = require('../mask/mask')
var cn = require('classnames')

module.exports = function() {
  let rows = []
  let cols = []
  let friends = this.state.friends.sortBy((friend) => {
    let rank = friend.get('ranks').get('score')
    return rank >= 0 ? rank : 10000
  })

  let total = friends.count()
  let half = Math.ceil(total / 2)
  
  friends.forEach((friend, i) => {
    rows.push(
      <div className="new__user list-group-item" onClick={this.onToggle.bind(this, friend.get('fb_id'))}>
        <div className="new__ctrl">
          <input type="checkbox" checked={this.state.checked.has(friend.get('fb_id'))}/>
        </div>
        <div className="new__user-avatar">
          <User user={friend}/>
        </div>
        <div className="new__user-info">
          <span className="new__user-name">{friend.get('fb_name')}</span><br/>
          <span className="new__user-hint">грає {moment(+friend.get('created_at')).toNow(true)}</span>
        </div>
      </div>
    )

    if (i+1 == half || i+1 == total) {
      cols.push(
        <div className="new__col">
          <div className="list-group">
            {rows}
          </div>
        </div>
      )
      rows = []
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
            <h4>Бавитись с друзями <span className="badge">{friends.count()}</span></h4>
            <section className="new__section">
              {cols}
            </section>
            <h4>Бавитись з iньшими <span className="badge">{friends.count()}</span></h4>
            <section className="new__section">
              {cols}
            </section>
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