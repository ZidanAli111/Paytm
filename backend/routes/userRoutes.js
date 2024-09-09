const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Define routes and attach the controller functions
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/update', authMiddleware, userController.updateUser);
router.get('/list', authMiddleware, userController.getUsers);
router.post('/logout', userController.logout);

module.exports = router;
