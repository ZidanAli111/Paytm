const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers?.authorization;

    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: "There is an issue with authorization."
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) {
                res.status(403).json({
                    msg: "Please check the  login credentials",
                });
            } else {
                req.userId = decoded.userId;
                next();
            }
        });

    } catch (err) {
        return res.status(403).json({
            message: err.message
        });
    }
};

module.exports = {
    authMiddleware
}