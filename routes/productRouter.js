const express = require("express");
const productRouter = express.Router();
// models
const Product = require("./../models/productModel");
const Supplier = require("./../models/supplierModel");
const Category = require("./../models/categoryModel");

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("supplier", "category");
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    // find supplier
    const supplier = await Supplier.findById(body.supplier);
    if (!supplier) {
      throw new Error(`Supplier id #${body.supplier} not found`);
    }
    // find category
    const category = await Category.findById(body.category);
    if (!category) {
      throw new Error(`Category id #${body.category} not found`);
    }
    const newProduct = new Product(body);
    supplier.products.push(newProduct);
    supplier.save();
    category.products.push(newProduct);
    category.save();
    // create product
    await newProduct.save();
    res.status(201).json({ data: newProduct });
  } catch (error) {
    next(error);
  }
});

// update product
productRouter.put("/:id", async (req, res, next) => {
  try {
    const { body, params } = req;
    // find product
    let product = await Product.findById(params.id);
    if (!product) {
      throw new Error(`Product id #${params.id} not found`);
    }
    if (body.supplier) {
      // find supplier
      const supplier = await Supplier.findById(body.supplier);
      if (!supplier) {
        throw new Error(`Supplier id #${body.supplier} not found`);
      }
      await Supplier.findByIdAndUpdate(product.supplier, {
        $pull: { products: product },
      });
      supplier.push(product);
      supplier.save();
    }
    if (body.category) {
      // find category
      const category = await Category.findById(body.category);
      if (!category) {
        throw new Error(`Category id #${body.category} not found`);
      }
      await Category.findByIdAndUpdate(product.category, {
        $pull: { products: product },
      });
      category.push(product);
      category.save();
    }
    const dataForProduct = {
      name: body.name || product.name,
      price: body.price || product.price,
      quantity: body.quantity || product.quantity,
      category: body.category || product.category,
      supplier: body.supplier || product.supplier,
    };
    product = await Product.findByIdAndUpdate(params.id, dataForProduct, {
      new: true,
    });
    res.status(201).json({ data: product });
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const { params } = req;
    const product = await Product.findById(params.id);
    if (!product) {
      throw new Error(`Product id #${params.id} not found`);
    }
    await product.remove();
    res.status(204).json({ data: product });
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;
