const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.post('/platform', platformController.createPlatform);
router.get('/user/:id', userController.getUser);
router.get('/users', userController.getUsers);


module.exports = router;
