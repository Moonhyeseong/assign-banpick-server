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
});

module.exports = router;
