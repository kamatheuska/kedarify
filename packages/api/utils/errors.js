const { TypeErrorException, Exception } = require("../services/exceptions");
const exceptions = require("../constants/exceptions");

function isTypeOrThrow(subject) {
  if (typeof subject !== "string") {
    throw new TypeErrorException(`Subject ${subject} is not of type string`);
  }
}

function isEqualOrThrow(
  subject,
  object,
  { GivenException = Exception, errorMessage = "" }
) {
  if (subject !== object) {
    throw new GivenException(
      `Subject ${subject} is not of equal to ${object} -> ${errorMessage}`
    );
  }
}
function isLessThanOrThrow(
  subject,
  object,
  { GivenException = Exception, errorMessage = "" }
) {
  if (subject === object) {
    throw new GivenException(
      `Subject ${subject} should be less than ${object} -> ${errorMessage}`
    );
  }
}
function isTruthyOrThrow(subject, GivenException = Exception) {
  if (!subject) {
    throw new GivenException(`${subject} is falsy`);
  }
}
function isTruthyOrThrowMessage(
  subject,
  { GivenException, errorMessage } = {
    GivenException: Exception,
    errorMessage: "",
  }
) {
  if (!subject) {
    throw new GivenException(errorMessage);
  }
}

function transformErrorToException(
  error,
  { message = "", code = exceptions.GENERIC }
) {
  const exception = new Exception(`${message}\n${error.message}`);
  exception.name = `${error.name}Exception`;
  exception.stack = error.stack;
  exception.code = code;

  return exception;
}

exports.isTypeOrThrow = isTypeOrThrow;
exports.isEqualOrThrow = isEqualOrThrow;
exports.isLessThanOrThrow = isLessThanOrThrow;
exports.isTruthyOrThrow = isTruthyOrThrow;
exports.isTruthyOrThrowMessage = isTruthyOrThrowMessage;
exports.transformErrorToException = transformErrorToException;
