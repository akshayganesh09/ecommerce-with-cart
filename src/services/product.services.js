const products = require("../data/product");

const getAllProducts = () => {
    return products;
};

const getProductById = (id) => {
    return products?.find((item) => item.id === id);
}

const addProduct = (product) => {
    const newProduct = {
        id: products?.length + 1,
        ...product
    };

    return newProduct;
}

module.exports = { getAllProducts, getProductById, addProduct };