const express = require('express');
const addressServices = require('../controllers/addressServices');
const verifyMiddlewares = require('../middlewares/verifyMiddleware');

const route = express.Router();

module.exports = (server) => {
  server.use('/address', route);

  route.get('/verify/addressId/:addressId', addressServices.verifyAddressExists);
  route.get('/find/personId/:personId', addressServices.findByPerson);
  route.get('/find/addressId/:addressId', addressServices.findByPk);
  route.post('/create', verifyMiddlewares.verifyPersonExists, addressServices.create);
  route.put('/update/:addressId', verifyMiddlewares.verifyPersonExists, addressServices.update);
  route.delete('/delete/:addressId', addressServices.delete);
};
