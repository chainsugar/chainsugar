var config = require('./config.js');
var fs = require('fs');
var path = require('path');
var User = require('./db').User;

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
      User.findOne({ googleId: profile.id }).exec(function (err, user) {
        //user previously logged into our app and is saved in our db
        if(user) {
          done(null, user);
        }else{
          //first time user is logging in
          user = new User({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value
          });
          //create and save new user
          user.save(function(err, user){
            done(err, user);
          });
        }
      });
    }
));

module.exports = function(app) {

  app.use(session({
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: config.MONGODB_URL
    }),
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
      ]
    })
  );

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
  app.get('/auth/profile/check', function(req, res, next){
    if(req.isAuthenticated()){
      res.status(200).send(req.user);
    } else {
      res.status(401).end();
    }
  });

  app.post('/auth/profile/update', function(req, res){
    if(req.isAuthenticated()) {
      User.findById(req.user._id)
        .exec(function(err, user){
          if(err) {
            return res.status(500).end();
          }
          if(user){
            //TODO: there should be an email verification process!
            //set user data on model
            user.name = req.body.name;
            user.email = req.body.email;
            //update the session user data
            req.user.name = user.name;
            req.user.email = user.email;
            user.save(function(err){
              if(err){
                return res.status(500).end();
              }
              res.status(201).end();
            });
          }else{
            return res.status(404).end();
          }
        })

    } else {
      res.status(401).end();
    }
  });

};

