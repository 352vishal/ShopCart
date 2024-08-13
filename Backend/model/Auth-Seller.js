const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("Seller", sellerSchema);