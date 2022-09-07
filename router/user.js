const express = require('express');

const GameData = require('../models/gameData');

const router = express.Router();
const ONE_VS_ONE_MODE = 1;
const FIVE_VS_FIVE_MODE = 2;
//선택 버튼 클릭시
router.post('/user/join', (req, res) => {
  GameData.findById({ _id: req.body.game_id }, (err, result) => {
    const getUpdatedUserList = () => {
      const updatedUserList = result.userList;
      if (req.body.mode === ONE_VS_ONE_MODE) {
        updatedUserList[req.body.side][0] = {
          name: req.body.name,
          side: req.body.side,
        };
      } else if (req.body.mode === FIVE_VS_FIVE_MODE) {
        updatedUserList[req.body.side][req.body.roleIndex] = {
          name: req.body.name,
          side: req.body.side,
          role: req.body.role,
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
  });
});

// router.post('/add/user', (req, res) => {
//   User.create(
//     {
//       game_id: new ObjectId(req.body.game_id),
//       name: req.body.name,
//       side: req.body.side,
//       role: req.body.role,
//     },
//     (err, result) => {
//       if (err) throw err;
//       res.status(201).json(result);
//     }
//   );
// });

router.get('/user/:id', (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id, (err, result) => {
    res.json(result);
  });
});

module.exports = router;
