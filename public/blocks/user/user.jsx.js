var React = require('react')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  var user = this.props.user
  var rank = user.get('ranks').get('score')
  var style = {}

  if (this.props.width) {
    style['width'] = this.props.width
  }
  if (this.props.height) {
    style['height'] = this.props.height
  }
  
  return (
    <div className="user" style={style}>
      <div className="user__avatar">
        <Avatar facebookId={user.get('fb_id')} width={this.props.width} height={this.props.height}/>
        {rank >= 0 && <div className="user__rank">{rank+1}</div>}
      </div>
    </div>
  )
}