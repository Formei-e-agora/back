const express = require('express');
const jobServices = require('../controllers/jobServices');

const route = express.Router();

module.exports = (server) => {
  server.use('', route);

  route.get('/verify/jobId/:jobId', jobServices.verifyJobExists);
  route.get('/find/all', jobServices.findAll);
  route.get('/find/jobId/:jobId', jobServices.findByPk);
  route.get('/find/course/:course', jobServices.findByCourse);
  route.post('/create', jobServices.create);
  route.put('/update/:jobId', jobServices.update);
  route.delete('/delete/:jobId', jobServices.delete);
};
