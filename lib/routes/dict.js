var db = require('../db')

module.exports = (app) => {
  app.get('/dict', (req, res, next) => {
    db.scanDict(req.query.pattern, (err, words) => {
      if (err) return next(err)
      res.json(words)
    })
  })
}