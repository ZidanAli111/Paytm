const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Define routes and attach the controller functions
router.get('/balance', authMiddleware, accountController.getBalance);
router.post('/transfer', authMiddleware, accountController.transferFunds);

module.exports = router;
