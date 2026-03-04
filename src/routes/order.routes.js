const express = require("express");
const router = express.Router();

const controller = require("../controller/orders.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, controller.getOrderList);
router.post("/", protect, controller.createOrders);

module.exports = router;