
const Order = require("../model/Order");

// Post All Products
const postUserOrderDetails =  async (req, res) => {
  try {
    // const body = req.body;
    const orderList = new Order({
      userId: req.body.userId,
      fname: req.body.fname,
      lname: req.body.lname,
      address: req.body.address,
      city: req.body.city,
      postcode: req.body.postcode,
      email: req.body.email,
      phone: req.body.phone,
      totalPrice: req.body.totalPrice,
      productName: req.body.productName,
      productImage: req.body.productImage,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      productCategory: req.body.productCategory,
      productColour: req.body.productColour,
      shipping: req.body.shipping,
      discount: req.body.discount,
      price: req.body.price
    });
    await orderList.save();


    res.status(201).json({
            message: 'Order Details Submitted successfully',
            success: true
        });
} catch (err) {
    console.log('Error ', err);
    res.status(500).json({
        message: 'Internal Server Error',
        success: false,
        error: err
    })
}
}

// Get All Products
// get metthod use to get data from database and give data to the frontend
const getUserOrderDetails =  async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.json({ message: error });
  }
};

// Get Single product Id
// Listing by id use to update data in database
const getSingleOrderDetails = async (req, res) => {
  try {
    const orderProduct = await Order.findById(req.params.userId);
    res.json(orderProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete product
// delete method use to delete data from database using id from frontend and send to database
const deleteOrderDetails = async (req, res) => {
  try {
    const removeListing = await Order.findByIdAndDelete(req.params.userId);
    res.json(removeListing);
  } catch (error) {
    res.json({ message: error });
  }
};  

module.exports = {postUserOrderDetails, getUserOrderDetails, getSingleOrderDetails,deleteOrderDetails}