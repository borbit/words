var React = require('react')
var Mask = require('../mask/mask')

module.exports = function() {
  return (
    <Mask>
      <div className="party modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={this.props.onClose}>&times;</button>
            <h4 className="modal-title">Грати компанiєю</h4>
          </div>
          <div className="party__body modal-body">
            
          </div>
          <div className="modal-footer">
            <button className="btn btn-default" onClick={this.props.onClose}>OK</button>
          </div>
        </div>
      </div>
    </Mask>
  )
}