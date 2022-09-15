const express = require('express');
const GameData = require('../models/gameData');

const router = express.Router();

router.post('/start', (req, res) => {
  const initalUserList = () => {
    if (req.body.mode === 1 || req.body.mode === 0) {
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
      timer: req.body.timer,
      isProceeding: req.body.isProceeding,
    },
    (err, result) => {
      if (err) throw console.log('create game', err);
      console.log('게임 생성');

      res.status(201).json(result);
    }
  );
});

module.exports = router;
