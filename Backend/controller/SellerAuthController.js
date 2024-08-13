const router = require("express").Router();
const Seller = require("../model/Auth-Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SellerToken = require("../model/SellerToken");
const nodemailer = require("nodemailer");


// Seller Register 
const postRegisterSeller = async (req, res) => {

    // checking seller email id in database
const emailExit = await Seller.findOne({
  email: req.body.email
});

if (emailExit) return res.status(400).send("Email already exists");

// hash password 
//  Dicript the password not visibale in database
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new Seller
  const seller = new Seller({
  name: req.body.name,
  email: req.body.email,
  password: hashedPassword
});

try {
  const savedSeller = await seller.save();
  res.send(savedSeller);
} catch (error) {
  res.status(400).send(error);
}
};

// Seller login
const postLoginSeller = async (req, res) => {
    // checking Seller email id in database
    const seller = await Seller.findOne({ email: req.body.email});
    if (!seller) return res.status(400).send({ message: "Email is Wrong" });
  
    // checking password
    const validPass = await bcrypt.compare(req.body.password, seller.password);
    if (!validPass) return res.status(400).send({ message: "Invalid Password" });
  
    // creat and assign a token
    const token = jwt.sign({ _id: seller._id , name: seller.email}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ token: token });

  };

// Forgot Password Code 
// send password link method
const SendEmail = async (req, res) => {
    const email = req.body.email;
    const seller = await Seller.findOne({email: {$regex: '^'+email+'$', $options: 'i'}});
    if(!seller) {
          return res.status(400).send({ message: "Seller not found to reset the email" });
    }
    const payload = {
    email: seller.email
  }
    const expiryTime = 500;
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: expiryTime});
  
    const newToken = new SellerToken({
      sellerId: seller._id,
      token: token
    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "vishal.hariyani41@gmail.com",
        pass: "vdzpqeillbxoxkja"
      }
    });
  
    const mailDetails = {
      from: 'vishal.hariyani41@gmail.com',
      to: email,
      subject: 'Reset Password!',
      html:
          `<html>
        <head>
              <title>Password Reset Request</title>
        </head>
        <body>
          <h1>Password Reset Request</h1>
          <p>Dear &nbsp; ${seller.email},</p>
          <p>We have received a request to reset your password for your account with ShopCart. To complete the password reset process, please click on the button below: </p>
          <a href=${process.env.LIVE_URL}/reset/${token}>
          <button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;">Reset Paswword</button>
          </a> 
          <p>Please note that this link is only valid for a 2mins. If you did not request a password reset, please disregard this message.</p>
          <p>Thank you,</p>
          <p>ShopCart Team</p>
        </body>
        </html>`,
      };
  
      transporter.sendMail(mailDetails, async(error, data) =>{
        if (error) {
          console.log(error);
          return res.status(400).send({ message: "Something went wrong when email send" });
        } else {
          await newToken.save();
          return res.status(200).send({ message: "Email Sent Successfully"})
        }
      });
  };  

// Forgot Password Code
// reset password method 
const ResetPassword = async (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.password;
  
    jwt.verify(token, process.env.TOKEN_SECRET, async(err,data) => {
      if(err){
        return res.status(500).send({ message: "Reset Link is Expire!" });
      }else{
        const response = data;
        const seller = await Seller.findOne({email: {$regex: '^' + response.email + '$', $options: 'i'}});
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(newPassword, salt);
        seller.passowrd = encryptedPassword;
        try{
            const updatedSeller = await Seller.findOneAndUpdate(
              {_id: seller._id},
              {$set: seller},
              {new: true}
            )
            return res.status(200).send({ message: "Password Reset Success" })
        }catch (error){
          return res.status(500).send({ message: "Sommthing went wrong when reseting the passowrd" });
        }
      }
    })
  };
 
module.exports = {
    postRegisterSeller,
    postLoginSeller,
    SendEmail,
    ResetPassword
}  