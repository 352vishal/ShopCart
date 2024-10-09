const router = require("express").Router();
const { postUserCartProduct,
        getUserCartProducts,
        getSingleCartProductId,
        deleteCartProducts,
        updateProductQuantity 
} = require('../controller/CartController');

// Post User All Cart Products
router.post("/", postUserCartProduct);

// Get User All Cart Products
router.get("/", getUserCartProducts);

// Get Single User Cart product Id
router.get("/:userId", getSingleCartProductId);

// Delete User Cart product
router.delete("/:userId", deleteCartProducts);

// Product price update
router.put("/:userId", updateProductQuantity);

module.exports = router;