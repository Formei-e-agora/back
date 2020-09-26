const express = require('express');

const route = express.Router();
const authenticate = require('../controllers/authenticateServices');
const verifyMiddleware = require('../middlewares/verifyMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');

module.exports = (server, passport) => {
  server.use('/user', route);

  route.get('/verify/userId/:userId', authenticate.verifyUserExists);
  route.get('/find/userId/:userId', authenticate.findByPk);
  route.get('/protected', passport.authenticate('jwt', { session: false }), authenticate.Protected);
  route.post('/login', verifyMiddleware.loginLimiter, authenticate.Login);
  route.post('/create', authenticate.SignUp);
  route.post('/reset/password', userMiddleware.findPersonByEmail, authenticate.restorePassword);
  route.put('/update/password', /* passport.authenticate('jwt', { session: false }), */ authenticate.ChangePassword);
  route.put('/update/:userId', /* passport.authenticate('jwt', { session: false }), */ authenticate.Update);
  route.put('/unlock/userId/:userId', authenticate.unlockAccount);
  route.delete('/delete/:userId', /* passport.authenticate('jwt', { session: false }), */ authenticate.Delete);
};
