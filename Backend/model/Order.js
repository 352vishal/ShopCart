const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    postcode: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    totalPrice: {
        type: String
    },
    userId: {
        type: String
    }
});

module.exports = mongoose.model("Order", orderSchema);