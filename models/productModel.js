const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: (name) => name.length > 2,
      message: "Name is too short",
    },
  },
  price: { type: Number, required: [true, "Price is required"] },
  quantity: { type: Number },
  supplier: { type: Schema.Types.ObjectId, ref: "supplier" },
  category: { type: Schema.Types.ObjectId, ref: "category" },
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
