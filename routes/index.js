var passport = require('passport')
var graph = require('fbgraph')

module.exports = (app) => {
  app.get('/', (req, res) => {
    graph.get('/me/invitable_friends', (err, res) => {
      console.log(err)
      console.log(res)
    })
    res.render('index/index')
  })
}