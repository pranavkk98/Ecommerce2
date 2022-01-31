const Razorpay = require("razorpay");
const { razorpayKeyId, razorpayKeySecret } = require("../config/keys");

const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const CartItem = require("../models/CartItem.model");
const Delivery = require("../models/DeliverySpeed.model");

const { validationResult } = require("express-validator");

const generateOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const myCart = await Cart.findOne({ user: req.user._id });
    const { addressId, deliverySpeedId } = req.body;

    let products = await Promise.all(
      myCart.cartItems.map((item) => {
        return CartItem.findById(item);
      })
    );

    products = products.filter((product) => product);

    products = products.map((item) => {
      return {
        product: item.product,
        quantity: item.quantity,
        amount: item.totalPrice,
      };
    });

    let orderTotal = products.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );

    let deliverySpeed = await Delivery.findById(deliverySpeedId);
    orderTotal += deliverySpeed.price;

    let orderToGenerate = new Order({
      user: req.user._id,
      products,
      address: addressId,
      orderTotal,
      deliverySpeed: deliverySpeedId,
    });

    const order = await orderToGenerate.save();

    return res.status(200).json({ info: order._id, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const paymentOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const { id } = req.params;

    let myOrder = await Order.findById(id);

    if (!myOrder) {
      return res.status(404).json({ info: "Order Not Found", type: "error" });
    }

    let options = {
      amount: myOrder.orderTotal * 100,
      currency: "INR",
      receipt: id,
    };

    let rzpOrder = await razorpay.orders.create(options);

    myOrder.rzpOrderId = rzpOrder.id;
    await myOrder.save();

    return res.status(200).json({
      info: { key_id: razorpayKeyId, id: rzpOrder.id },
      type: "data",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const captureOrder = async (req, res) => {
  try {
    const { order_id } = req.body.payload.payment.entity;
    let order = await Order.findOne({ rzpOrderId: order_id });

    if (!order) {
      return res.status(404).send("404 Not Found");
    }

    if (req.body.event === "payment.captured") {
      order.paymentStatus = "PAYMENT_SUCCESS";
    } else if (req.body.event === "payment.failed") {
      order.paymentStatus = "PAYMENT_FAILED";
    }
    order.paymentData = req.body;
    await order.save();
    return res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const orderId = req.params.id;

    let myOrder = await Order.findById(orderId)
      .populate({
        path: "products",
        populate: { path: "product" },
      })
      .populate({
        path: "address",
      })
      .populate({
        path: "deliverySpeed",
      });

    if (!myOrder) {
      return res.status(404).json({ info: "Order not found", type: "error" });
    }
    return res.status(200).json({ info: myOrder, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const orderId = req.params.id;

    const myOrder = await Order.findByIdAndDelete(orderId);

    if (!myOrder) {
      return res.status(404).json({ info: "Order Not Found", type: "error" });
    }

    return res
      .status(200)
      .json({ info: "Order deleted Successfully", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const getYourOrders = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const userId = req.user._id;

    const myOrders = await Order.find({ user: userId }).populate({
      path: "products",
      populate: { path: "product" },
    });

    return res.status(200).json({ info: myOrders, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const orders = await Order.find({}).populate({
      path: "deliverySpeed",
    });

    return res.status(200).json({ info: orders, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = {
  generateOrder,
  paymentOrder,
  captureOrder,
  getOrder,
  deleteOrder,
  getYourOrders,
  getAllOrders,
};
