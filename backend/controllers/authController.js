import User from "../models/user.js";

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already Exists." });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ user, message: "User created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = (req, res) => {
  res.send("Login");
};

export const logout = (req, res) => {
  res.send("Logout");
};
