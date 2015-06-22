var graph = require('fbgraph')
var config = require('config')

const APP_ACCESS_TOKEN = `${config.facebook_app_id}|${config.facebook_app_secret}`

module.exports = {
  getFriends(accessToken, cb) {
    graph.setAccessToken(accessToken)
    graph.get('me/friends', (err, res) => {
      if (err) return cb(err)
      cb(null, res.data)
    })
  },

  notify(data, cb) {
    let post = {
      template: data.message
    , href: data.href
    }

    graph.post(`${data.userFBId}/notifications?access_token=${APP_ACCESS_TOKEN}`, post, (err, res) => {
      if (err) return cb(err)
      cb()
    })
  }
}