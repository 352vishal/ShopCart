const router = require("express").Router();
const User = require("../model/Auth-User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SellerToken = require("../model/Token");
const nodemailer = require("nodemailer");

// User Register 
const postRegisterUser = async (req, res) => {

    // checking user email id in database
const emailExit = await User.findOne({
  email: req.body.email
});

if (emailExit) return res.status(400).send("Email already exists");

// hash password 
//  Dicript the password not visibale in database
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new User
  const user = new User({
  name: req.body.name,
  email: req.body.email,
  password: hashedPassword
});

try {
  const savedUser = await user.save();
  res.send(savedUser);
} catch (error) {
  res.status(400).send(error);
}
};

// User login
const postLoginUser = async (req, res) => {
    // checking User email id in database
    const user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send({ message: "Email is Wrong" });
  
    // checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ message: "Invalid Password" });
  
    // creat and assign a token
    const token = jwt.sign({ _id: user._id , name: user.email}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ token: token });

  };

// Forgot Password Code 
// send password link method
const SendEmail = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({email: {$regex: '^'+email+'$', $options: 'i'}});
    if(!user) {
          return res.status(400).send({ message: "User not found to reset the email" });
    }
    const payload = {
    email: user.email
  }
    const expiryTime = 500;
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: expiryTime});
  
    const newToken = new SellerToken({
      userId: user._id,
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
          <p>Dear &nbsp; ${user.email},</p>
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
        const user = await User.findOne({email: {$regex: '^' + response.email + '$', $options: 'i'}});
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(newPassword, salt);
        user.passowrd = encryptedPassword;
        try{
            const updatedUser = await User.findOneAndUpdate(
              {_id: user._id},
              {$set: user},
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
    postRegisterUser,
    postLoginUser,
    SendEmail,
    ResetPassword
}  