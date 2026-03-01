const express = require("express");
const productRouter = require("./routes/products.routes");
const errorHandler = require("./middleware/error.middleware");
const pageNotFound = require("./middleware/notfound.middleware");

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRouter);

app.use(errorHandler);
app.use(pageNotFound);

module.exports = app;