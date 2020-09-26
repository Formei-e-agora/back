const fetch = require('node-fetch');
const links = require('../../../../helpers/links');
const errors = require('../../../../helpers/errors/errorCodes');
const ErrorResponse = require('../../../../helpers/errors/ErrorResponse');
const asyncHandler = require('../../../../helpers/handlers/asyncHandler');

exports.findPersonByEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const result = await fetch(`${links.person}person/find/email/${email}`, {
    method: 'GET',
  });
  const jsonResult = await result.json();

  if (jsonResult.Status !== true) {
    throw new ErrorResponse(errors.NOT_FOUND, jsonResult);
  }
  req.body.person = jsonResult.personData;

  next();
});
