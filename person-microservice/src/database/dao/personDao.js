const path = require('path');
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
