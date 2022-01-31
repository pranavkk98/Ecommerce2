const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: [
    {
      imgUrl: {
        type: String,
        default:
          "https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png",
      },
      publicId: {
        type: String,
        default: "defaultImage",
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Series",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  lastUpdate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
