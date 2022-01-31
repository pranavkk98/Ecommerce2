const Series = require("../../models/Series.model");
const Product = require("../../models/Product.model");
const { validationResult } = require("express-validator");
const { streamUpload, fileDelete } = require("../../utils/cloudFile");

const addSeries = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const { name, description } = req.body;
    let sr = {
      name,
      description,
    };
    if (req.file) {
      let uploadRes = await streamUpload(req.file.buffer, "seriesImg");
      sr.image = uploadRes.secure_url;
      sr.imagePublicId = uploadRes.public_id;
    }

    let seriesToAdd = new Series(sr);
    await seriesToAdd.save();
    return res.status(200).json({ info: "Series Added", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const updateSeries = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const seriesId = req.params.id;
    let { name, description, isActive } = req.body;
    if (!isActive) {
      isActive = false;
    }
    let update = {
      name,
      description,
      isActive,
      lastUpdate: Date.now(),
    };
    if (req.file) {
      let uploadRes = await streamUpload(req.file.buffer, "seriesImg");
      update.image = uploadRes.secure_url;
      update.imagePublicId = uploadRes.public_id;
    }
    let updateSer = await Series.findByIdAndUpdate(seriesId, update);
    if (!updateSer) {
      return res
        .status(404)
        .json({ info: "Series Does Not Exist", type: "error" });
    }
    if (updateSer.imagePublicId !== "defaultImage") {
      await fileDelete(updateSer.imagePublicId);
    }
    return res
      .status(200)
      .json({ info: "Series Updated Successfully", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const deleteSeries = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }
    const seriesId = req.params.id;
    let products = await Product.find({ series: seriesId });
    let deleteImages = [];
    if (products.length) {
      deleteImages = products.map((item) => {
        return item.image.map((ele) => {
          return ele.publicId;
        });
      });
    }
    deleteImages = deleteImages.flat();
    let del = await Promise.all([
      Series.findByIdAndDelete(seriesId),
      Product.deleteMany({ series: seriesId }),
      Promise.all(
        deleteImages.map((id) => {
          return fileDelete(id);
        })
      ),
    ]);
    //let del = await Series.findByIdAndDelete(seriesId);
    if (!del[0]) {
      return res
        .status(404)
        .json({ info: "Series does not exist", type: "error" });
    }
    if (del[0].imagePublicId !== "defaultImage") {
      await fileDelete(del[0].imagePublicId);
    }
    return res
      .status(200)
      .json({ info: "Series Deleted Successfully", type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

const getAllSeries = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ info: errors.array(), type: "error" });
    }

    const series = await Series.find({});

    return res.status(200).json({ info: series, type: "data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ info: "Internal Server Error", type: "error" });
  }
};

module.exports = { addSeries, updateSeries, deleteSeries, getAllSeries };
