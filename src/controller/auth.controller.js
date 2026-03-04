const authService = require("../services/authService");
const { sendSuccess } = require("../utils/response.utils");

const register = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const user = await authService?.register(email, password, role);

        sendSuccess(res, user, 201, "User created successfuly");
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);

        sendSuccess(res, user, 200, "LoggedIn successfully");
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login };