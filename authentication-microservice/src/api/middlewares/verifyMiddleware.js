const rateLimit = require('express-rate-limit');
const { Users } = require('../../models');
const userDao = require('../../database/dao/userDao');
const errors = require('../../../../helpers/errors/errorCodes');
const asyncHandler = require('../../../../helpers/handlers/asyncHandler');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');

exports.verifyUsernameExists = asyncHandler(async (req, res, next) => {
  const { username, isUser } = req.body;
  const { userId } = req.params;
  if (isUser) {
    const result = await userDao.verifyUsernameExists(Users, username, { userId });

    if (result) {
      throw new ErrorResponse(errors.USERNAME_ALREADY_EXISTS, result);
    }
  }

  next();
});

exports.loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // start blocking after 10 requests
  handler: asyncHandler(async () => {
    throw new ErrorResponse(errors.TOO_MANY_REQUESTS, 'too many requests');
  }),
});
