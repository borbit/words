var React = require('react')

module.exports = function() {
  return (
    <ul className="tabs">
      {this.props.children}
    </ul>
  )
}