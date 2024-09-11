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
    productName:{
        type: String
    },
    productImage:{
        type: String
    },
    productDescription:{
        type: String
    },
    productPrice:{
        type: String
    },
    productQuantity:{
        type: String
    },
    productColour:{
        type: String
    },
    productCategory:{
        type: String
    },
    price:{
        type: String
    },
    shipping:{
        type: String
    },
    discount:{
        type: String
    },
    userId: {
        type: String
    }
});

module.exports = mongoose.model("Order", orderSchema);