const passport = require('passport');
const { Strategy } = require('passport-jwt');

const { Users } = require('../models');

const JwtStrategy = Strategy;
const options = require('./jwtOptions');

const strategy = new JwtStrategy(options, (jwtPayload, next) => {
  console.log('payload received: ', jwtPayload);
  const user = Users.findOne({ where: { id: jwtPayload.id, userType: jwtPayload.userType } });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
