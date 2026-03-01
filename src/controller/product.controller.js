const productService = require("../services/product.services");
const { sendSuccess, sendError } = require("../utils/response.utils");

const getAllProducts = (req, res, next) => {
    try {
        const products = productService.getAllProducts();
        sendSuccess(res, products);
    } catch (error) {
        next(error);
    } 
};

const getProductById = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const product = productService.getProductById(id);

        if (isNaN(id)) {
            return sendError(res, 400, "Invalid ID format. Must be a number.");
        }

        if(!product) {
            return sendSuccess(res, [], 200);
        }

        sendSuccess(res, product);
    } catch (error) {
        next(error);
    } 
};

const addProduct = (req, res, next) => {
    try {
        const { name, price } = req?.body
        const product = productService.addProduct({ name, price });

        sendSuccess(res, product, 201, "Created successfully");
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllProducts, getProductById, addProduct };