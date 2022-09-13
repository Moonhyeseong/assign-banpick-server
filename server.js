const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const connect = require('./models');
const bodyParser = require('body-parser');

const Editer = require('./models/editer');
const PlayerList = require('./models/playerList');
const Game = require('./models/game');
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
app.use('/', require('./router/banpick.js'));
app.use('/', require('./router/user.js'));
app.use('/', require('./router/gameInfo.js'));
app.use('/', require('./router/list.js'));

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

  socket.once('user-join', gameID => {
    room.in(gameID).emit('user-join', 'updateGameData');
  });

  socket.once('userReady', (gameID, userID, userSide, userIndex) => {
    GameData.findById({ _id: gameID }, (err, result) => {
      const getUpdatedUserList = () => {
        const updatedUserList = result.userList;

        updatedUserList[userSide][userIndex] = {
          ...updatedUserList[userSide][userIndex],
          isReady: true,
        };
        return updatedUserList;
      };

      GameData.findByIdAndUpdate(
        { _id: gameID },
        { userList: getUpdatedUserList() },
        (err, updatedResult) => {}
      );
    });

    User.findOneAndUpdate(
      { user_id: userID },
      { isReady: true },
      (err, updatedResult) => {}
    );

    room.in(gameID).emit('userReadyEvent', 'userReadyEvent');
  });

  socket.once('start-simulator', gameID => {
    GameData.findByIdAndUpdate(
      { _id: gameID },
      { isProceeding: true },
      (err, updatedResult) => {
        room.in(gameID).emit('userReadyEvent', 'userReadyEvent');
      }
    );
  });

  socket.once('banpick', (gameID, banPickList, TurnData, phaseCounter) => {
    socket.to(gameID).emit('updateTurn', TurnData);
    socket.to(gameID).emit('banpick', banPickList);
    socket.to(gameID).emit('phase', phaseCounter);
    //banpick post 처리 여기서
    GameData.findByIdAndUpdate(
      { _id: gameID },
      { banPickList: banPickList },
      (err, updatedResult) => {
        socket.to(gameID).emit('updateBanPick', updatedResult);
      }
    );

    Editer.findByIdAndUpdate(
      { _id: gameID },
      { turnData: TurnData },
      (err, result) => {
        if (err) throw err;
        console.log('turn정보 업데이트');
      }
    );
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
    const roomID = [...socket.rooms].pop();
    //유저가 나가면 진행중 여부를 false로
    //그런데 대기방에서 나가도 false로 되버림

    //대기방 출입 여부는 마음대로 가능
    //대기방에서 나갔을땐 isProceeding ture 여야함

    //플레이어 리스트의 배열내 요소 검사를 통해 ''가 없을때만 isProceeding ture 로 전환하기?

    //유저 접속 상태 체크
    //EX) 슬랙

    // 중국애들
    // 방리스트
    // 밴픽리스트 post emit 통합
    PlayerList.findById({ _id: roomID }, (err, result) => {
      if (
        result?.playerList?.blue.indexOf('') === -1 &&
        result?.playerList?.red.indexOf('') === -1
      ) {
        Game.findByIdAndUpdate(
          { _id: roomID },
          { isProceeding: false },
          (err, result) => {
            console.log(result);
          }
        );
      }
    });

    socket.to(roomID).emit('user-disconnected', '유저 나감');
  });
});

module.exports = { server, io, room };
