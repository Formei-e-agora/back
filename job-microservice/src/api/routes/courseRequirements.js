const express = require('express');
const courseRequirementsServices = require('../controllers/courseRequirementsServices');
const verifyMiddlewares = require('../middlewares/verifyMiddleware');

const route = express.Router();

module.exports = (server) => {
  server.use('/courseRequirements', route);

  route.get('/verify/courseRequirementsId/:courseRequirementsId', courseRequirementsServices.verifyCourseRequirementsExists);
  route.get('/find/courseRequirementsId/:courseRequirementsId', courseRequirementsServices.findByPk);
  route.post('/create', verifyMiddlewares.verifyJobExists, courseRequirementsServices.create);
  route.put('/update/:courseRequirementsId', verifyMiddlewares.verifyJobExists, courseRequirementsServices.update);
  route.delete('/delete/:courseRequirementsId', courseRequirementsServices.delete);
};
