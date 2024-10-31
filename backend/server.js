import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json()); // allow us to parse body of the body of request
app.use(cookieParser());

app.use('/api/auth',authRouter)

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:"+PORT);
  connectDB();
});
