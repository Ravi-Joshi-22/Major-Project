const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Models = require('../models');
const User = Models.User;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).exec(function(err, user) {
    if (err) {
      done(null, false);
    } else {
      done(null, user);
    }
  });
});

const strategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ email: username }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  });
});

passport.use(strategy);

module.exports = passport;
