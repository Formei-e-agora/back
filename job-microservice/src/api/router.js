const express = require('express');
const job = require('./routes/job');
const subscription = require('./routes/subscription');
const courseRequirements = require('./routes/courseRequirements');

module.exports = () => {
  const app = express.Router();
  const server = express.Router();
  app.use('/job', server);

  job(server);
  subscription(server);
  courseRequirements(server);

  return app;
};
