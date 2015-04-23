var React = require('react')
var _ = require('lodash')

module.exports = function() {
  var letters = _.map(this.state.letters, (letter, i) => {
    return (
      <div className="letters__letter" style={{left: i*52}}>
        <div className="letters__letter-score">1</div>
        <div className="letters__letter-tile">{letter.letter}</div>
      </div>
    )
  })
  
  return (
    <div className="letters">
      {letters}
    </div>
  )
}