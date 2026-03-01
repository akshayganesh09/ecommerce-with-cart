const { sendError } = require("../utils/response.utils");

const errorHandler = (err, req, res, next) => {
    console.log(err);
    sendError(res, 500, err?.message || "Internal server error" );
};

module.exports = errorHandler;