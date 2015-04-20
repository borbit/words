var config = require('config')
var passport = require('passport')
var passportFacebook = require('passport-facebook')
var db = require('lib/db')

module.exports = (app) => { 
  var strategy = new passportFacebook.Strategy({
    callbackURL: config.facebook_callback_url
  , clientSecret: config.facebook_app_secret
  , clientID: config.facebook_app_id
  }, (accessToken, refreshToken, profile, done) => {
    db.getUser(profile.id, (err, user) => {
      if (err) return done(err)
      if (!user) {
        user = {
          facebook_id: profile.id
        , facebook_name: profile.displayName
        , created_at: Date.now()
        }
      }

      user.facebook_token = accessToken

      db.setUser(user, (err) => {
        if (err) return done(err)
        done(null, user)
      })
    })
  })

  passport.use(strategy)
  passport.serializeUser((user, done) => {
    done(null, user.facebook_id);
  })
  passport.deserializeUser((facebook_id, done) => {
    db.getUser(facebook_id, done)
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