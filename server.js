const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const connect = require('./models');
const bodyParser = require('body-parser');

const GameData = require('./models/gameData');
const User = require('./models/user');

connect();

const app = express();
const server = app.listen(8080, () => {
  console.log('listening on 8080');
});
const io = socket(server, { path: '/socket.io' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', require('./router/createGame.js'));
app.use('/', require('./router/user.js'));
app.use('/', require('./router/gameInfo.js'));
app.use('/', require('./router/list.js'));

// app.use('/', require('./router/socket.js'));
const room = io.of('/room');

room.on('connection', socket => {
  console.log('socket.io connection');

  socket.once('createGame', () => {
    console.log('createGame');
    socket.broadcast.emit('updateGameList', '게임이 생성되었습니다.');
  });

  socket.once('joinRoom', payload => {
    console.log('유저 입장');
    socket.join(payload);

    socket.in(payload).emit('join', '대기방에 입장하셧습니다');
    socket.broadcast.emit('updateGameList', 'updateGameList');
  });

  socket.once('user-join', (gameID, updateGameData, userID) => {
    socket.userID = userID;

    room.in(gameID).emit('updateGameData', updateGameData);
  });

  socket.once('userReadyEvent', (gameID, docs) => {
    room.in(gameID).emit('updateGameData', docs);
  });

  socket.once('start-simulator', gameID => {
    GameData.findByIdAndUpdate(
      { _id: gameID },
      { isProceeding: true },
      { new: true },
      (err, updatedResult) => {
        room.in(gameID).emit('updateGameData', updatedResult);
      }
    );
  });

  socket.on('banpick', (gameID, banPickList, banpickCount, phaseCounter) => {
    socket.to(gameID).emit('banpick', banPickList, phaseCounter);

    GameData.findByIdAndUpdate(
      { _id: gameID },
      {
        $set: {
          banPickList: banPickList,
          banpickCount: banpickCount + 1,
        },
      },
      { new: true },
      (err, updatedResult) => {
        if (err) throw err;
        room.in(gameID).emit('updateGameData', updatedResult);
      }
    );
  });

  socket.on('selectChampion', (gameID, champion) => {
    socket.broadcast.to(gameID).emit('selectChampion', champion);
  });

  socket.on('timeout', res => {
    console.log(res);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('disconnecting', () => {
    const roomID = [...socket.rooms].pop();

    GameData.findById({ _id: roomID }, (err, result) => {
      if (result?.isProceeding) {
        socket.to(roomID).emit('shutdown-simulator', 'shutdown-simulator');
        GameData.deleteOne({ _id: roomID }).exec();
        User.deleteMany({ game_id: roomID }).exec();
      }

      let updatedBlueUserListData = [];
      let updatedRedUserListData = [];

      const blueUserListData = result?.userList.blue;
      const redUserListData = result?.userList.red;

      blueUserListData?.map(user => {
        if (user.user_id === socket.userID) {
          updatedBlueUserListData.push('');
        } else {
          updatedBlueUserListData.push(user);
        }
        return updatedBlueUserListData;
      });

      redUserListData?.map(user => {
        if (user.user_id === socket.userID) {
          updatedRedUserListData.push('');
        } else {
          updatedRedUserListData.push(user);
        }
        return updatedRedUserListData;
      });

      GameData.findByIdAndUpdate(
        { _id: roomID },
        {
          userList: {
            blue: updatedBlueUserListData,
            red: updatedRedUserListData,
          },
        },
        { new: true },
        (err, result) => {
          //유저이탈후 참가인원 검사
          const activeBlueTeamUsers = result?.userList.blue.filter(user => {
            return user !== '';
          });
          const activeRedTeamUsers = result?.userList.red.filter(user => {
            return user !== '';
          });

          if (
            activeBlueTeamUsers?.length === 0 &&
            activeRedTeamUsers?.length === 0
          ) {
            GameData.deleteOne({ _id: roomID }).exec();
            User.deleteMany({ game_id: roomID }).exec();
          }

          socket.broadcast.emit('updateGameList', 'updateGameList');
          room.in(roomID).emit('updateGameData', result);
        }
      );
    });
  });
});

module.exports = { server, io, room };
