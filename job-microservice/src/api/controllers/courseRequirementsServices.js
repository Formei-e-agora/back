const { CourseRequirement } = require('../../models');
const generalDao = require('../../database/dao/generalDao');
const errors = require('../../../../helpers/errors/errorCodes');
const asyncHandler = require('../../../../helpers/handlers/asyncHandler');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');

exports.create = asyncHandler(async (req, res) => {
  const result = await generalDao.create(CourseRequirement, req.body);

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

  return res.json({ Status: true, courseRequirementsData: result }).end();
});

exports.update = asyncHandler(async (req, res, next) => {
  const { courseRequirementsId } = req.params;

  const result = await generalDao.update(CourseRequirement, req.body, { courseRequirementsId });

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

  return res.json({ Status: true, courseRequirementsData: result }).end();
});

exports.delete = asyncHandler(async (req, res, next) => {
  const { courseRequirementsId } = req.params;

  const result = await generalDao.delete(CourseRequirement, { courseRequirementsId });

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
  const result = await generalDao.findByPk(CourseRequirement, req.params.courseRequirementsId);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, courseRequirementsData: result }).end();
});

exports.verifyCourseRequirementsExists = asyncHandler(async (req, res) => {
  const result = await generalDao.verifyIfExistsById(CourseRequirement, req.params.courseRequirementsId);

  if (result) {
    return res.json({ Status: true }).end();
  }
  return res.json({ Status: false }).end();
});
