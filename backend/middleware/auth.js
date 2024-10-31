import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Access Token Provided" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECERT);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status.json({ message: "Unauthorized - Invalid access token" });
  }
};

export const adminRoute = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized - Admin Only" });
  }
};
