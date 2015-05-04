var React = require('react')
var _ = require('lodash')

module.exports = function() {
  var letters = null

  if (this.props.letters) {
    letters = _.map(this.props.letters, (letter, i) => {
      return (
        <div className="letters__letter" style={{left: i*52}} data-letter={letter}>
          <div className="letters__letter-tile">{letter}</div>
          <div className="letters__letter-score">1</div>
        </div>
      )
    })
  }
  
  return (
    <div className="letters" key={Date.now()}>
      {letters}
    </div>
  )
}