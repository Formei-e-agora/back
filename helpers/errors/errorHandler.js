const colors = require('colors')
// const errorCodes = require('./errorCodes');
const ErrorResponse = require('./ErrorResponse')

colors.enable()

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const errorResponse = err
  if (errorResponse instanceof ErrorResponse) {
    console.log(` Detected ErrorCode ${errorResponse.error.errorCode}, `.bgRed + ` Result: ${JSON.stringify(errorResponse.result).dim.red}`.gray)
  } else {
    console.log(`${' Error, '.bgRed}${JSON.stringify(errorResponse).dim.red}`)
    console.log(errorResponse)
    errorResponse.error = {}
  }

  res.status(errorResponse.error.httpCode || 500).json({
    Status: false,
    Error: errorResponse.error.errorCode || '0000',
    Message: errorResponse.error.message || 'INTERNAL_SERVER_ERROR'
  })
}

module.exports = errorHandler
