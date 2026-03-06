const pool = require("../config/db");

const getAllProducts = async (page = 1, limit = 10, filter = {}) => {
    console.log("filter: ", filter);
    const offSet = (page - 1) * limit;

    let query = `SELECT * FROM products`;
    const condition = [];
    const values = [];

    let index = 1;

    // Filter with minPrice.
    if (filter.minPrice) {
        condition.push(`price >= $${index}`);
        values.push(filter.minPrice);
        index++;
    };

    // Filter with maxPrice.
    if (filter.maxPrice) {
        condition.push(`price <= $${index}`);
        values.push(filter.maxPrice);
        index++;
    }

    //Check if any condition exist.
    if (condition?.length > 0) {
        query = query + ` WHERE ` + condition.join(" AND ");
    }

    // Sorting.
    if (filter.sort) {
        console.log(filter.sort)
        const order = filter.sort.startsWith("-") ? "DESC" :"ASC";
        const field = filter.sort.replace("-", "");

        query = query + ` ORDER BY ${field} ${order}`;
    } else {
        query = query + ` ORDER BY id`;
    }

    // Pagenation.
    query = query + ` LIMIT $${index} OFFSET $${index + 1}`;
    values.push(limit, offSet);

    // Apply the query and values to fetch the data from the Table.
    const result = await pool.query(query, values);

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