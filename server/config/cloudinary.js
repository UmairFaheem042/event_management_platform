const cloudinary = require("cloudinary").v2;

const connectCloud = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    console.log("Cloudinary Connection Successfull");
  } catch (error) {
    console.log("Cloudinary Connection Unsuccessfull");
    console.log(error);
  }
};

module.exports = connectCloud;
