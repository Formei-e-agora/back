const path = require('path');
const { Op } = require('sequelize');
const logHandler = require('../../../../helpers/handlers/logHandler');

exports.findByUsername = async (model, username) => {
  const action = `findByUsername ${model.name} username=${username}`;
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  try {
    const result = await model.findOne({ where: { username } });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.findByUsernameAndEmail = async (model, username, email) => {
  const action = `findByUsernameAndEmail ${model.name} username=${username} email=${email}`;
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  try {
    const result = await model.findOne({ where: { username, email } });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.verifyUsernameExists = async (model, username, { id = -1 }) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `verifyUsernameExists ${model.name} username=${username}`;
  try {
    const result = await model.findOne({
      where: {
        username,
        userId: {
          [Op.ne]: id,
        },
      },
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
    const result = await model.findByPk(id, {
      attributes: ['username', 'loginAttempts', 'sparePassword'],
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};
