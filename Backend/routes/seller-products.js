const router = require("express").Router();
const verify = require("../controller/verifyToken");
const {  
  postSellerProducts,
  getSellerProducts,
  getProductsId,
  updateSellerProducts,
  deleteSellerProducts,
} = require('../controller/SellerProductController');

// image upload at cloudinary website
const { cloudinaryFileUploader } = require('../Middlewares/FileUplaoder');

// Post Seller All Products
router.post("/", cloudinaryFileUploader.single('productImage'), postSellerProducts);

// Get Seller All Products
router.get("/", getSellerProducts);

// Get Single Seller product Id
router.get("/:productId", getProductsId);

// Update Seller product
router.put("/:productId", verify, updateSellerProducts);

// Delete Seller product
router.delete("/:productId", verify, deleteSellerProducts);

module.exports = router;