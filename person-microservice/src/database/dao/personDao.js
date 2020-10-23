const path = require('path');
const { Op } = require('sequelize');
const logHandler = require('../../../../helpers/handlers/logHandler');

exports.findByEmail = async (model, email) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findByEmail ${model.name} email=${email}`;
  try {
    const result = await model.findOne({
      attributes: ['personId', 'name', 'lastName', 'email'],
      where: {
        email,
      },
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};

exports.findAllToJobEmail = async (model, userIds) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findAllToJobEmail ${model.name} userId=${userIds}`;
  try {
    const result = await model.findAll({
      attributes: ['personId', 'name', 'lastName', 'email', 'course'],
      where: {
        personId: { [Op.in]: userIds },
      },
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};
