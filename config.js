require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "test",
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
  dbMongoUri:
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_DB_URI_TEST
      : process.env.MONGO_DB_URI,
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
};

module.exports = { config };
