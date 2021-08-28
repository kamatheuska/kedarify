/* eslint-disable consistent-return */

const { logRequestError } = require("../services/logger");
const exceptions = require("../constants/exceptions");

function errorLogger(error, req, res, next) {
  logRequestError(req, error);
  next(error);
}

function errorResponseMapper(error, req, res, next) {
  next(error);
}

// eslint-disable-next-line no-unused-vars
function defaultErrorResponse(error, req, res, next) {
  if (error.code === exceptions.DB_DOCUMENT_NOT_FOUND) {
    return res.status(404).send();
  }
  res.status(400).send();
}

exports.errorLogger = errorLogger;
exports.errorResponseMapper = errorResponseMapper;
exports.defaultErrorResponse = defaultErrorResponse;
