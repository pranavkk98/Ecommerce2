const Category = require("../../models/Category.model");
const Product = require("../../models/Product.model");
const { validationResult } = require("express-validator");

const addCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { name, description } = req.body;

    let categoryToAdd = new Category({
      name,
      description,
      products: [],
    });
    await categoryToAdd.save();
    return res.status(200).json({ info: "Category Added", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const categoryId = req.params.id;
    let { name, description, isActive } = req.body;
    if (!isActive) {
      isActive = false;
    }
    let update = {
      name,
      description,
      isActive,
      lastUpdate: Date.now(),
    };
    let updatedCat = await Category.findByIdAndUpdate(categoryId, update);
    if (!updatedCat) {
      return res
        .status(404)
        .json({ info: "Category Does Not Exist", type: "error" });
    }
    return res
      .status(200)
      .json({ info: "Category Updated Successfully", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const addProducts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const productId = req.params.id;
    const { categoryIds } = req.body;

    const product = Product.findById(productId);
    if (!product) {
      return res.status(404).json({ info: "Product not found", type: "error" });
    }
    let categories = await Promise.all(
      categoryIds.map((categoryId) => {
        return Category.findById(categoryId);
      })
    );
    categories.forEach((category) => {
      if (!category) {
        return res
          .status(404)
          .json({ info: "One or more category ids invalid", type: "error" });
      }
      category.products.push(productId);
    });
    await Promise.all(
      categories.map((category) => {
        return category.save();
      })
    );
    return res
      .status(200)
      .json({ info: "Product added to categories", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const categoryId = req.params.id;
    let del = await Category.findByIdAndDelete(categoryId);
    if (!del) {
      return res
        .status(404)
        .json({ info: "Category does not exist", type: "error" });
    }
    return res
      .status(200)
      .json({ info: "Category Deleted Successfully", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = { addCategory, updateCategory, deleteCategory, addProducts };
