const Address = require("../models/Address.model");
const { validationResult } = require("express-validator");

const addAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { addressLineOne, addressLineTwo, landmark, city, state, pincode } =
      req.body;

    let addressToAdd = new Address({
      user: req.user._id,
      addressLineOne,
      addressLineTwo,
      landmark,
      city,
      state,
      pincode,
    });
    await addressToAdd.save();
    return res.status(200).json({ info: "Address Added", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const addressId = req.params.id;

    const { addressLineOne, addressLineTwo, landmark, city, state, pincode } =
      req.body;

    let updateAddress = await Address.findByIdAndUpdate(addressId, {
      addressLineOne,
      addressLineTwo,
      landmark,
      city,
      state,
      pincode,
      lastUpdate: Date.now(),
    });
    if (!updateAddress) {
      return res
        .status(400)
        .json({ info: "Address Does Not Exist", types: "data" });
    }
    return res.status(200).json({ info: "Address Updated", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const addressId = req.params.id;

    let del = await Address.findByIdAndDelete(addressId);
    if (!del) {
      return res
        .status(404)
        .json({ info: "Address Does Not Exist", types: "data" });
    }

    return res
      .status(200)
      .json({ info: "Address Deleted Successfully", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const getAddresses = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const addresses = await Address.find({ user: req.user._id });

    return res.status(200).json({ info: addresses, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = { addAddress, updateAddress, deleteAddress, getAddresses };
