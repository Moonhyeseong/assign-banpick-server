const express = require('express');
const GameData = require('../models/gameData');

const router = express.Router();

router.post('/start', (req, res) => {
  const initalUserList = () => {
    if (req.body.mode === 1) {
      return {
        blue: [''],
        red: [''],
      };
    } else if (req.body.mode === 2) {
      return {
        blue: ['', '', '', '', ''],
        red: ['', '', '', '', ''],
      };
    }
  };

  GameData.create(
    {
      title: req.body.title,
      blueTeamName: req.body.blueTeamName,
      redTeamName: req.body.redTeamName,
      mode: req.body.mode,
      userList: initalUserList(),
    },
    (err, result) => {
      if (err) throw err;
      res.status(201).json(result);
    }
  );
});

//get 요청시 id에 따라 ingame id로 게임 데이터 전송
// router.get('/start/:id', (req, res) => {
//   Game.findById(req.params.id, (err, result) => {
//     if (err) console.log(err);

//     console.log('유저 입장');

//     const inviteData = {
//       mode: result?.mode,
//       side: req.query.side,
//     };
//     if (result) {
//       res.json(inviteData);
//     } else {
//       const err = new Error('게임정보가 존재하지 않습니다.');
//       res.status(404).json(err);
//     }
//   });
// });

module.exports = router;
