const pool = require("../config/db");

const getAllProducts = async () => {
    const result = await pool.query("SELECT * FROM products");

    return result.rows;
};

const getProductById = async (id) => {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    return result.rows[0];
};

const addProduct = async (product) => {
    const { name, price, stock } = product;
    const result = await pool.query("INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *", [name, price, stock]);

    return result.rows[0];
};

const updateProduct = async (id, product) => {
    const { name, price, stock } = product;
    const result = await pool.query(
        `UPDATE products
        SET name=$1, price=$2, stock=$3 WHERE id=$4 RETURNING *`, [name, price, stock, id]
    );

    return result.rows[0];
};

const deleteProduct = async (id) => {
    const result = await pool.query(
        `DELETE FROM products WHERE id=$1 RETURNING *`, [id]
    );

    return result.rows[0];
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };