module.exports = {
  // Not found
  NOT_FOUND: { errorCode: 1000, httpCode: 404, message: 'NOT_FOUND' },

  // Could not create
  COULD_NOT_CREATE: { errorCode: 2000, httpCode: 500, message: 'COULD_NOT_CREATE' },

  // Could not update
  COULD_NOT_UPDATE: { errorCode: 3000, httpCode: 500, message: 'COULD_NOT_UPDATE' },

  // Could not delete
  COULD_NOT_DELETE: { errorCode: 4000, httpCode: 500, message: 'COULD_NOT_DELETE' },

  // Wrong parameters errors
  WRONG_PARAMETERS: { errorCode: 5000, httpCode: 400, message: 'WRONG_PARAMETERS' },

  // Empty list
  EMPTY_LIST: { errorCode: 6000, httpCode: 500, message: 'EMPTY_LIST' },

  // Already Exists
  ALREADY_EXISTS: { errorCode: 7000, httpCode: 500, message: 'ALREADY_EXISTS' },

  // Auth adn other errors
  UNAUTHORIZED: { errorCode: 8000, httpCode: 401, message: 'UNAUTHORIZED' },
  ACCOUNT_LOCKED: { errorCode: 8001, httpCode: 401, message: 'ACCOUNT_LOCKED' },
  NOT_ACCEPTED: { errorCode: 8002, httpCode: 401, message: 'NOT_ACCEPTED' },
  FAILED_TO_LOGIN: { errorCode: 8003, httpCode: 401, message: 'FAILED_TO_LOGIN' },
  TOO_MANY_REQUESTS: { errorCode: 8004, httpCode: 401, message: 'TOO_MANY_REQUESTS' },

};
