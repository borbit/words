var React = require('react')

module.exports = function() {
  return (
    <div className="modal mask">
      <div className="mask__table">
        <div className="mask__cell">
          {this.props.children}
        </div>
      </div>
    </div>
  )
}