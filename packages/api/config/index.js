const dotenv = require("dotenv");
const { logDebug } = require("../services/logger");
const { getEnvVar } = require("../utils/config");

const isTest = () => process.env.NODE_ENV === "test";
const isDevelopment = () => process.env.NODE_ENV === "development";
let $config;

const getNodeEnvIndependentEnvs = () => ({
  port: getEnvVar("PORT", 5000, Number),
  debugMode: getEnvVar("DEBUG_MODE", "false", Boolean),
  nodeEnv: getEnvVar("NODE_ENV"),
});

const getMongoDbUri = () => {
  if (isTest()) {
    return "mongodb://localhost:27017/kedarify-test";
  } else if (isDevelopment()) {
    return getEnvVar("MONGODB_URI", "mongodb://localhost:27017/kedarify");
  } else {
    return getEnvVar("MONGODB_URI");
  }
};

const getShowroomBaseUrl = () => {
  return isDevelopment
    ? "http://localhost:3000"
    : getEnvVar("SHOWROOM_BASE_URL");
};

function buildConfigByEnvironment() {
  const showroomBaseUrl = getShowroomBaseUrl();
  const mongoDbUri = getMongoDbUri();

  return {
    ...getNodeEnvIndependentEnvs(),
    isTest,
    isDevelopment,
    showroomBaseUrl,
    mongoDbUri,
  };
}

function initConfig() {
  dotenv.config();
  $config = buildConfigByEnvironment();

  logDebug("initConfig", "INITIAL CONFIG", $config);
}

exports.getConfig = () => $config;
exports.initConfig = initConfig;
