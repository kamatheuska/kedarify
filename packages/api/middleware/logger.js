const { logInfo } = require("../services/logger");

function registerLogger(req, res, next) {
  res.locals = {
    ...res.locals,
    logInfo: logInfo(`${req.method} - ${req.url}`),
  };

  next();
}

module.exports = registerLogger;
