const Cart = require("../models/Cart.model");
const CartItem = require("../models/CartItem.model");
const Product = require("../models/Product.model");
const Delivery = require("../models/DeliverySpeed.model.js");

const { validationResult } = require("express-validator");

const addCartItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { product, quantity, totalPrice } = req.body;
    const { id } = req.params;

    let cartItemToAdd = new CartItem({ product, quantity, totalPrice });
    const addedItem = await cartItemToAdd.save();

    let myCart = await Cart.findOne({ user: id });
    if (!myCart) {
      return res.status(404).json({ info: "User not found", type: "error" });
    }
    await Cart.findOneAndUpdate(
      { user: id },
      {
        cartItems: [...myCart.cartItems, addedItem._id],
        updatedOn: Date.now(),
      }
    );
    return res
      .status(200)
      .json({ info: "Cart Item Added Successfully", type: "error" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { itemId, quantity, totalPrice } = req.body;
    const { id } = req.params;

    let myCart = await Cart.findOneAndUpdate(
      { user: id },
      {
        lastUpdate: Date.now(),
      }
    );
    if (!myCart) {
      return res.status(404).json({ info: "Cart Not Found", type: "error" });
    }
    let myItem = await CartItem.findByIdAndUpdate(itemId, {
      quantity,
      totalPrice,
    });
    if (!myItem) {
      return res.status(404).json({ info: "Item Not Found", type: "error" });
    }
    return res
      .status(200)
      .json({ info: "Cart Item Updated Successfully", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { itemId } = req.body;
    const { id } = req.params;

    let myCart = await Cart.findOne({ user: id });
    if (!myCart) {
      return res.status(404).json({ info: "Cart Not Found", type: "error" });
    }
    await Cart.findOneAndUpdate(
      { user: id },
      {
        cartItems: myCart.cartItems.filter((item) => item !== itemId),
        lastUpdate: Date.now(),
      }
    );
    let myItem = await CartItem.findByIdAndDelete(itemId);
    if (!myItem) {
      return res.status(404).json({ info: "Item Not Found", type: "error" });
    }
    return res
      .status(200)
      .json({ info: "Cart Item Deleted Successfully", type: "error" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const getCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    let myCart = await Cart.findOne({ user: req.user._id }).populate({
      path: "cartItems",
    });

    let products = await Promise.all(
      myCart.cartItems.map((item) => {
        return Product.findById(item.product);
      })
    );

    products = products.map((product) => {
      return {
        name: product.name,
        image: product.image.length
          ? product.image[0].imgUrl
          : "https://i5.walmartimages.com/asr/4add4de6-7b92-4846-8316-b7a0cbec4dc7_1.8e2f7305081b9284e56d112fe146dc90.png",
      };
    });

    return res
      .status(200)
      .json({ info: { cart: myCart, products: products }, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const getDeliverySpeeds = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const deliverySpeeds = await Delivery.find({}).sort({
      price: -1,
    });

    return res.status(200).json({ info: deliverySpeeds, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = {
  addCartItem,
  updateCartItem,
  deleteCartItem,
  getCart,
  getDeliverySpeeds,
};
