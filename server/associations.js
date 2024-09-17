const Platform = require('./Models/Platform');
const Lobby = require('./Models/Lobby');
const User = require('./Models/User');
const LobbyUser = require('./Models/LobbyUser');
// const Board = require('./Models/Board');
// const BoardUser = require('./Models/BoardUser');

Platform.hasMany(Lobby);

Lobby.belongsTo(Platform);

User.hasMany(Lobby);
Lobby.belongsTo(User);

User.belongsToMany(Lobby, {through: LobbyUser});
Lobby.belongsToMany(User, {through: LobbyUser});

// Board.belongsTo(Lobby);

// User.belongsToMany(Board, {through: BoardUser});
// Board.belongsToMany(User, {through: BoardUser});

module.exports = {Platform, Lobby, User, LobbyUser};