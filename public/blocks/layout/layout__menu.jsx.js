var React = require('react')
var Friends = require('../friends/friends')
var Me = require('../me/me')

module.exports = function() {
  return (
    <div className="layout__page">
      <div className="layout__aside">
        <Me/>
        <Friends/>
      </div>
    </div>
  )
}