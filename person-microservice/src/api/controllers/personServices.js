const userMiddleware = require('../middlewares/userMiddleware');
const { Person } = require('../../models');
const generalDao = require('../../database/dao/generalDao');
const personDao = require('../../database/dao/personDao');
const errors = require('../../../../helpers/errors/errorCodes');
const asyncHandler = require('../../../../helpers/handlers/asyncHandler');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');

exports.create = asyncHandler(async (req, res) => {
  const person = req.body;
  const result = await generalDao.create(Person, person);

  if (!result) {
    throw new ErrorResponse(errors.COULD_NOT_CREATE, result);
  }
  if (result.name === 'SequelizeUniqueConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_CREATE, result);
  }
  if (result.name === 'SequelizeForeignKeyConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_CREATE, result);
  }
  if (result.name === 'SequelizeDatabaseError') {
    throw new ErrorResponse(errors.COULD_NOT_CREATE, result);
  }

  const userResponse = await userMiddleware.createUser(result.dataValues.personId, person.username, person.password, person.userType);
  if (!userResponse) {
    generalDao.delete(Person, { personId: person.personId });
    throw new ErrorResponse(errors.COULD_NOT_CREATE, 'could not create user');
  }

  return res.json({ Status: true, personData: result }).end();
});

exports.update = asyncHandler(async (req, res) => {
  const person = req.body;
  const { personId } = req.params;
  const result = await generalDao.update(Person, person, {
    personId,
  });

  if (!result) {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, result);
  }
  if (result.name === 'SequelizeUniqueConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, result);
  }
  if (result.name === 'SequelizeForeignKeyConstraintError') {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, result);
  }
  if (result.name === 'SequelizeDatabaseError') {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, result);
  }
  if (result.length === 0) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  const userResponse = await userMiddleware.updateUser(personId, person.username, person.userType, person.eligibleEmail, person.eligiblePush);
  if (!userResponse) {
    throw new ErrorResponse(errors.COULD_NOT_UPDATE, 'could not update user');
  }

  return res.json({ Status: true, personData: result[0] }).end();
});

exports.delete = asyncHandler(async (req, res) => {
  const userResponse = await userMiddleware.updateUser(req.params.personId);
  if (!userResponse) {
    throw new ErrorResponse(errors.COULD_NOT_DELETE, 'could not delete user');
  }

  const result = await generalDao.delete(Person, {
    personId: req.params.personId,
  });

  if (!result) {
    throw new ErrorResponse(errors.COULD_NOT_DELETE, result);
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

  return res.json({ Status: true }).end();
});

exports.findByPk = asyncHandler(async (req, res) => {
  const result = await generalDao.findByPk(Person, req.params.personId);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, personData: result }).end();
});

exports.findByEmail = asyncHandler(async (req, res) => {
  const result = await personDao.findByEmail(Person, req.params.email);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, personData: result }).end();
});

exports.findAll = asyncHandler(async (req, res) => {
  const result = await generalDao.findAll(Person);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }
  if (!result.length) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  const people = await Promise.all(result.map(async (person) => {
    const personData = person.dataValues;
    const userData = await userMiddleware.findUnlockInfo(personData.personId);
    if (!userData) {
      throw new ErrorResponse(errors.NOT_FOUND, 'user');
    }
    return { ...personData, ...userData };
  }));

  return res.json({ Status: true, people }).end();
});

exports.verifyPersonExists = asyncHandler(async (req, res) => {
  const result = await generalDao.verifyIfExistsById(Person, req.params.personId);

  if (result) {
    return res.json({ Status: true }).end();
  }
  return res.json({ Status: false }).end();
});
