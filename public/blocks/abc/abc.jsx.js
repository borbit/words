var React = require('react')
var LETTERS = require('../../../lib/letters')
var Mask = require('../mask/mask')
var _ = require('lodash')

module.exports = function() {
  var letters = []

  _.each(LETTERS, (data, letter) => {
    if (letter != ' ') {
      letters.push(
        <div className="abc__letter" onClick={this.onLetter.bind(this, letter)}>{letter}</div>
      )
    }
  })

  return (
    <Mask>
      <div className="abc modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Виберiть лiтеру</h4>
          </div>
          <div className="abc__letters modal-body">
            {letters}
          </div>
        </div>
      </div>
    </Mask>
  )
}