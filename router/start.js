const express = require('express');

const Game = require('../models/game');
const InGame = require('../models/ingame');
const Editer = require('../models/editer');
const PlayerList = require('../models/playerList');
const router = express.Router();

router.post('/start', (req, res) => {
  Game.create(
    {
      blueTeam: req.body.blueTeam,
      redTeam: req.body.redTeam,
      mode: req.body.mode,
      timer: req.body.timer,
    },
    (err, result) => {
      console.log('Create Game');
      if (err) console.log(err);

      InGame.create({ _id: result._id }, (err, result) => {
        if (err) throw err;
        res.status(201).json(result);
      });

      Editer.create({ _id: result._id }, (err, result) => {
        if (err) throw err;
      });

      PlayerList.create({ _id: result._id }, (err, result) => {
        if (err) throw err;
      });
    }
  );
});

//get 요청시 id에 따라 ingame id로 게임 데이터 전송
router.get('/start/invite/:id', (req, res) => {
  Game.findById(req.params.id, (err, result) => {
    if (err) console.log(err);

    console.log('유저 입장');

    const inviteData = {
      mode: result?.mode,
      side: req.query.side,
    };
    if (result) {
      res.json(inviteData);
    } else {
      const err = new Error('게임정보가 존재하지 않습니다.');
      res.status(404).json(err);
    }
  });
});

module.exports = router;
