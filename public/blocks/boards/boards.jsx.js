var React = require('react')
var Mask = require('../mask/mask')
var cn = require('classnames')

module.exports = function() {
  let rows = []

  this.state.boards.forEach((row, i) => {
    let className = cn({
      'boards__row': true
    , 'boards__row_me': this.state.me.get('fb_id') == row.get('member')
    })

    rows.push(
      <tr className={className}>
        <td>{i+1}</td>
        <td>{row.get('user').get('fb_name')}</td>
        <td>{row.get('score')}</td>
      </tr>
    )
  })

  return (
    <Mask>
      <div className="boards modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={this.props.onClose}>&times;</button>
            <h4 className="modal-title">Лідери</h4>
          </div>
          <div className="modal-body">
            <ul className="boards__tabs nav nav-tabs">
              <li className="boards__tab active"><a>Рахунок</a></li>
              <li className="boards__tab"><a>Найдовше слово</a></li>
            </ul>
            <table className="boards__table table table-hover table-condensed">
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button className="btn btn-default" onClick={this.props.onClose}>Закрити</button>
          </div>
        </div>
      </div>
    </Mask>
  )
}