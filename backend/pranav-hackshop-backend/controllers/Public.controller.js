const Category = require("../models/Category.model");
const Product = require("../models/Product.model");
const { validationResult } = require("express-validator");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate({
      path: "products",
    });
    return res.status(200).json({ info: categories, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { id } = req.params;

    var product = await Product.findById(id)
      .populate({
        path: "series",
      })
      .lean();
    if (!product) {
      return res
        .status(404)
        .json({ info: "Product not found.", type: "error" });
    }

    const cat = await Category.find({});
    product.categories = [];
    cat.forEach((item) => {
      if (item.products.indexOf(id) !== -1) {
        product.categories.push({
          name: item.name,
          id: item._id,
        });
      }
    });
    return res.status(200).json({
      info: product,
      type: "data",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = { getCategories, getProduct };
