const express = require('express');
const Game = require('../models/game');

const router = express.Router();

router.post('/start', (req, res) => {
  const game = Game.create({
    blueTeam: req.body.blueTeam,
    redTeam: req.body.redTeam,
    mode: req.body.mode,
    timer: req.body.timer,
  });

  const result = Game.populate(game, { path: 'ingame' });
});

module.exports = router;
