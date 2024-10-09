const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    
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
    subtotal: {
        type: String
    },
    discount: {
        type: String
    },
    shipping: {
        type: String
    },
    totalPrice: {
        type: String
    },
    userId: {
        type: String
    }
});

module.exports = mongoose.model("Cart", cartSchema);