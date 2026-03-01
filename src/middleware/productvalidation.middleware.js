const validateProduct = (req, res, next) => {
    const allowedKeys = ["name", "price"];
    const incomingKeys = Object.keys(req.body);

    const hasExtraKeys = incomingKeys.some((item) => !allowedKeys.includes(item));

    if (hasExtraKeys) {
        return res.status(400).json({
            message: "Invalid payload: Extra fields are not allowed.",
        });
    }

    const { name, price } = req?.body;

    if (!name || typeof name !== "string") {
        return res.status(400).json({
            message: "Product name is required and must be a string",
        });
    };

    if (!price || typeof price !== "number") {
        return res.status(400).json({
            message: "Price is required and must be a number",
        });
    };

    next();
};

module.exports = validateProduct;