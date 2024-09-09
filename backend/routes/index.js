const express = require('express');
const userRoutes = require('./userRoutes');
const accountRoutes = require('./accountRoutes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/account', accountRoutes);

module.exports = router;
