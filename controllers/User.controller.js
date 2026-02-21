





import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN + COOKIE
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PROTECTED ROUTE
export const profileUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    res.json({ message: "Profile data", user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// LOGOUT
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};