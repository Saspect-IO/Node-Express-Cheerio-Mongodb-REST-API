const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    // Match Username
    let query = {email:username};
    User.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      if(!user.confirmed){
        return done(null, false, {message: 'Please confirm your email to login'});
      }

      // Match Password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
