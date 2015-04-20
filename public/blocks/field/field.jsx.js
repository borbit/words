var React = require('react')
var Table = require('../table/table')
var Panel = require('../panel/panel')

module.exports = function() {
  return (
    <div className="field">
      <Table/>
      <Panel/>
    </div>
  )
}