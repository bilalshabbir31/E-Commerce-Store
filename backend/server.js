import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import couponRouter from "./routes/coupon.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json()); // allow us to parse body of the body of request
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupons", couponRouter);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
