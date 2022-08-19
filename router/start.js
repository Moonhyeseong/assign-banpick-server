const express = require('express');
const Game = require('../models/game');
const InGame = require('../models/ingame');

const router = express.Router();

router.post('/start', (req, res) => {
  Game.create(
    {
      blueTeam: req.body.blueTeam,
      redTeam: req.body.redTeam,
      mode: req.body.mode,
      timer: req.body.timer,
    },
    (err, result) => {
      console.log('Create Game');
      if (err) throw err;
      InGame.create({ game_id: result._id }, (err, result) => {
        res.status(201).json(result);
      });
    }
  );
});

// router.get('/start', () => {});

module.exports = router;
