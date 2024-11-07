const Lobby = require('./Models/Lobby');
const User = require('./Models/User');
const LobbyUser = require('./Models/LobbyUser');
const Item = require('./Models/Item');
const ItemUser = require('./Models/ItemUser');
const Marketplace = require('./Models/Marketplace');
// const Board = require('./Models/Board');
// const BoardUser = require('./Models/BoardUser');


User.hasMany(Lobby);
Lobby.belongsTo(User);

User.belongsToMany(Lobby, {through: LobbyUser});
Lobby.belongsToMany(User, {through: LobbyUser});

// User.hasMany(Item);
// Item.belongsTo(User);

Item.belongsToMany(User, {through: ItemUser});
User.belongsToMany(Item, {through: ItemUser});

Marketplace.belongsTo(User);
Marketplace.belongsTo(Item);

// Board.belongsTo(Lobby);

// User.belongsToMany(Board, {through: BoardUser});
// Board.belongsToMany(User, {through: BoardUser});

module.exports = { Lobby, User, LobbyUser, Item, ItemUser, Marketplace};