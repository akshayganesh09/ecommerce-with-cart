const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controller/cart.controller");


router.get("/", getCart);
router.post("/", addToCart);
// router.delete("/:id", );

module.exports = router;