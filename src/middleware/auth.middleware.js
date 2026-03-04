const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError.utils");

exports.protect = (req, res, next) => {
    let token;

    console.log("Token: ", req.headers.authorization);

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(new AppError("You are not loggedIn", 401));
    }
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decode: ", decode);

        //Attach user info to the request.
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return next(new AppError(`Invalid or expired token`, 401));
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to perform this action", 403));
        };

        next();
    };
};