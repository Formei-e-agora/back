const path = require('path');
const logHandler = require('../../../../helpers/handlers/logHandler');

exports.create = async (model, object) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `create ${model.name}`;
  try {
    const result = await model.create(object);
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.update = async (model, object, id) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `update ${model.name} id=${id.actuatorModelId}`;
  try {
    const result = await model.update(object, {
      where: id,
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.delete = async (model, id) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `delete ${model.name} id=${id.actuatorModelId}`;
  try {
    const result = await model.destroy({
      where: id,
      force: true,
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.findByPk = async (model, id) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findByPk ${model.name} id=${id}`;
  try {
    const result = await model.findByPk(id);
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};


exports.findAll = async (model) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findAll ${model.name}`;
  try {
    const result = await model.findAll();
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.verifyIfExistsById = async (model, id) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `verifyIfExistsById ${model.name} id=${id}`;
  try {
    const result = await model.findByPk(id);
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};
