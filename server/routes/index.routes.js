const lobbyRoutes = require('./lobby.routes');
const authRoutes = require('./auth.routes');
const platformRoutes = require('./platform.routes');
const userRoutes = require('./user.routes');
const boardRoutes = require('./board.routes');
const itemRoutes = require('./item.routes');
const router = require('express').Router();

router.use('/', lobbyRoutes);
router.use('/', platformRoutes);
router.use('/', userRoutes);
router.use('/auth', authRoutes);
router.use('/', boardRoutes);
router.use('/', itemRoutes);

module.exports = router;