const router = require("express").Router();
const {  
  postRegisterSeller,
  postLoginSeller,
  SendEmail,
  ResetPassword
} = require('../controller/SellerAuthController');


// Seller Register 
router.post("/register", postRegisterSeller);
// Seller login
router.post("/login", postLoginSeller);
// send password link method
router.post("/send-email", SendEmail);
// reset password method
router.post("/reset-password", ResetPassword);


module.exports = router;