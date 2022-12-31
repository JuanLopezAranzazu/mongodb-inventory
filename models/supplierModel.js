const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  phone: {
    type: String,
    validate: {
      validator: (phone) => /^\d+$/.test(phone),
      message: "Incorrect or missing phone",
    },
  },
  url: { type: String },
  cloudinary_id: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: "product" }],
});

supplierSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const Supplier = mongoose.model("supplier", supplierSchema);

module.exports = Supplier;
