const express = require('express');
const personServices = require('../controllers/personServices');

const route = express.Router();

module.exports = (server) => {
  server.use('', route);

  route.get('/verify/personId/:personId', personServices.verifyPersonExists);
  route.get('/find/all', personServices.findAll);
  route.get('/find/personId/:personId', personServices.findByPk);
  route.get('/find/email/:email', personServices.findByEmail);
  route.post('/create', personServices.create);
  route.put('/update/:personId', personServices.update);
  route.delete('/delete/:personId', personServices.delete);
};
