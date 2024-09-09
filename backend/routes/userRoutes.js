const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Define routes and attach the controller functions
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.put('/', authMiddleware, userController.updateUser);
router.get('/bulk', userController.getUsers);

module.exports = router;
