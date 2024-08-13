const mongoose = require("mongoose");

// MongoDb Database Connection
const DB_CONNECT = process.env.DB_CONNECT;

mongoose.connect(DB_CONNECT)
  .then(() => {
    console.log("MongoDB Connected...");
}).catch((err) => {
    console.log("Error in MongoDB Connection...", err);
  })
