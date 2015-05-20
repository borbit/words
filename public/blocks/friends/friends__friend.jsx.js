var React = require('react')
var moment = require('moment')
var Avatar = require('../avatar/avatar')
var Confirm = require('../confirm/confirm')
var User = require('../user/user')

module.exports = function() {
  return (
    <div className="friends__friend list-group-item" onClick={this.onCreate}>
      <User user={this.props.friend}>
        <span className="badge">
          <i className="fa fa-clock-o"></i> {moment(+this.props.friend.get('created_at')).toNow(true)}
        </span>
      </User>
      {this.state.confirmCreate &&
        <Confirm
          onOK={this.onCreateConfirm}
          onCancel={this.onCreateCancel}>
          Ви впевненi що хочете почати гру?
        </Confirm>}
    </div>
  )
}