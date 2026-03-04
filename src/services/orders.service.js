const pool = require("../config/db");
const AppError = require("../utils/appError.utils");

const createOrders = async (productId, quantity) => {
        const client = await pool.connect();

        console.log("Client: ", client);
        console.log("Id: ", productId, "Quantity: ", quantity);

    try {
        // Initiate the changes in DB.
        await client.query('BEGIN');

        //Lock the item if stock less than the quantity.
        const productResult = await client.query(
            "SELECT stock FROM products WHERE id=$1 FOR UPDATE", [productId]
        ); //This is called pessimistic locking.

        // Check if products table has any row with the selected Id.
        if (productResult.rows.length === 0) {
            throw new AppError('Product not found', 404);
        }

        // Assign the current stock value to a variable.
        const currentStock = productResult.rows[0].stock;

        if (currentStock < quantity) {
            throw new AppError('In sufficiant stock', 400);
        }

        // Update the products table.
        await client.query("UPDATE products SET stock = stock - $1 WHERE id=$2", [quantity, productId])

        // Insert the product to cart.
        await client.query("INSERT INTO orders (product_id, quantity) VALUES ($1, $2)", [productId, quantity])
;
        // Commit the changes in DB.
        await client.query("COMMIT");

        return { message: 'Order placed successfully' };
    } catch (error) {
        client.query("ROLLBACK");
        throw error;
    } finally {
        client.release()
    }
};

module.exports = { createOrders };