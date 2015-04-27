var React = require('react')

module.exports = function() {
  return (
    <img className="avatar" src={`//graph.facebook.com/${this.props.facebookId}/picture`} width="30" height="30"/>
  )
}