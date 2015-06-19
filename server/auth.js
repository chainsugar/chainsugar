var config = require('./config.js');
var fs = require('fs');
var path = require('path');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var SESSION_SECRET;

var passport = require('passport');
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_SECRETS;

if(process.env.NODE_ENV === 'production' ) {
  //store the client id and secret in environment variable
  GOOGLE_SECRETS = {
    id: process.env.GOOGLE_APP_ID,
    secret: process.env.GOOGLE_APP_SECRET,
    url: process.env.GOOGLE_APP_CALLBACK_URL
  };

  //a long text string for signing session cookies
  SESSION_SECRET = process.env.SESSION_SECRET;
} else {

  try {
    GOOGLE_SECRETS = require('../secrets/google.json');
  } catch(e) {
    console.error("== Warning == missing 'secrets/google.json' file. == see README");
    process.exit();
  }

  try {
    SESSION_SECRET = require('../secrets/session.json').secret;
  } catch (e) {
    SESSION_SECRET = "w34587230598dflskjf";//default
  }

}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
      clientID: GOOGLE_SECRETS.id,
      clientSecret: GOOGLE_SECRETS.secret,
      callbackURL: GOOGLE_SECRETS.url
    },
    function(accessToken, refreshToken, profile, done) {
      /* todo: store user in database
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
      */
      done(null, profile);
    }
));

module.exports = function(app) {

  app.use(session({
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: config.MONGODB_URL
    })
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google',
    passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/#/sign-in' }),
    function(req, res) {
      res.redirect('/#/tasks');
  });

  app.get('/login', function(req, res){
    res.redirect('/auth/google');
  });

  app.get('/logout', function(req, res){
    req.logout();
    req.session.destroy(function(){
      res.redirect('/');
    });
  });

  //api to check on client side if session is authenticated
  app.get('/auth/google/check', function(req, res, next){
    if(req.isAuthenticated()){
      res.status(200).send({authenticated:true});
    } else {
      res.status(401).send({authenticated:false});
    }
  });

};
