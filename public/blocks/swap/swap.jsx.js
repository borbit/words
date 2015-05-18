var React = require('react')
var Mask = require('../mask/mask')
var cn = require('classnames')
var _ = require('lodash')

module.exports = function() {
  var letters = _.map(this.props.letters, (letter, i) => {
    let className = cn({
      'swap__letter': true
    , 'swap__letter_selected': ~this.state.selected.indexOf(i)
    })
    return (
      <div className={className} onClick={this.onToggle.bind(this, i)}>
        {letter}
      </div>
    )
  })

  return (
    <Mask>
      <div className="swap modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={this.props.onCancel}>&times;</button>
            <h4 className="modal-title">Виберiть лiтери</h4>
          </div>
          <div className="swap__letters modal-body">
            {letters}
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={this.onSwap} disabled={!this.state.selected.length}>Помiняти</button>
            <button className="btn btn-default" onClick={this.props.onCancel}>&times;</button>
          </div>
        </div>
      </div>
    </Mask>
  )
}