const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart.controller");


router.get("/", cartController?.getCart);
router.post("/", cartController?.addToCart);
router.delete("/:id", cartController?.removeItem);

module.exports = router;