const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/JWE";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(`Connected MongoDB `);
  } catch (error) {
    console.log(`ERROR : ${error.message}`);
  }
};

module.exports = connectToMongo;
