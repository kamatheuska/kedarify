/* eslint-disable no-console */
const _ = require("lodash");

const isDebug = () => process.env.DEBUG_MODE === "true";
const skipLogging = () => process.env.NODE_ENV !== "test" ? false : !isDebug;

function buildLogContextString(context) {
  if (typeof context === "object" && _.has(context, "method")) {
    const { method, url } = context;
    return `\n[${method.toUpperCase()} ${url}]`;
  }

  return typeof context === "string" ? `[${context}]:` : "";
}

function logRequestInfo(context, ...info) {
  if (skipLogging()) return;
  const contextString = buildLogContextString(context);
  console.info(contextString, ...info);
}

function logRequestError(context, ...errors) {
  if (skipLogging()) return;
  const contextString = buildLogContextString(context);
  console.error(contextString, ...errors);
}
function logInfo(contextString, ...logs) {
  if (skipLogging()) return;
  if (isDebug()) console.trace();

  console.info(contextString, ...logs);
}

function $logInfo(context, ...logs) {
  const contextString = buildLogContextString(context);

  if (arguments.length === 1) {
    return (..._logs) => {
      logInfo(contextString, ..._logs);
    };
  }

  logInfo(contextString, ...logs);
}

function logDebug(context, ...logs) {
  const contextString = buildLogContextString(context);

  if (isDebug()) {
    console.info(contextString, ...logs);
  }
}

function logError(context, error) {
  if (skipLogging()) return;
  const contextString = buildLogContextString(context);
  console.error(contextString, error);
}

exports.logRequestInfo = logRequestInfo;
exports.logRequestError = logRequestError;
exports.logInfo = $logInfo;
exports.logDebug = logDebug;
exports.logError = logError;
