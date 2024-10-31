import express from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { adminRoute, protectRoute } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.get("/", protectRoute, adminRoute, getAllProducts);
productRouter.get("/featured", getFeaturedProducts);
productRouter.post("/", protectRoute, adminRoute, createProduct);
productRouter.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default productRouter;
