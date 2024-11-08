import express from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  getRecommendedProducts,
  getProductsByCategory,
  toggleFeaturedProduct,
} from "../controllers/productController.js";
import { adminRoute, protectRoute } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.get("/", protectRoute, adminRoute, getAllProducts);
productRouter.get("/featured", getFeaturedProducts);
productRouter.get("/recommendations", getRecommendedProducts);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.post("/", protectRoute, adminRoute, createProduct);
productRouter.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
productRouter.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default productRouter;
