const supplierRouter = require("./supplierRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");

function routes(app) {
  app.use("/api/v1/suppliers", supplierRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/categories", categoryRouter);
}

module.exports = routes;
