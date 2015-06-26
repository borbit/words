var React = require('react')
var Avatar = require('../avatar/avatar')
var moment = require('moment')
var cn = require('classnames')

module.exports = function() {
  let className = cn({
    'stream__item': true
  , 'stream__item_chat': this.props.isChat
  , 'stream__item_me': this.props.isMe
  })

  return (
    <div className={className} key={this.props.date}>
      <div className="stream__balloon">
        <div className="stream__avatar" title={this.props.userName} ref="avatar">
          <Avatar facebookId={this.props.userFBId} width="20" height="20"/>
        </div>
        <div className="stream__message">
          <p className="stream__message-text" dangerouslySetInnerHTML={{__html: this.props.message}}/>
          <i className="stream__message-date">{moment(this.props.date).fromNow()}</i>
        </div>
      </div>
    </div>
  )
}