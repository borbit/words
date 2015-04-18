// var graph = require('fbgraph')

module.exports = (app) => {
  app.get('/', (req, res) => {
    // graph.get('/me/invitable_friends', (err, res) => {
    //   console.log(err)
    //   console.log(res)
    // })

    console.log(req.user)

    res.render('index/index')
  })
}