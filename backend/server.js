import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import couponRouter from "./routes/coupon.js";
import paymentRouter from "./routes/payment.js";
import analyticsRouter from "./routes/analytics.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json({limit: "10mb"})); // allow us to parse body of the body of request
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/analytics", analyticsRouter);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
