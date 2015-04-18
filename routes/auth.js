var config = require('config')
var passport = require('passport')
var passportFacebook = require('passport-facebook')
var graph = require('fbgraph')

var strategy = new passportFacebook.Strategy({
  callbackURL: "http://localhost:5000/login/cb"
, clientSecret: config.facebook_app_secret
, clientID: config.facebook_app_id
}, (accessToken, refreshToken, profile, done) => {
  graph.setAccessToken(accessToken)
  process.nextTick(() => {
    done(null, profile);
  })
})

passport.use(strategy)
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = (app) => { 
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