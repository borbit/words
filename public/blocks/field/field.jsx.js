var React = require('react')
var BONUSES = require('../../../lib/bonuses')
var cn = require('classnames')
var _ = require('lodash')

function isLetterNotEmpty(letter) {
  return letter && letter != ' '
}

module.exports = function() {
  let cells = []
  let field = this.props.field

  _.each(_.range(0, 15), (y) => {
  _.each(_.range(0, 15), (x) => {
    let className = {'field__letter': true}
    let style = {left: `${x*6.6666}%`, top: `${y*6.6666}%`}
    let letter = field[y*15+x]
    
    if (isLetterNotEmpty(letter)) {
      if (y > 0)  { className['field__letter_at'] = isLetterNotEmpty(field[(y-1)*15+x]) }
      if (y < 15) { className['field__letter_ab'] = isLetterNotEmpty(field[(y+1)*15+x]) }
      if (x > 0)  { className['field__letter_al'] = isLetterNotEmpty(field[y*15+x-1]) }
      if (x < 15) { className['field__letter_ar'] = isLetterNotEmpty(field[y*15+x+1]) }
      cells.push(
        <div className={cn(className)} style={style}>
          <div className="field__letter-wrap">
            {letter}
          </div>
        </div>
      )
    } else {
      cells.push(
        <div className="field__cell" style={style}>
          <div className="field__cell-wrap">
            {BONUSES[y] && BONUSES[y][x] &&
              <span className="field__cell-bonus">
                {BONUSES[y][x]}
              </span>}
          </div>
        </div>
      )
    }
  })
  })

  return (
    <div className="field">
      {cells}
    </div>
  )
}