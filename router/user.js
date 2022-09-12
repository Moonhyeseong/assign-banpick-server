const express = require('express');

const { ObjectId } = require('mongodb');
const GameData = require('../models/gameData');
const User = require('../models/user');
const router = express.Router();
const ONE_VS_ONE_MODE = 1;
const FIVE_VS_FIVE_MODE = 2;
//선택 버튼 클릭시
router.post('/user/join', (req, res) => {
  console.log(req.body);
  GameData.findById({ _id: req.body.game_id }, (err, result) => {
    const getUpdatedUserList = () => {
      const updatedUserList = result.userList;
      if (req.body.mode === ONE_VS_ONE_MODE) {
        updatedUserList[req.body.side][0] = {
          user_id: req.body.user_id,
          name: req.body.name,
          side: req.body.side,
          role: req.body.role,
          isReady: req.body.isReady,
        };
      } else if (req.body.mode === FIVE_VS_FIVE_MODE) {
        updatedUserList[req.body.side][req.body.roleIndex] = {
          user_id: req.body.user_id,
          name: req.body.name,
          side: req.body.side,
          role: req.body.role,
          isReady: req.body.isReady,
        };
      }
      return updatedUserList;
    };

    GameData.findByIdAndUpdate(
      { _id: req.body.game_id },
      { userList: getUpdatedUserList() },
      (err, updatedResult) => {
        console.log(updatedResult);
      }
    );

    User.create({
      game_id: req.body.game_id,
      user_id: req.body.user_id,
      name: req.body.name,
      side: req.body.side,
      role: req.body.role,
      isReady: req.body.isReady,
    });
  });
});

router.get('/user/:id', (req, res) => {
  console.log(req.params.id);
  User.findOne({ user_id: req.params.id }, (err, result) => {
    res.json(result);
    console.log(result);
  });
});

module.exports = router;
