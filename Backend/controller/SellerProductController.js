
const Products = require("../model/Seller-Products");

// Post All Products
// post method use to take data from frontend and send to database
const postSellerProducts =  async (req, res) => {
  try {
    const body = req.body;
    const productImage = req?.file ? req?.file?.path : null;
    body.productImage = productImage;
    const emp = new Products(body);
    await emp.save();


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
  };

// Get All Products
// get metthod use to get data from database and give data to the frontend
const getSellerProducts =  async (req, res) => {
    try {
      const products = await Products.find();
      res.json(products);
    } catch (error) {
      res.json({ message: error });
    }
  };

// Get Single product Id
// Listing by id use to update data in database
const getProductsId = async (req, res) => {
    try {
      const product = await Products.findById(req.params.productId);
      res.json(product);
    } catch (error) {
      res.json({ message: error });
    }
};

// Update product
// put method use to update data in database using id from frontend and send to database
const updateSellerProducts = async (req, res) => {
    try {
      const product = {
          productName: req.body.productName,
          productPrice: req.body.productPrice,
          productColour: req.body.productColour,
          productQuantity: req.body.productQuantity,
          productCategory: req.body.productCategory,
          productImage: req.body.productImage,
          productDescription: req.body.productDescription
      };
  
      const updatedproduct = await Products.findByIdAndUpdate(
        { _id: req.params.productId },
        product
      );
      res.json(updatedproduct);
    } catch (error) {
      res.json({ message: error });
    }
  };

// Delete product
// delete method use to delete data from database using id from frontend and send to database
const deleteSellerProducts = async (req, res) => {
    try {
      const removeListing = await Products.findByIdAndDelete(req.params.productId);
      res.json(removeListing);
    } catch (error) {
      res.json({ message: error });
    }
  };  

  module.exports = { 
    postSellerProducts,
    getSellerProducts,
    getProductsId,
    updateSellerProducts,
    deleteSellerProducts,
  }