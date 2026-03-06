const { sendError } = require("../utils/response.utils");

const schemaValidation = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query);

        console.log(value);

        if (error) {
            return sendError(res, 400, error.details[0].message);
        };

        req.query = value;

        next();
    };
};

module.exports = schemaValidation;