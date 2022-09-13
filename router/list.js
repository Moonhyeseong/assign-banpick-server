const express = require('express');

const Editer = require('../models/editer');
const GameData = require('../models/gameData');

const router = express.Router();
//선택 버튼 클릭시
router.get('/list/player/:id', (req, res) => {
  console.log('player list 전송');
  console.log(req.params.id);
  PlayerList.findById(req.params.id, (err, result) => {
    if (err) throw err;
    res.json(result?.playerList);
  });
});

router.get('/list/banpick/:id', (req, res) => {
  console.log(req.params.id);
  BanPickList.findById(req.params.id, (err, result) => {
    res.json(result);
  });
});

router.get('/list/turn/:id', (req, res) => {
  Editer.findById(req.params.id, (err, result) => {
    res.json(result);
  });
});

router.get('/list', (req, res) => {
  GameData.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, docs) {
      res.json(docs);
    });
});

module.exports = router;
