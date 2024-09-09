const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ msg: 'Authorization token is missing' });
    }

    try {
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(403).json({ msg: 'Invalid token' });
            } else {
                req.userId = payload.userId;
                next();
            }
        });
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
};

module.exports = { authMiddleware };
