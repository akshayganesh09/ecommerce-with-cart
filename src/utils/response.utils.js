const sendSuccess = (res, data, status = 200, message = "Success") => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};

const sendError = (res, status = 500, message = "Internal Server Error") => {
    return res.status(status).json({
        success: false,
        error: message
    });
};

module.exports = { sendSuccess, sendError };