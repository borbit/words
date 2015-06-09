var React = require('react')
var Mask = require('../mask/mask')
var cn = require('classnames')
var _ = require('lodash')

module.exports = function() {
  let rows = []
  let tabs = [
    {board: 'score', title: 'Рахунок'}
  , {board: 'words', title: 'Кiлькiсть слiв'}
  ]

  let next = this.state.boards.get('next')
  let current = this.state.boards.get('current')
  let board = this.state.boards.get(current)
  let myFBId = this.state.me.get('fb_id')

  if (board) {
    board.get('list').forEach((row, i) => {
      let className = cn({
        'boards__row': true
      , 'boards__row_me': myFBId == row.get('member')
      })

      rows.push(
        <tr className={className}>
          <td>{i+1}</td>
          <td>{row.get('user').get('fb_name')}</td>
          <td>{row.get('score')}</td>
        </tr>
      )
    })
  }

  tabs = _.map(tabs, (tab) => {
    let board = this.state.boards.get(tab.board)
    let className = cn({
      'boards__tab': true
    , 'active': current == tab.board
    })
    
    return (
      <li className={className}>
        <a onClick={this.onTab.bind(this, tab.board)}>
          {next == tab.board && !!board && board.get('loading') &&
            <i className="boards__tab-spin fa fa-spin fa-circle-o-notch"></i>}
          {tab.title}
        </a>
      </li>
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
              {tabs}
            </ul>
            <table className="boards__table table table-hover table-condensed">
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button className="btn btn-default" onClick={this.props.onClose}>&times;</button>
          </div>
        </div>
      </div>
    </Mask>
  )
}