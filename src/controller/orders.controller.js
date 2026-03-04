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

const getOrderList = async (req, res, next) => {
    try {
        const result = await orderService.getOrderList();
        return sendSuccess(res, result, 200, "Success");
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrders, getOrderList };