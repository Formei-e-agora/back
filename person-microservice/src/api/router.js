const express = require('express');
const person = require('./routes/person');
const address = require('./routes/address');

module.exports = () => {
  const app = express.Router();
  const server = express.Router();
  app.use('/person', server);

  person(server);
  address(server);

  return app;
};
