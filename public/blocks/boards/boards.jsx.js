var React = require('react')
var Mask = require('../mask/mask')
var cn = require('classnames')
var _ = require('lodash')

module.exports = function() {
  let rows = []
  let tabsBoard = [
    {board: 'score', title: 'Рахунок'}
  , {board: 'words', title: 'Кiлькiсть слiв'}
  , {board: 'wins', title: 'Кiлькiсть перемог'}
  ]
  let tabsType = [
    {type: 'general', title: 'За весь час'}
  , {type: 'daily', title: 'За сьогодні'}
  ]

  let nextType = this.state.boards.get('nextType')
  let nextBoard = this.state.boards.get('nextBoard')
  let currType = this.state.boards.get('currType')
  let currBoard = this.state.boards.get('currBoard')

  let board = this.state.boards.get(currType + currBoard)
  let myFBId = this.state.me.get('fb_id')

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

  tabsBoard = _.map(tabsBoard, (tab) => {
    let board = this.state.boards.get(nextType + tab.board)
    let className = cn({
      'boards__tab': true
    , 'active': currBoard == tab.board
    })

    return (
      <li className={className}>
        <a onClick={this.onTab.bind(this, currType, tab.board)}>
          {nextBoard == tab.board && !!board && board.get('loading') &&
            <i className="boards__tab-spin fa fa-spin fa-circle-o-notch"></i>}
          {tab.title}
        </a>
      </li>
    )
  })

  tabsType = _.map(tabsType, (tab) => {
    let className = cn({
      'boards__tab': true
    , 'active': currType == tab.type
    })

    return (
      <li className={className}>
        <a onClick={this.onTab.bind(this, tab.type, currBoard)}>
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
            <ul className="boards__tabs nav nav-tabs">{tabsType}</ul>
            <ul className="boards__tabs nav nav-tabs">{tabsBoard}</ul>
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