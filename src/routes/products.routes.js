const express = require("express");
const router = express.Router();
const controller = require("../controller/product.controller");
const validateProduct = require("../middleware/productvalidation.middleware");

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.post("/", validateProduct, controller.addProduct);

module.exports = router;