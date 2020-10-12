const path = require('path');
const logHandler = require('../../../../helpers/handlers/logHandler');

exports.findMany = async (model, ids, number) => {
  number = Number(number)
  const logFilePath = path.join(__dirname, '../../../logs/dao.log');
  const action = `findMany ${model.name} ids=${ids}`;
  try {
    const result = await model.findAll({
      where: {
        jobId: ids,
      },
      limit: number
    });
    logHandler.success(logFilePath, action);
    return result;
  } catch (e) {
    logHandler.failure(logFilePath, action, e);
    return e;
  }
};
