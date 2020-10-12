const path = require('path');
const logHandler = require('../../../../helpers/handlers/logHandler');

exports.findByCourse = async (model, course) => {
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findByCourse ${model.name} course=${course}`;
  try {
    const result = await model.findAll({
      attributes: ['jobId'],
      where: {
        course: course,
      },
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};
