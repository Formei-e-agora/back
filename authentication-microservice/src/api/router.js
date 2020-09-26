const express = require('express');
const authenticate = require('./routes/authenticate');

module.exports = (passport) => {
  const server = express.Router();

  authenticate(server, passport);

  return server;
};
