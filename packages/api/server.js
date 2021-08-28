const { init } = require("./app");
const { logError } = require("./services/logger");

init().catch((error) => logError("init", error));
