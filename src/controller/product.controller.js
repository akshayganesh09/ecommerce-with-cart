const productService = require("../services/product.services");
const { sendSuccess, sendError } = require("../utils/response.utils");

const getAllProducts = async (req, res, next) => {
    try {
        const page = (req.query.page) || 1;
        const limit = (req.query.limit) || 5;

        const filters = {
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            sort: req.query.sort
        };

        const result = await productService.getAllProducts(page, limit, filters);

        return sendSuccess(res, result);
    } catch (error) {
        next(error);
    } 
};

const getProductById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productService.getProductById(id);

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

const addProduct = async (req, res, next) => {
    try {
        const { name, price, stock } = req?.body;
        const product = await productService.addProduct({ name, price, stock });

        sendSuccess(res, product, 201, "Created successfully");
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, price, stock } = req?.body;
        const product = await productService.updateProduct(id, { name, price, stock });

        if(!product) {
            return sendError(res, 404, "Product not found");
        }

        sendSuccess(res, product, 200, "Updated successfully");
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productService.deleteProduct(id);

        if(!product) {
            return sendError(res, 404, "Product not found");
        }

        sendSuccess(res, product, 200, `Product- ${id}, Deleted successfully`);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };