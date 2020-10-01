const { Job } = require('../../models');
const generalDao = require('../../database/dao/generalDao');
const errors = require('../../../../helpers/errors/errorCodes');
const asyncHandler = require('../../../../helpers/handlers/asyncHandler');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');

// VERIFY EXISTS FOREIGN KEY
exports.verifyJobExists = asyncHandler(async (req, res, next) => {
  const result = await generalDao.verifyIfExistsById(Job, req.body.jobId);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  next();
});
