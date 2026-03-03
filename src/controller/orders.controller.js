const pool = require("../config/db");
const { sendSuccess, sendError } = require("../utils/response.utils");

const createOrders = async (req, res, next) => {
    const { productId, quantity } = req.body;

    try {
        const client = await pool.connect();
        // Initiate the changes in DB.
        await client.query('BEGIN');
        // Insert the product to cart.
        await client.query("INSERT INTO orders (product_id, quantity) VALUES ($1, $2)", [productId, quantity])
        // Update the products table.
        await client.query("UPDATE products SET stock = stock - $1 WHERE id=$2", [quantity, productId]);
        // Commit the changes in DB.
        await client.query("COMMIT");

        return sendSuccess(res, {}, 200, "Item added to cart.");
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrders };