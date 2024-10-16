const Platform = require('./Models/Platform');
const Lobby = require('./Models/Lobby');
const User = require('./Models/User');
const LobbyUser = require('./Models/LobbyUser');
const Item = require('./Models/Item');
const ItemUser = require('./Models/ItemUser');
// const Board = require('./Models/Board');
// const BoardUser = require('./Models/BoardUser');

Platform.hasMany(Lobby);

Lobby.belongsTo(Platform);

User.hasMany(Lobby);
Lobby.belongsTo(User);

User.belongsToMany(Lobby, {through: LobbyUser});
Lobby.belongsToMany(User, {through: LobbyUser});



// User.hasMany(Item);
// Item.belongsTo(User);

User.belongsToMany(Item, {through: ItemUser});
Item.belongsToMany(User, {through: ItemUser});

// Board.belongsTo(Lobby);

// User.belongsToMany(Board, {through: BoardUser});
// Board.belongsToMany(User, {through: BoardUser});

module.exports = {Platform, Lobby, User, LobbyUser, Item};