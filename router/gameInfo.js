const express = require('express');

const GameData = require('../models/gameData');

const router = express.Router();

router.get('/gameData/:id', (req, res) => {
  console.log('게임 설정정보 전송');
  GameData.findById(req.params.id, (err, result) => {
    res.json(result);
  });
});

module.exports = router;
