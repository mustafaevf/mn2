const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const connection = require('./config/connection');
const path = require('path');
const routes = require('./routes/index.routes');
const monopolySockets = require('./Games/socket');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', routes);

monopolySockets(io);

connection
    .authenticate()
    .then(() => {
        console.log('Соединение с БД успешно установлено.');
        server.listen(8080, () => {
            console.log('server started http://127.0.0.1:8080/');
        });
        return connection.sync({ alter: true });
    })
    .then(() => {
        console.log('Синхронизация моделей прошла успешно.');
    })
    .catch((error) => {
        console.error('Невозможно подключиться к базе данных:', error);
    });
