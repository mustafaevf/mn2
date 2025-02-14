const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplace.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/marketplace/listings', marketplaceController.getListings);
router.post('/marketplace/listings', authMiddleware, marketplaceController.createListings);
router.get('/marketplace/listings/:itemId', marketplaceController.getListingsByItemId)


// router.get('/lobbies/:uuid/')

module.exports = router;
