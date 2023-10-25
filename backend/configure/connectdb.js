//exteral imports
const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.MONGOOSE_ATLAS_URL;

//connect to dataBase function
const connectdb = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("DataBase is connected successfully!...");
  } catch (error) {
    console.log(error);
    console.log("DataBase is not connected (Unsuccessful)...");
    process.exit(1);
  }
};

module.exports = connectdb;
