var React = require('react')

module.exports = function() {
  return (
    <li className="tabs__tab">
      {this.props.children}
    </li>
  )
}