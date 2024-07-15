const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectionURI = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
