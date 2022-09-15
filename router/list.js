const express = require('express');

const GameData = require('../models/gameData');

const router = express.Router();
//선택 버튼 클릭시

router.get('/list', (req, res) => {
  GameData.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, docs) {
      if (err) throw err;
      res.json(docs);
    });
});

module.exports = router;
