const { sendError } = require("../utils/response.utils");

const notFound = (req, res) => {
    // res.status(404).json({
    //     message: `Route ${req.originalUrl} not found...`
    // });

    sendError(res, 404, `page not found: ${req.originalUrl}`);
};

module.exports = notFound;