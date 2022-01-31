const express = require("express");
const router = express.Router();

const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const {
  getCategories,
  getProduct,
} = require("../controllers/Public.controller");

router.get("/getCategories", getCategories);

router.get(
  "/getProduct/:id",
  [
    param("id").custom((val, { req }) => {
      if (!ObjectId.isValid(val)) {
        return Promise.reject("Invalid Ojbect Id");
      }
      return true;
    }),
  ],
  getProduct
);

module.exports = router;
