var boards = require('../boards')

module.exports = (app) => {
  app.get('/boards/score', (req, res, next) => {
    boards.list('score', (err, list) => {
      if (err) return next(err)
      res.json(list)
    })
  })
}