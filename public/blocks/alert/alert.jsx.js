var React = require('react')
var Mask = require('../mask/mask')

module.exports = function() {
  return (
    <Mask>
      <div className="alert modal-dialog">
        <div className="modal-content">
          {this.props.title &&
            <div className="modal-header">
              <button className="close" onClick={this.props.onClose}>&times;</button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>}
          {this.props.children &&
            <div className="alert__body modal-body">
              {this.props.children}
            </div>}
          <div className="modal-footer">
            <button className="btn btn-default" onClick={this.props.onClose}>OK</button>
          </div>
        </div>
      </div>
    </Mask>
  )
}