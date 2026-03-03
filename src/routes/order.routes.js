const express = require("express");
const router = express.Router();

const controller = require("../controller/orders.controller");

router.post("/", controller.createOrders);

module.exports = router;