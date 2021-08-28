const dotenv = require("dotenv");
const { logDebug } = require("../services/logger");
const { getEnvVar } = require("../utils/config");

const isTest = process.env.NODE_ENV === "test";
const isDevelopment = process.env.NODE_ENV === "development";
let $config;

const getNodeEnvIndependentEnvs = () => ({
  port: getEnvVar("PORT", 5000, Number),
  nodeEnv: getEnvVar("NODE_ENV", "development"),
  debugMode: getEnvVar("DEBUG_MODE", "false", Boolean),
});

function buildConfigByEnvironment() {

  const showroomBaseUrl = isDevelopment ? getEnvVar('SHOWROOM_BASE_URL') : 'http://localhost:3000';

  return {
    ...getNodeEnvIndependentEnvs(),
    isTest,
    isDevelopment,
    showroomBaseUrl,
  };
}

function initConfig() {
  dotenv.config();
  $config = buildConfigByEnvironment();

  logDebug("initConfig", "INITIAL CONFIG", $config);
}

exports.getConfig = () => $config;
exports.initConfig = initConfig;
