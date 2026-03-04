const express = require("express");
const router = express.Router();
const controller = require("../controller/product.controller");
const validateProduct = require("../middleware/productvalidation.middleware");

const { protect, restrictTo } = require("../middleware/auth.middleware");

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.post("/", protect, restrictTo('admin'), validateProduct, controller.addProduct);
router.put("/:id", protect, restrictTo('admin'), validateProduct, controller.updateProduct);
router.delete("/:id", protect, restrictTo('admin'), controller.deleteProduct);

module.exports = router;