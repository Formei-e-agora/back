const express = require('express');
const subscriptionServices = require('../controllers/subscriptionServices');
const verifyMiddlewares = require('../middlewares/verifyMiddleware');

const route = express.Router();

module.exports = (server) => {
  server.use('/subscription', route);

  route.get('/verify/subscriptionId/:subscriptionId', subscriptionServices.verifySubscriptionExists);
  route.get('/find/subscriptionId/:subscriptionId', subscriptionServices.findByPk);
  route.post('/create', verifyMiddlewares.verifyJobExists, subscriptionServices.create);
  route.put('/update/:subscriptionId', verifyMiddlewares.verifyJobExists, subscriptionServices.update);
  route.delete('/delete/:subscriptionId', subscriptionServices.delete);
};
