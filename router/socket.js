const express = require('express');
const socket = require('socket.io');

const router = express.Router();
const app = express();
const server = app.listen(8080, () => {
  console.log('listening on 8080');
});
const io = socket(server, { path: '/socket.io' });
const room = io.of('/room');

room.on('connection', socket => {
  console.log('socket.io connection');

  socket.on('news', payload => {
    console.log(payload);
  });

  socket.on('ready', (payload, gameId) => {
    console.log(gameId);
    socket.to(gameId).emit('ready', payload);
    socket.to(gameId).emit('gmaeID', gameId);
  });

  socket.on('joinRoom', payload => {
    socket.join(payload);
    socket.to(payload).emit('join', '대기방에 입장하셧습니다');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('banpick', (gameID, banPickList, TurnData) => {
    socket.broadcast.to(gameID).emit('updateTurn', TurnData);
    socket.broadcast.to(gameID).emit('banpick', banPickList);
  });
});

module.exports = router;
