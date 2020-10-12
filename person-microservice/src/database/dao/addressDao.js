const path = require('path');
const logHandler = require('../../../../helpers/handlers/logHandler');

exports.findByPersonId = async (model, personId) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findByPersonId ${model.name} email=${personId}`;
  try {
    const result = await model.findOne({
      where: {
        personId,
      },
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};
