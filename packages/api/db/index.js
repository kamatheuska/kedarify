const mongoose = require("mongoose");
const { getConfig } = require("../config");
const exceptions = require("../constants/exceptions");
const { logInfo } = require("../services/logger");
const { transformErrorToException } = require("../utils/errors");

async function connectToDatabase() {
  const { mongoDbUri } = getConfig();
  const db = mongoose.connection;

  try {
    await mongoose.connect(mongoDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logInfo("Db.connectToDatabase", "Connecting succesfully to", mongoDbUri);
  } catch (error) {
    throw transformErrorToException(error, { code: exceptions.MONGOOSE_ERROR });
  }

  db.on("error", (error) => {
    throw transformErrorToException(error, { code: exceptions.MONGOOSE_ERROR });
  });

  return db;
}

async function disconnectFromDatabase() {
  await mongoose.connection.close();
}
exports.connectToDatabase = connectToDatabase;
exports.disconnectFromDatabase = disconnectFromDatabase;
