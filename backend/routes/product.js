import express from "express"
import {
  getAllProducts,
  getFeaturedProducts,
} from "../controllers/productController.js";
import { adminRoute, protectRoute } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.get("/",protectRoute, adminRoute, getAllProducts);
productRouter.get("/featured", getFeaturedProducts);

export default productRouter;