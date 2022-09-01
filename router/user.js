const express = require('express');
const { ObjectId } = require('mongodb');
const User = require('../models/user');
const router = express.Router();
//선택 버튼 클릭시
router.post('/add/user', (req, res) => {
  User.create(
    {
      game_id: new ObjectId(req.body.game_id),
      name: req.body.name,
      side: req.body.side,
      role: req.body.role,
    },
    (err, result) => {
      if (err) throw err;
      res.status(201).json(result);
    }
  );
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
