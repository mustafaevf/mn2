const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

// router.post('/platform', platformController.createPlatform);
router.get('/users/:id', userController.getUser);
router.get('/users', userController.getUsers);
router.post('/user/change/password', authMiddleware, userController.changePassword);
router.get('/users/:id/items', userController.getItems);
router.post('/users/:id/items', userController.addItemToUser);

module.exports = router;
