const { Person } = require('../../models');
const generalDao = require('../../database/dao/generalDao');
const errors = require('../../../../helpers/errors/errorCodes');
const asyncHandler = require('../../../../helpers/handlers/asyncHandler');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');

// VERIFY EXISTS FOREIGN KEY
exports.verifyPersonExists = asyncHandler(async (req, res, next) => {
  const result = await generalDao.verifyIfExistsById(Person, req.body.personId);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  next();
});
