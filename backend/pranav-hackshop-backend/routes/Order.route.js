const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { Roles, roleCheck } = require("../middleware/verifyRole.middleware");
const capturePaymentMiddleware = require("../middleware/capture.middleware");
const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const {
  generateOrder,
  paymentOrder,
  captureOrder,
  getOrder,
  deleteOrder,
  getYourOrders,
  getAllOrders,
} = require("../controllers/Order.controller");

router.post(
  "/generate",
  authMiddleware,
  roleCheck(Roles.user),
  [
    body("addressId").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
    body("deliverySpeedId").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Object Id");
      }
      return true;
    }),
  ],
  generateOrder
);

router.get(
  "/payment/:id",
  authMiddleware,
  roleCheck(Roles.user),
  [
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Object Id");
      }
      return true;
    }),
  ],
  paymentOrder
);

router.post("/capture", capturePaymentMiddleware, captureOrder);

router.get(
  "/getOrder/:id",
  authMiddleware,
  roleCheck(Roles.user),
  [
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Object Id");
      }
      return true;
    }),
  ],
  getOrder
);

router.delete(
  "/deleteOrder/:id",
  authMiddleware,
  roleCheck(Roles.user),
  [
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Object Id");
      }
      return true;
    }),
  ],
  deleteOrder
);

router.get(
  "/getYourOrders",
  authMiddleware,
  roleCheck(Roles.user),
  getYourOrders
);

router.get(
  "/getAllOrders",
  authMiddleware,
  roleCheck(Roles.admin),
  getAllOrders
);

module.exports = router;
