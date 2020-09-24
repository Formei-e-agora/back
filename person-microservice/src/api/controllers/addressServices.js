const { Address } = require('../../models');
const generalDao = require('../../database/dao/generalDao');
const errors = require('../../../../helpers/errors/errorCodes');
const asyncHandler = require('../../../../helpers/handlers/asyncHandler');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');

exports.create = asyncHandler(async (req, res) => {
  const result = await generalDao.create(Address, req.body);

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

  return res.json({ Status: true, addressData: result }).end();
});

exports.update = asyncHandler(async (req, res, next) => {
  const { addressId } = req.params;

  const result = await generalDao.update(Address, req.body, { addressId });

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

  return res.json({ Status: true, addressData: result }).end();
});

exports.delete = asyncHandler(async (req, res, next) => {
  const { addressId } = req.params;

  const result = await generalDao.delete(Address, { addressId });

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
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
  const result = await generalDao.findByPk(Address, req.params.addressId);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, addressData: result }).end();
});

exports.verifyAddressExists = asyncHandler(async (req, res) => {
  const result = await generalDao.verifyIfExistsById(Address, req.params.addressId);

  if (result) {
    return res.json({ Status: true }).end();
  }
  return res.json({ Status: false }).end();
});
