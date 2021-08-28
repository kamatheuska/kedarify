const { Exception } = require("../services/exceptions");

/**
 * In order to unit test this functions, it was neccesaty to make them a class
 * reference: https://stackoverflow.com/a/45288360/7868769
 */
class ConfigUtils {
  static serializeEnv(env, type) {
    if (type === Boolean) return env === "true"; // Coerce to boolean
    if (type === Number) return +env; // Coerce to number
    return env;
  }

  static getEnvVar(key, defaultValue = null, type) {
    if (process.env[key]) {
      return ConfigUtils.serializeEnv(process.env[key], type);
    }
    if (defaultValue && key) {
      return ConfigUtils.serializeEnv(defaultValue, type);
    }

    throw new Exception(
      "init.getEnvVar",
      `Required but not defined : Env Variable ${key}.`
    );
  }
}

module.exports = ConfigUtils;
