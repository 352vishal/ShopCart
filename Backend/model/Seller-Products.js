const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    
    productName: {
        type: String
    },
    productPrice: {
        type: String
    },
    productColour: {
        type: String
    },
    productQuantity: {
        type: String
    },
    productCategory: {
        type: String
    },
    productImage: {
        type: String
    },
    productDescription: {
        type: String
    },
});

module.exports = mongoose.model("Product", productSchema);