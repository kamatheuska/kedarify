const ConfigUtils = require("../../../utils/config");
const { setupProcessEnvMock } = require("../../utils");

let result;
const VALID_ENV_KEY = "foh";
const DEFAULT_ENV_KEY = "Default foh";
const VALID_ENV_VALUE = "fah";

describe("🌳  ConfigUtils", () => {
  describe("🌴 serializeEnv", () => {
    it.each([
      [true, "true", Boolean], // expected, subject, type
      [false, "false", Boolean],
      ["false", "false", String],
      ["returns some string", "returns some string", String],
    ])(
      '🌱 should return the right type "%s" for the string "%s"',
      (expected, subject, type) => {
        result = ConfigUtils.serializeEnv(subject, type);
        expect(result).toBe(expected);
      }
    );
  });
  describe("🌴 getEnvVar", () => {
    let mockSerizalizeEnv;
    const OLD_ENV = process.env;

    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });

    beforeEach(() => {
      // static class method mock
      mockSerizalizeEnv = jest.fn();
      ConfigUtils.serializeEnv = mockSerizalizeEnv;

      setupProcessEnvMock(OLD_ENV);
    });

    it("🌱 should return the serialized value if exist in process.env", () => {
      // Set Variables for mock
      process.env[VALID_ENV_KEY] = VALID_ENV_VALUE;

      mockSerizalizeEnv.mockReturnValue(VALID_ENV_VALUE);

      result = ConfigUtils.getEnvVar(VALID_ENV_KEY);
      expect(result).toBe(VALID_ENV_VALUE);
    });
    it("🌱 should return the serialized default value if default is passed", () => {
      mockSerizalizeEnv.mockReturnValue(VALID_ENV_KEY);

      result = ConfigUtils.getEnvVar(VALID_ENV_KEY, DEFAULT_ENV_KEY);
      expect(result).toBe(VALID_ENV_KEY);
    });
    it("🌱 should throw an error if no value founded in process.env and no default is passed", () => {
      mockSerizalizeEnv.mockReturnValue(VALID_ENV_KEY);

      expect(() => ConfigUtils.getEnvVar("asd")).toThrow();
      expect(() => ConfigUtils.getEnvVar("iamnotexistent")).toThrow();
    });
  });
});
