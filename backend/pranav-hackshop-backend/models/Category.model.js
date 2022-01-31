const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  created: {
    type: Date,
    default: Date.now(),
  },
  lastUpdate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Category", categorySchema);
