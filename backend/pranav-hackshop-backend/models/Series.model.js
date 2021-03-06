const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://www.sitepronews.com/wp-content/uploads/2014/02/logo-icon.png",
  },
  imagePublicId: {
    type: String,
    default: "defaultImage",
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("Series", seriesSchema, "series");
