var config = require('config')
var passport = require('passport')
var passportFacebook = require('passport-facebook')
var users = require('lib/users')
var db = require('lib/db')

module.exports = (app) => { 
  var strategy = new passportFacebook.Strategy({
    callbackURL: config.facebook_callback_url
  , clientSecret: config.facebook_app_secret
  , clientID: config.facebook_app_id
  }, (accessToken, refreshToken, profile, done) => {
    users.getUser(profile.id, (err, user) => {
      if (err) return done(err)
      if (!user) {
        db.addUser({
          fb_id: profile.id
        , fb_name: profile.displayName
        , fb_access_token: accessToken
        , gender: profile.gender
        }, done)
      } else {
        db.setUser(user.fb_id, {
          fb_access_token: accessToken
        , gender: profile.gender
        }, done)
      }
    })
  })

  passport.use(strategy)
  passport.serializeUser((user, done) => {
    done(null, user.fb_id)
  })
  passport.deserializeUser((fbId, done) => {
    users.getUser(fbId, done)
  })

  app.get('/login', passport.authenticate('facebook', {
    scope: ['user_friends']
  }));
  app.get('/login/cb', passport.authenticate('facebook', {
    failureRedirect: '/login'
  , successRedirect: '/'
  }))
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}