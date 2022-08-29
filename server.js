const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const connect = require('./models');
const bodyParser = require('body-parser');
const InGame = require('./models/ingame');
const PlayerList = require('./models/playerList');

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
// app.use('/', require('./router/socket.js'));
const room = io.of('/room');

room.on('connection', socket => {
  console.log('socket.io connection');

  socket.on('ready', (payload, gameId) => {
    console.log(gameId);
    socket.to(gameId).emit('ready', payload);
    socket.to(gameId).emit('gmaeID', gameId);
    PlayerList.findByIdAndUpdate(
      { _id: gameId },
      { playerList: payload },
      err => {
        if (err) throw err;
        console.log('플레이어 리스트 업데이트');
      }
    );
  });

  socket.on('joinRoom', payload => {
    console.log('유저 입장');
    socket.join(payload);
    socket.in(payload).emit('join', '대기방에 입장하셧습니다');
  });

  socket.on('banpick', (gameID, banPickList, TurnData, phaseCounter) => {
    socket.to(gameID).emit('updateTurn', TurnData);
    socket.to(gameID).emit('banpick', banPickList);
    socket.to(gameID).emit('phase', phaseCounter);
  });

  socket.on('selectChampion', (gameID, champion) => {
    console.log(champion);
    socket.broadcast.to(gameID).emit('selectChampion', champion);
  });

  socket.on('timeout', res => {
    console.log(res);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('disconnecting', () => {
    console.log('user disconnected');
    // socket.broadcast
    //   .to(socket.rooms)
    //   .emit('disconnect', '상대방이 종료하였습니다.');
    console.log(socket.rooms);
  });
});
