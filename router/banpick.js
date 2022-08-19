const express = require('express');
const InGame = require('../models/ingame');
const router = express.Router();
//선택 버튼 클릭시
router.post('/banpick/:id', (req, res) => {
  const filterID = req.params.id;
  const { banList, pickList } = req.body.banPickList;

  const update = {
    blue_pickList: pickList.blue,
    red_pickList: pickList.red,
    blue_banList: banList.blue,
    red_banList: banList.red,
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
