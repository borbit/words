var db = require('lib/db')

module.exports = (app) => {
  app.put('/game', (req, res, next) => {
    console.log(req.body.user1)
    console.log(req.body.user2)
  })
}