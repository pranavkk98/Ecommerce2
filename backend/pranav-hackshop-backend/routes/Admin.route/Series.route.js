const express = require("express");
const {
  addSeries,
  updateSeries,
  deleteSeries,
  getAllSeries,
} = require("../../controllers/Admin.controller/Series.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { Roles, roleCheck } = require("../../middleware/verifyRole.middleware");
const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

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
  upload.single("profile"),
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("name", "Name is Required").isString().notEmpty(),
    body("description", "Description is Required").isString().notEmpty(),
  ],
  addSeries
);

router.put(
  "/update/:id",
  upload.single("profile"),
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("name", "Name is Required").isString().notEmpty(),
    body("description", "Description is Required").isString().notEmpty(),
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  updateSeries
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
  deleteSeries
);

router.get(
  "/getAllSeries",
  authMiddleware,
  roleCheck(Roles.admin),
  getAllSeries
);

module.exports = router;
