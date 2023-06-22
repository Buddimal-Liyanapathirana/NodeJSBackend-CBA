const mongoose = require("mongoose");

const dbConnect = () => {
  const url = process.env.MONGODB_URL;
  mongoose.connect(url);
  console.log(`connected to ${url.split("/")[3].split("?")[0]}`);
};

module.exports = dbConnect;
