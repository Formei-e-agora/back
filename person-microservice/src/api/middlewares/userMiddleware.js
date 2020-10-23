const fetch = require('node-fetch');
const links = require('../../../../helpers/links');
const errors = require('../../../../helpers/errors/errorCodes');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');

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

async function findUnlockInfo(userId) {
  try {
    const response = await fetch(`${links.auth}/user/find/unlockInfo/userId/${userId}`, { method: 'GET' });
    const jsonResponse = await response.json();
    if (jsonResponse.Status !== true) {
      throw new ErrorResponse(errors.NOT_FOUND, 'user');
    }
    return jsonResponse.userData;
  } catch (error) {
    console.log(error);
    throw new ErrorResponse(errors.NOT_FOUND, 'user');
  }
}

async function findAllEligibleEmail() {
  try {
    const response = await fetch(`${links.auth}/user/find/all/eligibleEmail`, { method: 'GET' });
    const jsonResponse = await response.json();
    if (jsonResponse.Status !== true) {
      return false;
    }
    return jsonResponse.users;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteUser(userId) {
  const response = await fetch(`${links.auth}/user/delete/${userId}`, { method: 'DELETE' });
  const jsonResponse = await response.json();
  return jsonResponse.Status;
}

module.exports = {
  createUser,
  updateUser,
  findUnlockInfo,
  findAllEligibleEmail,
  deleteUser,
};
