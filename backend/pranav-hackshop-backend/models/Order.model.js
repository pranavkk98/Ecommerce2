const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  orderStatus: {
    type: String,
    enum: [
      "ORDER_CREATED",
      "ORDER_ACCEPTED",
      "ORDER_DISPATCHED",
      "ORDER_DELIVERED",
      "ORDER_REJECTED",
    ],
    default: "ORDER_CREATED",
  },
  paymentStatus: {
    type: String,
    enum: ["PAYMENT_SUCCESS", "PAYMENT_FAILED", "PAYMENT_PENDING"],
    default: "PAYMENT_PENDING",
  },
  paymentData: {
    type: Object,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  deliverySpeed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  trackingId: {
    type: String,
  },
  rzpOrderId: {
    type: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
