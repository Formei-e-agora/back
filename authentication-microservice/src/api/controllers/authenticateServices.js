const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const userMiddleware = require('../middlewares/userMiddleware');
const { Users } = require('../../models');
const { findByUsername } = require('../../database/dao/userDao');
const userDao = require('../../database/dao/userDao');
const generalDao = require('../../database/dao/generalDao');
const errors = require('../../../../helpers/errors/errorCodes');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');
const asyncHandler = require('../../../../helpers/handlers/asyncHandler');
const sendEmail = require('../../../../helpers/email/sendEmail');
const options = require('../../config/jwtOptions');

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const response = await findByUsername(Users, username);

  if (!response) {
    throw new ErrorResponse(errors.FAILED_TO_LOGIN, response);
  }
  if (response === null) {
    throw new ErrorResponse(errors.FAILED_TO_LOGIN);
  }

  const {
    userType, loginAttempts, userId, isAccepted,
  } = response.dataValues;
  const userPassword = response.dataValues.password;

  if (loginAttempts >= 5) {
    throw new ErrorResponse(errors.ACCOUNT_LOCKED, loginAttempts);
  }
  if (isAccepted !== true) {
    throw new ErrorResponse(errors.NOT_ACCEPTED, 'not accepted');
  }
  if (!bcrypt.compareSync(password, userPassword)) {
    let updatedLoginAttempts = loginAttempts || 0;
    updatedLoginAttempts += 1;
    generalDao.update(Users, { loginAttempts: updatedLoginAttempts }, { userId });
    throw new ErrorResponse(errors.FAILED_TO_LOGIN, 'password');
  } else if (loginAttempts !== 0) {
    generalDao.update(Users, { loginAttempts: 0 }, { userId });
  }

  delete response.dataValues.loginAttempts;
  delete response.dataValues.password;
  delete response.dataValues.username;
  delete response.dataValues.createdAt;
  delete response.dataValues.updatedAt;

  const payload = {
    contactId: userId,
    userType,
  };
  const token = jwt.sign(payload, options.secretOrKey, { expiresIn: '1h' });
  const personData = await userMiddleware.findPersonById(userId);
  if (!personData) {
    throw new ErrorResponse(errors.NOT_FOUND, 'person');
  }
  delete personData.createdAt;
  delete personData.updatedAt;
  delete personData.personId;
  const userData = { ...response.dataValues, ...personData };

  return res.json({ Status: true, token, userData }).end();
});

exports.create = asyncHandler(async (req, res) => {
  const response = await generalDao.create(Users, req.body);

  if (!response) {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, response);
  }
  if (response.name === 'SequelizeUniqueConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_CREATE, response);
  }
  if (response.name === 'SequelizeForeignKeyConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_CREATE, response);
  }
  if (response.name === 'SequelizeDatabaseError') {
    throw new ErrorResponse(errors.COULD_NOT_CREATE, response);
  }
  if (response.name === 'SequelizeValidationError') {
    throw new ErrorResponse(errors.COULD_NOT_CREATE, response);
  }

  return res.json({ Status: true, userData: response });
});

exports.update = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const response = await generalDao.update(Users, req.body, { userId });

  if (!response) {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, response);
  }
  if (response.name === 'SequelizeUniqueConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, response);
  }
  if (response.name === 'SequelizeForeignKeyConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, response);
  }
  if (response.name === 'SequelizeDatabaseError') {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, response);
  }
  if (response.length === 0) {
    throw new ErrorResponse(errors.NOT_FOUND, response);
  }

  return res.json({ Status: true, userData: response[0] });
});

exports.acceptUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const response = await generalDao.update(Users, { isAccepted: true }, { userId });

  if (!response) {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, response);
  }
  if (response.name === 'SequelizeUniqueConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, response);
  }
  if (response.name === 'SequelizeForeignKeyConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, response);
  }
  if (response.name === 'SequelizeDatabaseError') {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, response);
  }
  if (response.length === 0) {
    throw new ErrorResponse(errors.NOT_FOUND, response);
  }

  return res.json({ Status: true, userData: response[0] });
});

exports.delete = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await generalDao.delete(Users, { userId });

  if (!result) {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, result);
  }
  if (result.name === 'SequelizeForeignKeyConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_DELETE, result);
  }
  if (result.name === 'SequelizeDatabaseError') {
    throw new ErrorResponse(errors.COULD_NOT_DELETE, result);
  }
  if (result === 0) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { password, newPassword, userId } = req.body;

  if (!password || !newPassword || newPassword === '') {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, 'empty passwords');
  }

  const response = await generalDao.findByPk(Users, userId);

  if (!response) {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, 'no user found');
  }

  const result = bcrypt.compareSync(password, response.dataValues.password);

  if (!result) {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, 'wrong password');
  }

  const user = response.dataValues;
  user.password = newPassword;
  user.sparePassword = false;

  const updateResponse = await generalDao.update(Users, user, { userId });

  if (!updateResponse) {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, updateResponse);
  }

  return res.json({ Status: true, userData: updateResponse[0] }).end();
});

exports.restorePassword = asyncHandler(async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username) throw new ErrorResponse(errors.WRONG_PARAMETERS);

  const result = await findByUsername(Users, username);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  const user = result.dataValues;
  const { person } = req.body;

  if (person.personId !== user.userId) {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, 'email != user');
  }

  const generatedPassword = generator.generate({
    length: 12,
    numbers: true,
    excludeSimilarCharacters: true,
    lowercase: true,
    symbols: true,
    uppercase: true,
    strict: true,
  });
  sendEmail.sendPass(email, generatedPassword, person.name);

  const updateSparePassword = { sparePassword: true, password: generatedPassword };
  const result2 = await generalDao.update(Users, updateSparePassword, { userId: user.userId });
  if (!result2) {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, result);
  }

  return res.json({ Status: true }).end();
});

exports.unlockAccount = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (userId === undefined) {
    throw new ErrorResponse(errors.WRONG_PARAMETERS, 'contactId');
  }

  const result = await generalDao.findByPk(Users, userId);
  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  if (result.loginAttempts >= 5) {
    const updateUser = {
      loginAttempts: 0,
    };

    const result2 = await generalDao.update(Users, updateUser, { userId });

    if (!result2) {
      throw new ErrorResponse(errors.COULD_NOT_UPDATE, result);
    }
  }

  return res.json({ Status: true }).end();
});

exports.findByPk = asyncHandler(async (req, res) => {
  const result = await generalDao.findByPk(Users, req.params.userId);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }
  delete result.dataValues.password;

  return res.json({ Status: true, userData: result }).end();
});

exports.findUnlockInfo = asyncHandler(async (req, res) => {
  const result = await userDao.findByPk(Users, req.params.userId);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, userData: result }).end();
});

exports.findEligibleToEmail = asyncHandler(async (req, res) => {
  const result = await userDao.findAllStudentsEligibleEmail(Users);
  if (!result || !result.length) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }
  const users = result.map((user) => user.dataValues.userId);

  return res.json({ Status: true, users }).end();
});

exports.protected = asyncHandler(async (req, res) => res.json({ Status: true }));

exports.verifyUserExists = asyncHandler(async (req, res) => {
  const result = await generalDao.verifyIfExistsById(Users, req.params.userId);

  if (result) {
    return res.json({ Status: true }).end();
  }
  return res.json({ Status: false }).end();
});
