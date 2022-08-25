const express = require('express');

const Game = require('../models/game');

const router = express.Router();

router.get('/game/info/:id', (req, res) => {
  console.log('게임 설정정보 전송');
  Game.findById(req.params.id, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

module.exports = router;
