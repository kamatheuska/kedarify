const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

const app = express();
const { initConfig, getConfig } = require("./config");
const {
  errorLogger,
  errorResponseMapper,
  defaultErrorResponse,
} = require("./middleware/errors");
const { logInfo } = require("./services/logger");

let config;
let server;

function initializeConfiguration() {
  initConfig();

  config = getConfig();
}

function startServer() {
  return app.listen(config.port, () => {
    logInfo("init.startServer", `Server started on port ${config.port}`);
  });
}

async function stopServer() {
  server.close();
}

function registerControllers() {
  if (config.nodeEnv === "development") {
    app.use(morgan("dev"));
  }

  app.use(cors({
    origin: config.showroomBaseUrl
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(require("./middleware/logger"));

  app.get("/api/test", (req, res) => {
    res.json("Hello World Kedarify");
  });

  app.use(errorLogger);
  app.use(errorResponseMapper);
  app.use(defaultErrorResponse);
}

async function init() {
  initializeConfiguration();
  registerControllers();
  server = startServer();
}

module.exports = {
  app,
  init,
  stopServer,
};
