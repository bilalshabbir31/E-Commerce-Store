import { redis } from "../config/redis.js";
import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if it is not in redis then we have to fetch it from mongodb
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    // store it in redis for future quick access

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    let cloudinaryRes = null;
    if (image) {
      cloudinaryRes = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryRes?.secure_url ? cloudinaryRes?.secure_url : "",
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloudinary");
      } catch (error) {
        console.log("Error in deleting image from cloudinary", error);
      }
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted Sucessfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
