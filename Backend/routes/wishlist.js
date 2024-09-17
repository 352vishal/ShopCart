const router = require("express").Router();
const { postUserWishlistProduct,
        getUserWishlistProducts,
        getSingleWishlistProductId,
        deleteWishlistProducts 
} = require('../controller/WishlistController');

// Post User All Cart Products
router.post("/", postUserWishlistProduct);

// Get User All Cart Products
router.get("/", getUserWishlistProducts);

// Get Single User Cart product Id
router.get("/:userId", getSingleWishlistProductId);

// Delete User Cart product
router.delete("/:userId", deleteWishlistProducts);

module.exports = router;