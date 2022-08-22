const express = require('express');

const Game = require('../models/game');
const InGame = require('../models/ingame');

const router = express.Router();

router.get('/game/info/:id', (req, res) => {
  Game.findById(req.params.id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
