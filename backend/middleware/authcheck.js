const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authcheck = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authentication failed' });
    }

    try {
        const decoded = jwt.verify(token, process.env.secret_key);
        req.user = decoded; // Attach user info to the request
        next(); // Proceed to the next route handler
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

module.exports = authcheck;