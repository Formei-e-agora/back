const fetch = require('node-fetch');
const links = require('../../../../helpers/links');

async function findFiveNewestJobsByCourse(course) {
  try {
    const response = await fetch(`${links.job}/job/find/course/${course}/number/5`, { method: 'GET' });
    const jsonResponse = await response.json();
    if (jsonResponse.Status !== true) {
      return false;
    }
    return jsonResponse.jobs;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  findFiveNewestJobsByCourse,
};
