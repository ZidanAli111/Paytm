// middleware/errorHandler.js
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred' });
};

module.exports = errorHandler;
