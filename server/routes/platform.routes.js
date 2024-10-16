const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platform.controller');

router.post('/platform', platformController.createPlatform);
router.get('/platform/:id', platformController.getPlatform);
router.get('/platforms', platformController.getPlatforms);


module.exports = router;
