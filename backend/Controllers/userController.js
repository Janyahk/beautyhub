import User from "../models/User.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phoneno,password, role } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phoneno,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const loginUser = async (req, res) => {
  try {
    const {name, email,phoneno, password } = req.body;

    // 1. Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey", // use .env in real project
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name:user.name,
        email: user.email,
        phoneno:user.phoneno,
        role: user.role.toUpperCase()
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// DELETE USER
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// UPDATE ROLE
export const updateUserRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );

  res.json(user);
};