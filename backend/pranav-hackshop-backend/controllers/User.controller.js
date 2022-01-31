const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const saltRounds = 10;
const User = require("../models/User.model");
const Cart = require("../models/Cart.model");
const { jwtSecret, frontEndBaseUrl } = require("../config/keys");
const { sendEmail } = require("../utils/sendEmail");
const { verifyEmail } = require("../utils/emailTemplate");

let userRegister = (key) => async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const { name, email, password } = req.body;

    let checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        info: "Email address already in use",
        type: "error",
      });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    let userToAdd = new User({
      name,
      email,
      password: hash,
      verificationToken: key,
    });
    let user = await userToAdd.save();

    let cartToAdd = new Cart({
      user: user._id,
      cartItems: [],
      create: Date.now(),
      lastUpdate: Date.now(),
    });
    await cartToAdd.save();

    await sendEmail(
      email,
      "Complete your registration to HackShop",
      verifyEmail(name, `${frontEndBaseUrl}/userVerify/${key}`)
    );

    return res.status(200).json({ info: "Email sent.", type: "data" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ info: "Internal Server Error", type: "error" });
  }
};

let userVerify = (token) => async (req, res) => {
  try {
    if (token === req.params.key) {
      await User.findOneAndUpdate(
        { verificationToken: req.params.key },
        { isVerified: true, verificationToken: "" }
      );
      return res.status(200).json({ info: "User Verified", type: "data" });
    }
    return res
      .status(404)
      .json({ info: "Invalid verification link", type: "error" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ info: "Internal Server Error", type: "error" });
  }
};

let userLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        info: "Either email or password is incorrect.",
        type: "error",
      });
    }
    if (user.isFlagged) {
      return res.status(400).json({
        info: "Admin has flagged this user from the app. Contact Admin for support",
        type: "error",
      });
    }
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ info: "User is not verified", type: "error" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({
        info: "Either email or password is incorrect.",
        type: "error",
      });
    }
    let token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "2 Days" }
    );
    let lastLogin = new Date();
    await User.findByIdAndUpdate(user._id, { lastLogin });

    return res.status(200).json({ info: token, type: "data" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ info: "Internal Server Error", type: "error" });
  }
};

let userInfo = async (req, res) => {
  try {
    return res.status(200).json({ info: req.user, type: "data" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = { userRegister, userLogin, userVerify, userInfo };
