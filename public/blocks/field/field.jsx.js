var React = require('react')
var Table = require('../table/table')
var Panel = require('../panel/panel')
var Aside = require('../aside/aside')

module.exports = function() {
  return (
    <div className="field">
      <div className="field__table">
        <Table/>
        <Panel/>
      </div>
      <div className="field__aside">
        <Aside/>
      </div>
    </div>
  )
}