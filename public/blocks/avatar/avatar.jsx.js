var React = require('react')

module.exports = function() {
  return (
    <img className="avatar" src={`//graph.facebook.com/${this.props.facebookId}/picture`} width="20" height="20"/>
  )
}