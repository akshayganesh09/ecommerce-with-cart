const joi = require("joi");

const getProductSchema = joi.object({
    page: joi.number().integer().min(1).optional(),
    limit: joi.number().integer().min(1).max(100).optional(),
    minPrice: joi.number().min(0).optional(),
    maxPrice: joi.number().min(0).optional(),
    sort: joi.string().valid("price", "-price", "name", "-name").optional()
});

module.exports = { getProductSchema };