const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("../config/db");

const AppError = require("../utils/appError.utils");

const register = async (email, password) => {
    // Hash Password.
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, role", [email, hashedPassword]);

        return result.rows[0];
    } catch (err) {
        if (err.code === '23505') {
            throw new AppError('Email already exists', 400);
        }
        throw err;
    }
};

const login = async (email, password) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if(result.rows?.length === 0) {
        throw new AppError('Invalid email or password', 401);
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user?.password);

    if(!isMatch) {
        throw new AppError('Invalid password', 401);
    }

    // Generate Token.
    const token = jwt.sign(
        {id: user?.id, role: user?.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = { register, login };