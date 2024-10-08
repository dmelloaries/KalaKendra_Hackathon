// require("dotenv").config(); // Load env variables at the start
// const express = require("express");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const authRouter = require("./routes/auth/auth-routes");
// const adminProductsRouter = require("./routes/admin/products-routes");
// const adminOrderRouter = require("./routes/admin/order-routes");

// const shopProductsRouter = require("./routes/shop/products-routes");
// const shopCartRouter = require("./routes/shop/cart-routes");
// const shopAddressRouter = require("./routes/shop/address-routes");
// const shopOrderRouter = require("./routes/shop/order-routes");
// const shopSearchRouter = require("./routes/shop/search-routes");
// const shopReviewRouter = require("./routes/shop/review-routes");
// const commonFeatureRouter = require("./routes/common/feature-routes");

// // MongoDB connection
// mongoose
//   .connect(process.env.DB_URL)
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.log(error));

// const app = express();
// const PORT = process.env.PORT || 5001;

// console.log(PORT);
// app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "kala-kendra-hackathon.vercel.app"],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     //allowedHeaders: ["Access-Control-Allow-Origin"],
//   })
// );
// app.get("/", (req, res) => {
//   res.json("Server is live");
// });
// app.use(cookieParser());
// app.use(express.json());
// app.use("/api/auth", authRouter);
// app.use("/api/admin/products", adminProductsRouter);
// app.use("/api/admin/orders", adminOrderRouter);

// app.use("/api/shop/products", shopProductsRouter);
// app.use("/api/shop/cart", shopCartRouter);
// app.use("/api/shop/address", shopAddressRouter);
// app.use("/api/shop/order", shopOrderRouter);
// app.use("/api/shop/search", shopSearchRouter);
// app.use("/api/shop/review", shopReviewRouter);

// app.use("/api/common/feature", commonFeatureRouter);

// app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));


require("dotenv").config(); // Load env variables at the start
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5001;

console.log(PORT);

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", 
  "https://kala-kendra-hackathon.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Required to allow cookies and auth tokens to be sent across origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
  optionsSuccessStatus: 204, // Response code for preflight requests (204: No Content)
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json("Server is live");
});

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// Start the server
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
