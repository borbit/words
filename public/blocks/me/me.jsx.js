var React = require('react')
var Avatar = require('../avatar/avatar')

module.exports = function() {
  var me = this.state.me

  return (
    <div className="me">
      <span className="me__avatar"><Avatar facebookId={me.get('facebook_id')}/></span>
      <span className="me__name">{me.get('facebook_name')}</span>
    </div>
  )
}