const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  game_id: {
    type: ObjectId,
    required: true,
    ref: 'game',
  },
  ingame_id: {
    type: ObjectId,
    required: true,
    ref: 'ingame',
  },
  name: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model('user', userSchema);
