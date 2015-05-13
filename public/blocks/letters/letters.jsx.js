var React = require('react')
var LETTERS = require('../../../lib/letters')
var _ = require('lodash')

module.exports = function() {
  var letters = _.map(this.props.letters, (letter, i) => {
    return (
      <div className="letters__letter" style={{left: i*52}} data-letter={letter}>
        <div className="letters__letter-score">{LETTERS[letter].score || null}</div>
        <div className="letters__letter-tile">{letter}</div>
      </div>
    )
  })
  
  return (
    <div className="letters" key={Date.now()}>
      <div className="letters__list">
        {letters}
      </div>
    </div>
  )
}