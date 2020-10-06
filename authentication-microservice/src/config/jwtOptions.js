const { ExtractJwt } = require('passport-jwt');
require('dotenv').config({ path: `${__dirname}/../../.env` });

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretOrKey,
};

module.exports = jwtOptions;
