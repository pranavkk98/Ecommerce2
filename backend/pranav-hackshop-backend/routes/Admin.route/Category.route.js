const express = require("express");
const {
  addCategory,
  updateCategory,
  deleteCategory,
  addProducts,
} = require("../../controllers/Admin.controller/Category.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { Roles, roleCheck } = require("../../middleware/verifyRole.middleware");
const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("name", "Name is Required").isString().notEmpty(),
    body("description", "Description is Required").isString().notEmpty(),
  ],
  addCategory
);

router.put(
  "/update/:id",
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
  updateCategory
);

router.put(
  "/addProduct/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("categoryIds").custom((val, { req }) => {
      for (let i of val) {
        if (!ObjectId.isValid(i)) {
          return Promise.reject("Invalid Object Id");
        }
        return true;
      }
    }),
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  addProducts
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
  deleteCategory
);

module.exports = router;
