const express = require('express');

const route = express.Router();
const authenticate = require('../controllers/authenticateServices');
const verifyMiddleware = require('../middlewares/verifyMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');

module.exports = (server, passport) => {
  server.use('/user', route);

  route.get('/verify/userId/:userId', authenticate.verifyUserExists);
  route.get('/find/userId/:userId', authenticate.findByPk);
  route.get('/find/unlockInfo/userId/:userId', authenticate.findUnlockInfo);
  route.get('/protected', passport.authenticate('jwt', { session: false }), authenticate.protected);
  route.post('/login', verifyMiddleware.loginLimiter, authenticate.login);
  route.post('/create', authenticate.create);
  route.post('/reset/password', userMiddleware.findPersonByEmail, authenticate.restorePassword);
  route.put('/update/password', /* passport.authenticate('jwt', { session: false }), */ authenticate.changePassword);
  route.put('/update/:userId', /* passport.authenticate('jwt', { session: false }), */ authenticate.update);
  route.put('/accept/:userId', /* passport.authenticate('jwt', { session: false }), */ authenticate.acceptUser);
  route.put('/unlock/userId/:userId', authenticate.unlockAccount);
  route.delete('/delete/:userId', /* passport.authenticate('jwt', { session: false }), */ authenticate.delete);
};
