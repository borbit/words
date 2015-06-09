var boards = require('../boards')

module.exports = (app) => {
  app.get('/boards/:board', (req, res, next) => {
    boards.list(req.params.board, (err, list) => {
      if (err) return next(err)
      res.json(list)
    })
  })
}