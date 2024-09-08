const router = require("express").Router();
const { postUserOrderDetails,
        getUserOrderDetails,
        getSingleOrderDetails,
        deleteOrderDetails
} = require('../controller/OrderController');

// Post User Checkout Details
router.post("/", postUserOrderDetails);

// Get User All Cart Products
router.get("/", getUserOrderDetails);

// Get Single User Cart product Id
router.get("/:userId", getSingleOrderDetails);

// Delete User Cart product
router.delete("/:userId", deleteOrderDetails);

module.exports = router;