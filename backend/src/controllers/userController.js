const User = require("../models/User");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = new User({ fullName, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res
        .status(400)
        .send({ message: `${req.body.email} already exists.` });
    }
    res.status(400).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  signInUser,
  getProfile,
};
