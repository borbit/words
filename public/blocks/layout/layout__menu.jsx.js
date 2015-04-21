var React = require('react')
var Tabs = require('../tabs/tabs')
var Friends = require('../friends/friends')
var Me = require('../me/me')

module.exports = function() {
  var tabs = [
    {title: 'Поточнi iгри', active: true}
  ]

  return (
    <div className="layout__page">
      <div className="layout__content">
        <Tabs tabs={tabs}/>
      </div>
      <div className="layout__aside">
        <Friends/>
      </div>
    </div>
  )
}