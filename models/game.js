const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  blueTeam: {
    type: String,
    default: 'BLUE TEAM',
  },
  redTeam: {
    type: String,
    default: 'RED TEAM',
  },
  mode: {
    type: Number,
    required: true,
  },
  timer: {
    type: Boolean,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('game', gameSchema);
