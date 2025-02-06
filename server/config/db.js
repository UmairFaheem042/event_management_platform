const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected!");
  } catch (error) {
    console.log("DB not connected!");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
