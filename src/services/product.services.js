const pool = require("../config/db");

const getAllProducts = async (page = 1, limit = 10) => {
    const offSet = (page - 1) * limit;
    const result = await pool.query("SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2", [limit, offSet]);

    const countResult = await pool.query("SELECT COUNT(*) FROM products");

    const total = parseInt(countResult.rows[0]?.count);
    const totalPage = Math.ceil(total/limit); 

    return {
        products: result.rows,
        meta: {
            page,
            limit,
            total,
            totalPage
        }
    };
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