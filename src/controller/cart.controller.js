const cartService = require("../services/cart.services");
const { sendSuccess, sendError } = require("../utils/response.utils");

const addToCart = (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        const cart = cartService?.addToCart({ productId, quantity});
        return sendSuccess(res, cart, 200, "Item added to cart.");
    } catch (error) {
        next(error);
    }
};

const getCart = (req, res, next) => {
    try {
        const cart = cartService?.getCart();
        const total = cartService?.calculateTotal();
        console.log("total:", total);

        return sendSuccess(res, { items: cart, total: total });
    } catch (error) {
        next(error);
    }
};

const removeItem = (req, res, next) => {
    try {
        const id = parseInt(req?.params?.id);
        const cart = cartService?.removeItem(id);

        return sendSuccess(res, cart, 200, "Item Removed");
    } catch (error) {
        next(error);
    }
};

module.exports = { addToCart, getCart, removeItem };