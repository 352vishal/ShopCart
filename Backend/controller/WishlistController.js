
const Wishlist = require("../model/Wishlist");

// Post All Products
const postUserWishlistProduct =  async (req, res) => {
  try {
    // const body = req.body;
    const wishList = new Wishlist({
      userId: req.body.userId,
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productColour: req.body.productColour,
      productQuantity: req.body.productQuantity,
      productCategory: req.body.productCategory,
      productImage: req.body.productImage,
      productDescription: req.body.productDescription
    });
    await wishList.save();


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
const getUserWishlistProducts =  async (req, res) => {
  try {
    const products = await Wishlist.find();
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
};

// Get Single product Id
// Listing by id use to update data in database
const getSingleWishlistProductId = async (req, res) => {
  try {
    const wishlistProduct = await Wishlist.findById(req.params.userId);
    res.json(wishlistProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete product
// delete method use to delete data from database using id from frontend and send to database
const deleteWishlistProducts = async (req, res) => {
  try {
    const removeListing = await Wishlist.findByIdAndDelete(req.params.userId);
    res.json(removeListing);
  } catch (error) {
    res.json({ message: error });
  }
};  

module.exports = {postUserWishlistProduct, getUserWishlistProducts, getSingleWishlistProductId, deleteWishlistProducts}