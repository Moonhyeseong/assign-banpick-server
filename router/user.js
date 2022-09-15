const express = require('express');

const { ObjectId } = require('mongodb');
const GameData = require('../models/gameData');
const User = require('../models/user');
const router = express.Router();
const ONE_VS_ONE_MODE = 1;
const FIVE_VS_FIVE_MODE = 2;

router.post('/user/join', (req, res) => {
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
          isOnline: true,
        };
      } else if (req.body.mode === FIVE_VS_FIVE_MODE) {
        updatedUserList[req.body.side][req.body.roleIndex] = {
          user_id: req.body.user_id,
          name: req.body.name,
          side: req.body.side,
          role: req.body.role,
          isReady: req.body.isReady,
          isOnline: true,
        };
      }
      return updatedUserList;
    };

    GameData.findByIdAndUpdate(
      { _id: req.body.game_id },
      { userList: getUpdatedUserList() },
      { new: true },
      (err, updatedResult) => {
        res.json(updatedResult);
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

router.post('/user/ready', (req, res) => {
  GameData.findById({ _id: req.body.game_id }, (err, result) => {
    const getUpdatedUserList = () => {
      const updatedUserList = result.userList;

      updatedUserList[req.body.userSide][req.body.userIndex] = {
        ...updatedUserList[req.body.userSide][req.body.userIndex],
        isReady: true,
      };
      return updatedUserList;
    };

    GameData.findByIdAndUpdate(
      { _id: req.body.game_id },
      { userList: getUpdatedUserList() },
      { new: true },
      (err, updatedResult) => {
        if (err) throw err;
        res.json(updatedResult);
      }
    );
  });

  User.findOneAndUpdate(
    { user_id: req.body.user_id },
    { isReady: true },
    (err, updatedResult) => {}
  );
});

router.post('/user/solo', (req, res) => {
  GameData.findById({ _id: req.body.game_id }, (err, result) => {
    const getUpdatedUserList = () => {
      const updatedUserList = result.userList;
      updatedUserList.blue[0] = 'solo';
      updatedUserList.red[0] = 'solo';

      return updatedUserList;
    };

    GameData.findByIdAndUpdate(
      { _id: req.body.game_id },
      { userList: getUpdatedUserList() },
      (err, updatedResult) => {}
    );

    User.create({
      game_id: req.body.game_id,
      user_id: req.body.user_id,
      name: 'solo',
      side: 'solo',
      role: 'solo',
      isReady: true,
    });
  });
});

router.get('/user/:id', (req, res) => {
  User.findOne({ user_id: req.params.id }, (err, result) => {
    res.json(result);
  });
});

module.exports = router;
