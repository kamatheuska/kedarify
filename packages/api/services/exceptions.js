/* eslint-disable max-classes-per-file */

const exceptions = require("../constants/exceptions");
const _ = require("lodash");

class Exception extends Error {
  constructor(...params) {
    super(...params);

    if (_.has(Error, "captureStackTrace")) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      Object.defineProperty(this, "stack", {
        value: new Error().stack,
      });
    }

    Object.defineProperty(this, "message", {
      value: params[0].message,
    });
    this.name = "Exception";
    this.date = new Date();
    this.code = exceptions.GENERIC;
    this.message = [...params].join(" - ");
  }
}

class DocumentNotFoundException extends Exception {
  constructor(...params) {
    super(...params);
    this.name = "DocumentNotFoundException";
    this.code = exceptions.DB_DOCUMENT_NOT_FOUND;
  }
}

class TypeErrorException extends Exception {
  constructor(...params) {
    super(...params);
    this.name = "TypeErrorException";
    this.code = exceptions.TYPE_ERROR;
  }
}

class RequestParamException extends Exception {
  constructor(...params) {
    super(...params);
    this.name = "RequestParamException";
    this.code = exceptions.INVALID_REQUEST_PARAM;
  }
}

Exception.prototype = Object.create(Error.prototype);
DocumentNotFoundException.prototype = Object.create(Exception.prototype);
TypeErrorException.prototype = Object.create(Exception.prototype);
RequestParamException.prototype = Object.create(Exception.prototype);
RequestParamException.prototype = Object.create(Exception.prototype);

exports.Exception = Exception;
exports.DocumentNotFoundException = DocumentNotFoundException;
exports.TypeErrorException = TypeErrorException;
exports.RequestParamException = RequestParamException;
