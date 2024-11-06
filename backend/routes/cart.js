import express from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cartController.js";
import { protectRoute } from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.get("/", protectRoute, getCartProducts);
cartRouter.post("/", protectRoute, addToCart);
cartRouter.delete("/", protectRoute, removeAllFromCart);
cartRouter.put("/:id", protectRoute, updateQuantity);

export default cartRouter;