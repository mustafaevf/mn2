const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Pool } = require('pg');
const socketIo = require('socket.io');
const connection = require('./config/connection')
const path = require('path');
// const Userk = require('./Models/User')
const { Lobby, BoardUser, Board, User, LobbyUser } = require('./associations')
const lobbyRoutes = require('./routes/lobbyRoutes')
const authRoutes = require('./routes/authRoutes');
const platformRoutes = require('./routes/platformRoutes');
const userRoutes = require('./routes/userRoutes');
const boardRoutes = require('./routes/boardRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const {games, Game, Player} = require('./Games/monopoly');

// const {uuid} = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST']
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', lobbyRoutes);
app.use('/api', platformRoutes);
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', boardRoutes);


io.of('api/plays').on('connection', (socket) => {
  console.log('New client connected ' + socket.id);
  
  socket.on('client_init', async () => {
    
  });

  socket.on('connected', async (data) => {
    const lobbyUser = await LobbyUser.findOne({ where: { userId: data.user.id } });
    if (lobbyUser) {
      if(!games.find((game) => game.id === lobbyUser.lobbyId)) {
        const lobby = await Lobby.findByPk(lobbyUser.lobbyId);
        var result = new Game(lobby.id, lobby.uuid, lobby.max_person, io);
        console.log("игра найдена")

        games.push(result);
      } 
      const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
      if(!current_game.players.find((us) => us.id === data.user.id)) {
        console.log("игрок не найден")
        const user = await User.findByPk(lobbyUser.userId);
        
        socket.join(current_game.id);
        current_game.addPlayer(user.id, socket.id, current_game.id, user.login);
        current_game.broadcastMessage(user.login + " подключился к игре");
      } else {
        socket.join(current_game.id);
      }


      if(current_game.players.length === current_game.max_person && current_game.round === 0) {
        current_game.broadcastMessage("Start game");    
        current_game.startGame();    
      }
      // console.log(current_game);
      console.log("metka");
      current_game._update();

      await lobbyUser.update({
        socketId: socket.id,
      });
    }
  });

  socket.on('rollDice', async (data) => {
    console.log(data);
    const lobbyUser = await LobbyUser.findOne({ where: { userId: data.user.id } });
    if (lobbyUser) {
      const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
      current_game.rollDice();
    }
  });

  socket.on('buyProperty', async (data) => {
    const lobbyUser = await LobbyUser.findOne({ where: { userId: data.user.id } });
    if (lobbyUser) {
      const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
      current_game.buyProperty();
    }
  });


  socket.on('payTax', async (data) => {
    const lobbyUser = await LobbyUser.findOne({ where: { userId: data.user.id } });
    if (lobbyUser) {
      const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
      current_game.payTax();
    }
  });
  socket.on('pawnProperty', async(data) => {
    // console.log(data);
    const lobbyUser = await LobbyUser.findOne({ where: { userId: data.user.id } });
    if (lobbyUser) {
      const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
      current_game.pawnProperty(data.user.id, data.property);
    }
  });

  socket.on('buybackProperty', async(data) => {
    // console.log(data);
    const lobbyUser = await LobbyUser.findOne({ where: { userId: data.user.id } });
    if (lobbyUser) {
      const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
      current_game.buybackProperty(data.user.id, data.property);
    }
  });

  socket.on('upgradeProperty', async(data) => {
    // console.log(data);
    const lobbyUser = await LobbyUser.findOne({ where: { userId: data.user.id } });
    if (lobbyUser) {
      const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
      current_game.upgradeProperty(data.user.id, data.property);
    }
  });

  socket.on('offerDeal', async(data) => {
    // console.log(data);
    const lobbyUser = await LobbyUser.findOne({ where: { userId: data.user.id } });
    if (lobbyUser) {
      const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
      current_game.offerDeal(data.user.id, data.data);
      // console.log(data);
    }
  });



    socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});


connection.authenticate()
  .then(() => {
    console.log('Соединение с БД успешно установлено.');
    server.listen(8080, () => {
      console.log('server started http://127.0.0.1:8080/');
    });
    return connection.sync({ alter: false });
  })
  .then(() => {
    console.log('Синхронизация моделей прошла успешно.');
  })
  .catch((error) => {
    console.error('Невозможно подключиться к базе данных:', error);
  });