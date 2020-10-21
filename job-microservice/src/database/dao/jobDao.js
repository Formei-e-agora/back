const path = require('path');
const { Op } = require('sequelize');
const logHandler = require('../../../../helpers/handlers/logHandler');

exports.findMany = async (model, ids, number) => {
  const n = Number(number);
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findMany ${model.name} ids=${ids}`;
  try {
    const result = await model.findAll({
      where: {
        jobId: ids,
      },
      include: ['subscription', 'courseRequirement'],
      limit: n,
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.findByProfessorId = async (model, id, number) => {
  const n = Number(number);
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findByProfessorId ${model.name} id=${id}`;
  try {
    const result = await model.findAll({
      where: {
        professorId: id,
      },
      include: ['subscription', 'courseRequirement'],
      limit: n,
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.findMostPopular = async (model) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findMostPopular ${model.name}`;
  try {
    const result = await model.findAll({
      include: ['subscription'],
    });
    const most = [];
    result.forEach((e) => {
      if (e.subscription.length > 0) {
        most.push({
          jobId: e.jobId,
          subsNum: e.subscription.length,
        });
      }
    });
    if (most.length > 5) {
      // eslint-disable-next-line no-nested-ternary
      most.sort((a, b) => ((a.subsNum > b.subsNum) ? -1 : (b.subsNum > a.subsNum) ? 1 : 0));
      const ids = [];
      for (let i = 0; i < 5; i += 1) {
        console.log(most[i]);
        ids.push(most[i].jobId);
      }
      console.log(ids);
      const res = await model.findAll({ where: { jobId: ids } });
      console.log(result);
      logHandler.success(logFilePath, action);
      return res;
    }
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.findLastJobs = async (model) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findLastJobs ${model.name}`;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  try {
    const result = await model.findAll({
      where: {
        createdAt: {
          [Op.gte]: yesterday,
        },
      },
      include: ['subscription', 'courseRequirement'],
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.findByPkWithInclude = async (model, id) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findByPk ${model.name} id=${id}`;
  try {
    const result = await model.findOne({
      where: {
        jobId: id,
      },
      include: ['subscription', 'courseRequirement'],
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};
