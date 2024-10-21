const express = require('express');
const router = express.Router();
const lobbyController = require('../controllers/lobby.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/lobbies', lobbyController.getLobbies);
router.post('/lobbies', authMiddleware, lobbyController.createLobby);
router.get('/lobbies/:id/connect', authMiddleware, lobbyController.connectLobby);
router.get('/lobbies/:id/disconnect', authMiddleware, lobbyController.disconnectLobby);
router.get('/waitLobby', authMiddleware, lobbyController.waitLobby);
router.get('/lobbies/:id/info/users', lobbyController.getUsers);
router.get('/lobbies/:id/start', authMiddleware, lobbyController.startLobby);
router.get('/lobbies/:id/info/fields', lobbyController.getFields);
// router.get('/lobbies/:uuid/')

module.exports = router;
