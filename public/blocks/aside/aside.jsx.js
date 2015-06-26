var React = require('react')
var Stream = require('../stream/stream')

module.exports = function() {
  return (
    <div className="aside">
      {this.props.closable &&
        <div className="aside__btns btn-group">
          <button className="btn btn-sm btn-default" onClick={this.props.onClose} title="Вiдкрити список iгор">
            <i className="fa fa-list-ul"></i>
          </button>
        </div>}
      <h4 className="aside__title">Граблi <span className="badge">alpha</span></h4>
      <div className="aside__stream">
        <Stream/>
      </div>
    </div>
  )
}