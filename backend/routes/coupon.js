import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getCoupon, validateCoupon } from "../controllers/couponController.js";

const couponRouter = express.Router()

couponRouter.get("/", protectRoute, getCoupon);
couponRouter.get("/validate",protectRoute, validateCoupon);

export default couponRouter;