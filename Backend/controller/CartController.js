
const Cart = require("../model/Cart");

// Post All Products
const postUserCartProduct =  async (req, res) => {
  try {
    // const body = req.body;
    const cartList = new Cart({
      userId: req.body.userId,
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productColour: req.body.productColour,
      productQuantity: req.body.productQuantity,
      productCategory: req.body.productCategory,
      productImage: req.body.productImage,
      productDescription: req.body.productDescription,
      subtotal: req.body.subtotal,
      discount: req.body.discount,
      shipping: req.body.shipping,
      totalPrice: req.body.totalPrice,
    });
    await cartList.save();


    res.status(201).json({
            message: 'Product Details Submitted successfully',
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
const getUserCartProducts =  async (req, res) => {
  try {
    const products = await Cart.find();
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
};

// Get Single product Id
// Listing by id use to update data in database
const getSingleCartProductId = async (req, res) => {
  try {
    const cartProduct = await Cart.findById(req.params.userId);
    res.json(cartProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete product
// delete method use to delete data from database using id from frontend and send to database
const deleteCartProducts = async (req, res) => {
  try {
    const removeListing = await Cart.findByIdAndDelete(req.params.userId);
    res.json(removeListing);
  } catch (error) {
    res.json({ message: error });
  }
};  

// Product Quantity update

const updateProductQuantity = async (req, res) => {
  try {
    const updatedProduct = await Cart.findByIdAndUpdate(
      req.params.userId, { 
        productQuantity: req.body.productQuantity, 
        productPrice: req.body.productPrice
      }, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {postUserCartProduct, getSingleCartProductId, deleteCartProducts,getUserCartProducts, updateProductQuantity}