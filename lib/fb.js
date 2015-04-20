var graph = require('fbgraph')

module.exports = {
  getFriends(accessToken, cb) {
    graph.setAccessToken(accessToken)
    graph.get('me/friends', (err, res) => {
      if (err) return cb(err)
      cb(null, res.data)
    })
  }
}