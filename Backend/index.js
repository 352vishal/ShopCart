const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');

dotenv.config();

// Import routes
const productRoutes = require("./routes/seller-products");
const sellerRoutes = require("./routes/auth-seller");
const userRoutes = require("./routes/auth-user");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

// Database path
require('./Database/db');

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// route Middlewares
app.use("/api/seller-products", productRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(4000, () => console.log("server up and runing on port 4000!"));