import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.js";
import { getAnalyticsData, getDailySalesData } from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dailySalesData = await getDailySalesData(startDate, endDate);
    res.json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default analyticsRouter;
