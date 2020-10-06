const passport = require('../../config/passport');

exports.Authenticate = passport.authenticate('jwt', { session: false });
