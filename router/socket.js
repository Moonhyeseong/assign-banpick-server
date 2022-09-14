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

  socket.once('user-join', (gameID, docs) => {
    // GameData.findById({ _id: gameID }, (err, result) => {
    //   if (err) throw err;
    //   console.log(result.userList);
    //   socket.broadcast.to(gameID).emit('updateGameData', result);
    // });
    room.in(gameID).emit('updateGameData', docs);
  });

  socket.once('userReadyEvent', (gameID, docs) => {
    // GameData.findById({ _id: gameID }, (err, result) => {
    //   if (err) throw err;
    //   socket.broadcast.to(gameID).emit('updateGameData', result);
    // });
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
    // PlayerList.findById({ _id: roomID }, (err, result) => {
    //   if (
    //     result?.playerList?.blue.indexOf('') === -1 &&
    //     result?.playerList?.red.indexOf('') === -1
    //   ) {
    //     Game.findByIdAndUpdate(
    //       { _id: roomID },
    //       { isProceeding: false },
    //       (err, result) => {
    //         console.log(result);
    //       }
    //     );
    //   }
    // });

    socket.to(roomID).emit('user-disconnected', '유저 나감');
  });
});

module.exports = router;
