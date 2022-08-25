const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const connect = require('./models');
const bodyParser = require('body-parser');
const InGame = require('./models/ingame');

connect();

const app = express();
const server = app.listen(8080, () => {
  console.log('listening on 8080');
});
const io = socket(server, { path: '/socket.io' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', require('./router/start.js'));
app.use('/', require('./router/banpick.js'));
app.use('/', require('./router/user.js'));
app.use('/', require('./router/gameInfo.js'));

const room = io.of('/room');

room.on('connection', socket => {
  console.log('socket.io connection');
  socket.join('default');

  socket.on('news', payload => {
    console.log(payload);
  });

  socket.on('ready', (payload, gameId) => {
    console.log(gameId);
    socket.to(gameId).emit('ready', payload);
    socket.to(gameId).emit('gmaeID', gameId);
  });

  socket.on('joinRoom', payload => {
    socket.leave('default');
    socket.join(payload);

    socket.to(payload).emit('join', '대기방에 입장하셧습니다');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('banpick', (gameID, banPickList) => {
    // socket.to(gameID).emit('banpick', payload);
    console.log(gameID);
    console.log(banPickList);
    InGame.findById(gameID, (err, data) => {
      socket.to(gameID).emit('banpick', data);
    });
  });

  socket.on('updateTurn', (gameID, turn) => {
    console.log(turn);
    socket.to(gameID).emit('updateTurn', turn);
  });
});
