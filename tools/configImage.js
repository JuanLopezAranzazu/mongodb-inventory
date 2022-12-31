const { config } = require("./../config");
const cloudinary = require("cloudinary").v2;
// configuration
cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

module.exports = cloudinary;
