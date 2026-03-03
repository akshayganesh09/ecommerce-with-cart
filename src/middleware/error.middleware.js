const { sendError } = require("../utils/response.utils");

const errorHandler = (err, req, res, next) => {
    console.log(err);

    // Check for custom error class message with status code.
    if (err.isOperational) {
        return sendError(res, err?.statusCode, err?.message || "Invalid data passed" );
    }

    // CHECK constraint
    if (err?.code === "23514") {
        return sendError(res, 400, err?.detail || "Invalid data passed" );
    }

    // UNIQUE constraint
    if (err?.code === "23505") {
        return sendError(res, 400, err?.detail || "Item already exist" );
    }

    sendError(res, 500, err?.message || "Internal server error" );
};

module.exports = errorHandler;