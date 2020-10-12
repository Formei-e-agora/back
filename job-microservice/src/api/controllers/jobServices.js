const { Job, CourseRequirement } = require('../../models');
const generalDao = require('../../database/dao/generalDao');
const errors = require('../../../../helpers/errors/errorCodes');
const asyncHandler = require('../../../../helpers/handlers/asyncHandler');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');
const courseRequirementDao = require('../../database/dao/courseRequirementDao');
const jobDao = require('../../database/dao/jobDao');

exports.create = asyncHandler(async (req, res) => {
  const result = await generalDao.create(Job, req.body);

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

  return res.json({ Status: true, jobData: result }).end();
});

exports.update = asyncHandler(async (req, res) => {
  const result = await generalDao.update(Job, req.body, {
    jobId: req.params.jobId,
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

  return res.json({ Status: true, jobData: result }).end();
});

exports.delete = asyncHandler(async (req, res) => {
  const result = await generalDao.delete(Job, {
    jobId: req.params.jobId,
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
  const result = await generalDao.findByPk(Job, req.params.jobId);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, jobData: result }).end();
});

exports.findAll = asyncHandler(async (req, res) => {
  const result = await generalDao.findAll(Job);

  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }
  if (!result.length) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, jobs: result }).end();
});

exports.verifyJobExists = asyncHandler(async (req, res) => {
  const result = await generalDao.verifyIfExistsById(Job, req.params.jobId);

  if (result) {
    return res.json({ Status: true }).end();
  }
  return res.json({ Status: false }).end();
});

exports.findByCourse = asyncHandler(async (req, res) => {
  const jobIds = await courseRequirementDao.findByCourse(CourseRequirement, req.params.course);
  ids = [];
  jobIds.forEach(e => {
    ids.push(e.jobId)
  });
  const result = await jobDao.findMany(Job, ids, req.params.number);
  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }
  if (!result.length) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, jobs: result }).end();
});

exports.findByProfessorId = asyncHandler(async (req, res) => {
  const result = await jobDao.findByProfessorId(Job, req.params.professorId, req.params.number);
  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }
  if (!result.length) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, jobs: result }).end();
});

exports.findMostPopular = asyncHandler(async (req, res) => {
  const result = await jobDao.findMostPopular(Job);
  if (!result) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }
  if (!result.length) {
    throw new ErrorResponse(errors.NOT_FOUND, result);
  }

  return res.json({ Status: true, jobs: result }).end();
});
