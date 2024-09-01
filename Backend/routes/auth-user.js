const router = require("express").Router();
const {  
  postRegisterUser,
  postLoginUser,
  SendEmail,
  ResetPassword
} = require('../controller/UserAuthController');


// Seller Register 
router.post("/register", postRegisterUser);
// Seller login
router.post("/login", postLoginUser);
// send password link method
router.post("/send-email", SendEmail);
// reset password method
router.post("/reset-password", ResetPassword);


module.exports = router;