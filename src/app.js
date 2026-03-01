const express = require("express");

// Middlewares
const errorHandler = require("./middleware/error.middleware");
const pageNotFound = require("./middleware/notfound.middleware");

// Routers
const productRouter = require("./routes/products.routes");
const cartRouter = require("./routes/cart.routes");

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);

app.use(errorHandler);
app.use(pageNotFound);

module.exports = app;