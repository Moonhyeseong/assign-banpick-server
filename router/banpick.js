const express = require('express');
const GameData = require('../models/gameData');
const router = express.Router();
//선택 버튼 클릭시
router.post('/banpick/:id', (req, res) => {
  const filterID = req.params.id;
  const { banList, pickList } = req.body.banPickList;

  const update = {
    banList: {
      blue: banList.blue,
      red: banList.red,
    },
    pickList: {
      blue: pickList.blue,
      red: pickList.red,
    },
  };

  InGame.findOneAndUpdate({ _id: filterID }, update, (err, result) => {
    if (err) throw err;
    res.status(201).send(result);
  });
});

router.get('/banpick/:id', (req, res) => {
  const filterID = req.params.id;

  InGame.findById(filterID, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

module.exports = router;
