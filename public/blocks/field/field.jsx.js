const React = require('react')
const cn = require('classnames')
const _ = require('lodash')

function isLetterNotEmpty(letter) {
  return letter && letter != ' '
}

module.exports = function() {
  let cells = []
  let field = this.props.field

  _.range(0, 15).forEach((y) => {
  _.range(0, 15).forEach((x) => {
    let className = {'field__cell': true}
    let style = {left: `${x*6.6666}%`, top: `${y*6.6666}%`}
    let letter = field[y*15+x]
    
    if (isLetterNotEmpty(letter)) {
      if (y > 0)  { className['field__cell_at'] = isLetterNotEmpty(field[(y-1)*15+x]) }
      if (y < 15) { className['field__cell_ab'] = isLetterNotEmpty(field[(y+1)*15+x]) }
      if (x > 0)  { className['field__cell_al'] = isLetterNotEmpty(field[y*15+x-1]) }
      if (x < 15) { className['field__cell_ar'] = isLetterNotEmpty(field[y*15+x+1]) }
      cells.push(<div className={cn(className)} style={style}>{letter}</div>)
    }
  })
  })

  return (
    <div className="field">
      {cells}
    </div>
  )
}