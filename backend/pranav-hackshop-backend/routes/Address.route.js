const express = require("express");
const {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
} = require("../controllers/Address.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { Roles, roleCheck } = require("../middleware/verifyRole.middleware");
const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.user),
  [
    body("addressLineOne", "Address Line One is required")
      .isString()
      .notEmpty(),
    body("addressLineTwo", "Address Line Two is required")
      .isString()
      .notEmpty(),
    body("landmark", "Landmark is required").isString().notEmpty(),
    body("city", "City is required").isString().notEmpty(),
    body("state", "state is required").isString().notEmpty(),
    body("pincode", "pincode is required").isNumeric().notEmpty(),
  ],
  addAddress
);

router.put(
  "/update/:id",
  authMiddleware,
  roleCheck(Roles.user),
  [
    body("addressLineOne", "Address Line One is required")
      .isString()
      .notEmpty(),
    body("addressLineTwo", "Address Line Two is required")
      .isString()
      .notEmpty(),
    body("landmark", "Landmark is required").isString().notEmpty(),
    body("city", "City is required").isString().notEmpty(),
    body("state", "State is required").isString().notEmpty(),
    body("pincode", "Pincode is required").isNumeric().notEmpty(),
    param("id").custom((val, { req }) => {
      let valid = ObjectId.isValid(val);
      if (!valid) {
        return Promise.reject("Invalid Object Id");
      }
      return true;
    }),
  ],
  updateAddress
);

router.delete(
  "/delete/:id",
  authMiddleware,
  roleCheck(Roles.user),
  [
    param("id").custom((val, { req }) => {
      let valid = ObjectId.isValid(val);
      if (!valid) {
        return Promise.reject("Invalid Object Id");
      }
      return true;
    }),
  ],
  deleteAddress
);

router.get(
  "/getAddresses",
  authMiddleware,
  roleCheck(Roles.user),
  getAddresses
);

module.exports = router;
