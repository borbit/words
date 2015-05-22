var React = require('react')
var Friends = require('../friends/friends')
var Games = require('../games/games')

module.exports = function() {
  return (
    <div className="menu">
      <Games/>
      <Friends/>      
    </div>
  )
}