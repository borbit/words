var React = require('react')
var moment = require('moment')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="new__user list-group-item" onClick={this.props.onToggle}>
      <div className="new__ctrl">
        <input type="checkbox" checked={this.props.checked}/>
      </div>
      <div className="new__user-avatar">
        <User user={this.props.user}/>
      </div>
      <div className="new__user-info">
        <span className="new__user-name">{this.props.user.get('fb_name')}</span><br/>
        <span className="new__user-hint">грає {moment(+this.props.user.get('created_at')).toNow(true)}</span>
      </div>
    </div>
  )
}