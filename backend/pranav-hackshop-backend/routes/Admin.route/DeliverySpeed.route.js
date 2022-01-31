const express = require("express");
const router = express.Router();
const {
  addDeliverySpeed,
  updateDeliverySpeed,
  deleteDeliverySpeed,
} = require("../../controllers/Admin.controller/DeliverySpeed.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { Roles, roleCheck } = require("../../middleware/verifyRole.middleware");
const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("name", "Name is Required").isString().notEmpty(),
    body("speed", "Speed is Required").isString().notEmpty(),
    body("price", "Price is Required").isNumeric().notEmpty(),
    body("partner", "Partner is Required").isString().notEmpty(),
  ],
  addDeliverySpeed
);

router.put(
  "/update/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("name", "Name is Required").isString().notEmpty(),
    body("speed", "Speed is Required").isString().notEmpty(),
    body("price", "Price is Required").isNumeric().notEmpty(),
    body("partner", "Partner is Required").isString().notEmpty(),
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  updateDeliverySpeed
);

router.delete(
  "/delete/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  deleteDeliverySpeed
);

module.exports = router;
