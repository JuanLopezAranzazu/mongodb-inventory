const express = require("express");
const categoryRouter = express.Router();
// models
const Category = require("./../models/categoryModel");

// find all categories
categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find({}).populate("products");
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
});

// find by filter
categoryRouter.get("/filter", async (req, res, next) => {
  try {
    const { body } = req;
    const { array_name } = body;
    const dataForFilter = array_name.map((item) => {
      return {
        name: item,
      };
    });
    const categories = await Category.find({ $or: dataForFilter }).populate(
      "products"
    );
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
});

categoryRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const newCategory = new Category(body);
    await newCategory.save();
    res.status(201).json({ data: newCategory });
  } catch (error) {
    next(error);
  }
});

categoryRouter.put("/:id", async (req, res, next) => {
  try {
    const { body, params } = req;
    let category = await Category.findById(params.id);
    if (!category) {
      throw new Error(`Category id #${params.id} not found`);
    }
    const dataForCategory = {
      name: body.name || category.name,
      description: body.description || category.description,
      products: category.products,
    };
    category = await Category.findByIdAndUpdate(params.id, dataForCategory, {
      new: true,
    });
    res.status(201).json({ data: category });
  } catch (error) {
    next(error);
  }
});

categoryRouter.delete("/:id", async (req, res, next) => {
  try {
    const { params } = req;
    const category = await Category.findById(params.id);
    if (!category) {
      throw new Error(`Category id #${params.id} not found`);
    }
    await category.remove();
    res.status(204).json({ data: category });
  } catch (error) {
    next(error);
  }
});

module.exports = categoryRouter;
