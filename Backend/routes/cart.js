const router = require("express").Router();
const verify = require("../controller/verifyToken");
const { postUserCartProduct,getUserCartProducts,getSingleCartProductId,deleteCartProducts } = require('../controller/CartController');

// Post User All Cart Products
router.post("/", postUserCartProduct);

// Get User All Cart Products
router.get("/", getUserCartProducts);

// Get Single User Cart product Id
router.get("/:userId", getSingleCartProductId);

// Delete User Cart product
router.delete("/:userId", verify, deleteCartProducts);

module.exports = router;