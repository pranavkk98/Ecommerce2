const express = require("express");
const {
  addProduct,
  addProductImages,
  updateProduct,
  deleteProduct,
} = require("../../controllers/Admin.controller/Product.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { Roles, roleCheck } = require("../../middleware/verifyRole.middleware");
const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const Series = require("../../models/Series.model");

const cloudinary = require("cloudinary").v2;
const {
  cloudinaryKey,
  cloudinarySecret,
  cloudinaryName,
} = require("../../config/keys");
const multer = require("multer");

const router = express.Router();

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
  secure: true,
});

var storage = multer.memoryStorage();

var upload = multer({ storage: storage });

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("name", "Name is Required").isString().notEmpty(),
    body("description", "Description is Required").isString().notEmpty(),
    body("quantity", "Quantity is Required").isNumeric().notEmpty(),
    body("price", "Price is Required").isNumeric().notEmpty(),
    body("discountPrice", "Discounted Price is Required")
      .isNumeric()
      .notEmpty(),
    body("series").custom(async (val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Object Id");
      }
      let exist = await Series.findById(val);
      if (!exist) {
        return Promise.reject("Series Does Not Exist");
      }
      return true;
    }),
  ],
  addProduct
);

router.put(
  "/addImages/:id",
  upload.array("photos", 6),
  authMiddleware,
  roleCheck(Roles.admin),
  [
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Object Id");
      }
      return true;
    }),
  ],
  addProductImages
);

router.put(
  "/update/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("name", "Name is Required").isString().notEmpty(),
    body("description", "Description is Required").isString().notEmpty(),
    body("quantity", "Quantity is Required").isNumeric().notEmpty(),
    body("price", "Price is Required").isNumeric().notEmpty(),
    body("discountPrice", "Discounted Price is Required")
      .isNumeric()
      .notEmpty(),
    body("series").custom(async (val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Object Id");
      }
      let exist = await Series.findById(val);
      if (!exist) {
        return Promise.reject("Series Does Not Exist");
      }
      return true;
    }),
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Object Id");
      }
      return true;
    }),
  ],
  updateProduct
);

router.delete(
  "/delete/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Object Id");
      }
      return true;
    }),
  ],
  deleteProduct
);

module.exports = router;
