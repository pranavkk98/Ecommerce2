const crypto = require("crypto");
const {
  userRegister,
  userLogin,
  userVerify,
  userInfo,
} = require("../controllers/User.controller");
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { body } = require("express-validator");

const cartRoute = require("./Cart.route");
const addressRoute = require("./Address.route");
const orderRoute = require("./Order.route");

const token = crypto.randomBytes(16).toString("hex");

router.post(
  "/register",
  [
    body("name", "Name is required").trim().notEmpty(),
    body("email", "Enter a valid email").trim().isEmail().normalizeEmail(),
    body("password", "Password must be 8 characters long")
      .isLength({ min: 8 })
      .isString(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  userRegister(token)
);

router.get(`/verifyUser/:key`, userVerify(token));

router.post(
  "/login",
  [
    body("email", "Enter a valid email").trim().isEmail().normalizeEmail(),
    body("password", "Password must be 8 characters long")
      .isLength({ min: 8 })
      .isString(),
  ],
  userLogin
);

router.get("/info", authMiddleware, userInfo);

router.use("/cart", cartRoute);
router.use("/address", addressRoute);
router.use("/order", orderRoute);

module.exports = router;
