const express = require('express');
const router = express.Router();
const lobbyController = require('../controllers/lobbyController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/lobbies', lobbyController.getLobbies);
router.post('/lobby', authMiddleware, lobbyController.createLobby);
router.get('/connect/:id', authMiddleware, lobbyController.connectLobby);
router.get('/leave/:id', authMiddleware, lobbyController.leaveLobby);
router.get('/waitLobby', authMiddleware, lobbyController.waitLobby);
router.get('/lobby/:id/users', lobbyController.getUsers);
router.get('/lobby/:id/start', authMiddleware, lobbyController.startLobby);


module.exports = router;
