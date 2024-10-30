import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/api/auth',authRouter)

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:"+PORT);
});
