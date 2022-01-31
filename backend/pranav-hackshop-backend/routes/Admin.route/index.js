const express = require("express");
const router = express.Router();

const categoryRoute = require("./Category.route");
const seriesRoute = require("./Series.route");
const deliverySpeedRoute = require("./DeliverySpeed.route");
const productRoute = require("./Product.route");

router.use("/category", categoryRoute);
router.use("/series", seriesRoute);
router.use("/deliverySpeed", deliverySpeedRoute);
router.use("/product", productRoute);

module.exports = router;
