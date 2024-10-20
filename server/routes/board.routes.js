const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/board/:uuid/status', boardController.getStatus);


module.exports = router;
