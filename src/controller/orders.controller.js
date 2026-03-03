const orderService = require("../services/orders.service");
const { sendSuccess } = require("../utils/response.utils");

const createOrders = async (req, res, next) => {
    const { productId, quantity } = req.body;

    try {
        const result = await orderService.createOrders(productId, quantity);
        return sendSuccess(res, {}, 201, result?.message ||"Item added to cart.");
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrders };