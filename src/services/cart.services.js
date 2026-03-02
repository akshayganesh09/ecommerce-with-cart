const productService = require("../services/product.services");

let cart = [];

const addToCart = (payload) => {
    const product = productService?.getProductById(payload?.productId);

    if(!product) {
        throw new Error("Product does not exist");
    }

    const existingItem = cart?.find(item => item.id === payload?.productId);

    if (existingItem) {
        existingItem.quantity += payload?.quantity;
    } else {
        cart?.push({
            id: product?.id,
            name: product?.name,
            price: product?.price,
            quantity: payload?.quantity
        });
    }

    return cart;
};

const getCart = () => {
    return cart;
}

const calculateTotal = () => {
    const total = cart?.reduce((total, item) => {
        return total + item?.quantity * item?.price
    }, 0);

    return total;
};

const removeItem = (id) => {
    const newCart = cart?.filter((item) => item.id !== Number(id));
    cart = newCart;

    return cart;
};

module.exports = { addToCart, getCart, calculateTotal, removeItem };