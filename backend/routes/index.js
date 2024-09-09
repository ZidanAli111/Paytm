const express = require('express');
const userRoutes = require('./userRoutes');
const accountRoutes = require('./accountRoutes');

const router = express.Router();

// Use the imported route modules
router.use('/users', userRoutes);
router.use('/accounts', accountRoutes);

module.exports = router;
