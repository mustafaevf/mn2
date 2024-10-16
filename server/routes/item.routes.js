const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/item', itemController.createItem);


module.exports = router;
