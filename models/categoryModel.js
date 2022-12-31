const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "Name must be unique"],
  },
  description: { type: String, required: [true, "Description is required"] },
  products: [{ type: Schema.Types.ObjectId, ref: "product" }],
});

categorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
