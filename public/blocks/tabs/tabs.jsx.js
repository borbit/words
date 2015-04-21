var React = require('react')
var cn = require('classnames')
var _ = require('lodash')

module.exports = function() {
  var tabs = _.map(this.props.tabs, (tab) => {
    var className = cn({
      'tabs__tab': true
    , 'tabs__tab_active': tab.active
    })
    return (
      <li className={className}>{tab.title}</li>
    )
  })
  return (
    <ul className="tabs">
      {tabs}
    </ul>
  )
}