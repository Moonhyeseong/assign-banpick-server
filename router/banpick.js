const express = require('express');
const InGame = require('../models/ingame');
const router = express.Router();
//선택 버튼 클릭시
router.post('/banpick/:id', (req, res) => {
  const filterID = req.params.id;
  const update = {
    blue_pickList: req.body.blue_pickList,
    red_pickList: req.body.red_pickList,
    blue_banList: req.body.blue_banList,
    red_banList: req.body.red_banList,
  };

  InGame.findOneAndUpdate(filterID, update);
});

module.exports = router;
