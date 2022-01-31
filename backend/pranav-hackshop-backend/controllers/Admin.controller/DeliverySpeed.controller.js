const Delivery = require("../../models/DeliverySpeed.model");
const { validationResult } = require("express-validator");

const addDeliverySpeed = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const { name, speed, price, partner } = req.body;

    let deliverSpeedToAdd = new Delivery({
      name,
      speed,
      price,
      partner,
    });
    await deliverSpeedToAdd.save();
    return res.status(200).json({ info: "Delivery Speed Added", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const updateDeliverySpeed = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const { name, speed, price, partner } = req.body;

    let delId = req.params.id;

    let updateDel = await Delivery.findByIdAndUpdate(delId, {
      name,
      speed,
      price,
      partner,
      lastUpdate: Date.now(),
    });
    if (!updateDel) {
      return res
        .status(404)
        .json({ info: "Delivery Speed Does Not Exist", type: "error" });
    }
    return res
      .status(200)
      .json({ info: "Delivery Speed Updated", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const deleteDeliverySpeed = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const delId = req.params.id;

    let del = await Delivery.findByIdAndDelete(delId);

    if (!del) {
      return res
        .status(404)
        .json({ info: "Delivery Speed Does Not Exist", type: "error" });
    }
    return res
      .status(200)
      .json({ info: "Delivery Speed Deleted Successfully", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = { addDeliverySpeed, updateDeliverySpeed, deleteDeliverySpeed };
