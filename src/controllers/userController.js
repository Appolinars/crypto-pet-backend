import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "45d",
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, avatar } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
    avatar: avatar ? avatar : null,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      avatar: user.avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await bcryptjs.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      avatar: user.avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  }).select("-password");

  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
