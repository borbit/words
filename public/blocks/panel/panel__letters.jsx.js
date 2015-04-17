var React = require('react')
var _ = require('lodash')

module.exports = function() {
  var letters = _.map(this.state.letters, (letter, i) => {
    return (
      <div className="panel__letter" style={{left: i*52}}>
        <div className="panel__letter-score">1</div>
        <div className="panel__letter-tile">{letter.letter}</div>
      </div>
    )
  })
  
  return (
    <div className="panel__letters">
      {letters}
    </div>
  )
}