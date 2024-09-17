const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/auth', authMiddleware, authController.check);

module.exports = router;
