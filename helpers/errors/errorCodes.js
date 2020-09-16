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
  ALREADY_EXISTS: { errorCode: 7000, httpCode: 500, message: 'ALREADY_EXISTS' }

}
