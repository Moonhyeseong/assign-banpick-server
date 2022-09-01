const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const gameSchema = new mongoose.Schema({
  ingame_id: {
    type: ObjectId,
    ref: 'ingame',
  },
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
    default: true,
  },
  isProceeding: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model('game', gameSchema);
