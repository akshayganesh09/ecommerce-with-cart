const express = require("express");

// Middlewares
const errorHandler = require("./middleware/error.middleware");
const pageNotFound = require("./middleware/notfound.middleware");

// Routers
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/products.routes");
const ordersRouter = require("./routes/order.routes");
const cartRouter = require("./routes/cart.routes");

const { getProductSchema } = require("./validations/productValidation");

const schemaValidation = require("./middleware/schemaValidation.middleware");

const app = express();

app.use(express.json());

const BASE_URL ="/api/v1";

process.env.JWT_SECRET = "supersecretkey";
process.env.JWT_EXPIRES_IN = "1h";

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/products`, schemaValidation(getProductSchema), productRouter);
app.use(`${BASE_URL}/orders`, ordersRouter);
app.use(`${BASE_URL}/cart`, cartRouter);

app.use(errorHandler);
app.use(pageNotFound);

module.exports = app;