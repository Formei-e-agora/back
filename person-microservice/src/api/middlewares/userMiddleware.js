const fetch = require('node-fetch');
const links = require('../../../../helpers/links');

async function createUser(userId, username, password, userType, eligibleEmail, eligiblePush) {
  const response = await fetch(`${links.auth}/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      username,
      password,
      userType,
      eligibleEmail,
      eligiblePush,
    }),
  });
  const jsonResponse = await response.json();
  return jsonResponse.Status;
}

async function updateUser(userId, username, userType, eligibleEmail, eligiblePush) {
  const response = await fetch(`${links.auth}/user/update/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      username,
      userType,
      eligibleEmail,
      eligiblePush,
    }),
  });
  const jsonResponse = await response.json();
  return jsonResponse.Status;
}

async function deleteUser(userId) {
  const response = await fetch(`${links.auth}/user/delete/${userId}`, { method: 'DELETE' });
  const jsonResponse = await response.json();
  return jsonResponse.Status;
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
