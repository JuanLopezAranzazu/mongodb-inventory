const express = require("express");
const supplierRouter = express.Router();
// models
const Supplier = require("./../models/supplierModel");
// cloudinary
const cloudinary = require("./../tools/configImage");
const uploadImage = require("./../tools/uploadImage");

supplierRouter.get("/", async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({}).populate("products");
    res.json({ data: suppliers });
  } catch (error) {
    next(error);
  }
});

supplierRouter.post(
  "/",
  uploadImage.single("image"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const result = await cloudinary.uploader.upload(req.file.path);
      const newSupplier = new Supplier({
        ...body,
        url: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await newSupplier.save();
      res.status(201).json({ data: newSupplier });
    } catch (error) {
      next(error);
    }
  }
);

supplierRouter.put(
  "/:id",
  uploadImage.single("image"),
  async (req, res, next) => {
    try {
      const { body, params } = req;
      let supplier = await Supplier.findById(params.id);
      if (!supplier) {
        throw new Error(`Supplier id #${params.id} not found`);
      }
      await cloudinary.uploader.destroy(supplier.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);
      const dataForSupplier = {
        name: body.name || suplier.name,
        email: body.email || supplier.email,
        phone: body.phone || supplier.phone,
        url: result.secure_url || supplier.url,
        cloudinary_id: result.public_id || supplier.cloudinary_id,
        products: supplier.products,
      };
      supplier = await Supplier.findByIdAndUpdate(params.id, dataForSupplier, {
        new: true,
      });
      res.json({ data: supplier });
    } catch (error) {
      next(error);
    }
  }
);

supplierRouter.delete("/:id", async (req, res, next) => {
  try {
    const { params } = req;
    const supplier = await Supplier.findById(params.id);
    if (!supplier) {
      throw new Error(`Supplier id #${params.id} not found`);
    }
    await cloudinary.uploader.destroy(image.cloudinary_id);
    await supplier.remove();
    res.status(204).json({ data: supplier });
  } catch (error) {
    next(error);
  }
});

module.exports = supplierRouter;
