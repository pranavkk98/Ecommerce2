const Product = require("../../models/Product.model");
const { validationResult } = require("express-validator");
const { streamUpload, fileDelete } = require("../../utils/cloudFile");

const addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const { name, description, quantity, price, discountPrice, series } =
      req.body;
    let productToAdd = new Product({
      name,
      description,
      quantity,
      price,
      discountPrice,
      series,
    });
    const myProduct = await productToAdd.save();
    return res.status(200).json({ info: myProduct._id, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const addProductImages = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    let update = await Product.findById(req.params.id);
    if (!update) {
      return res
        .status(404)
        .json({ info: "Product does not exist", type: "error" });
    }
    if (req.files) {
      let uploadRes = await Promise.all(
        req.files.map((img) => {
          return streamUpload(img.buffer, "productImg");
        })
      );
      uploadRes.forEach((item) => {
        update.image.push({
          imgUrl: item.secure_url,
          publicId: item.public_id,
        });
      });
    }
    await update.save();
    return res
      .status(200)
      .json({ info: "Images Uploaded Successfully", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const { name, description, quantity, price, discountPrice, series } =
      req.body;
    let updatePro = await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      quantity,
      price,
      discountPrice,
      series,
    });
    if (!updatePro) {
      return res
        .status(404)
        .json({ info: "Product does not exist", type: "error" });
    }
    return res.status(200).json({ info: "Product Updated", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    let del = await Product.findByIdAndDelete(req.params.id);
    if (!del) {
      return res
        .status(404)
        .json({ info: "Product does not exist", type: "error" });
    }
    if (del.image) {
      await Promise.all(
        del.image.map((img) => {
          return fileDelete(img.publicId);
        })
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = { addProduct, addProductImages, updateProduct, deleteProduct };
