const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/board/:uuid/status', boardController.getStatus);
router.get('/board/fields', boardController.getFields);


module.exports = router;
