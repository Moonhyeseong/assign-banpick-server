const express = require('express');
const User = require('../models/user');
const router = express.Router();
//선택 버튼 클릭시
router.post('/add/user', (req, res) => {
  User.create({}, (err, result) => {
    if (err) throw err;
    res.status(201);
  });
});

module.exports = router;
