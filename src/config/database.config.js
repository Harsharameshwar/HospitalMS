const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MONGO_URL } = require("../../envFiles");
dotenv.config();

const connectDB = async () => {
  try {
    const res = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
    });
    // console.log(res);
    console.log(`Connected to mongoDB`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
