const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { Roles, roleCheck } = require("../middleware/verifyRole.middleware");
const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const {
  addCartItem,
  updateCartItem,
  deleteCartItem,
  getCart,
  getDeliverySpeeds,
} = require("../controllers/Cart.controller");

router.post(
  "/add/:id",
  authMiddleware,
  roleCheck(Roles.user),
  [
    body("product").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
    body("quantity", "Quantity is required").isNumeric().notEmpty(),
    body("totalPrice", "Total price is required").isNumeric().notEmpty(),
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  addCartItem
);

router.put(
  "/update/:id",
  authMiddleware,
  roleCheck(Roles.user),
  [
    body("itemId").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
    body("quantity", "Quantity is required").isNumeric().notEmpty(),
    body("totalPrice", "Total price is required").isNumeric().notEmpty(),
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  updateCartItem
);

router.delete(
  "/delete/:id",
  authMiddleware,
  roleCheck(Roles.user),
  [
    body("itemId").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  deleteCartItem
);

router.get("/getCart", authMiddleware, roleCheck(Roles.user), getCart);

router.get("/getDeliverySpeeds", authMiddleware, getDeliverySpeeds);

module.exports = router;
