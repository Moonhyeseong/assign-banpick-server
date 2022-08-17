const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  game_id: {
    type: ObjectId,
    required: true,
    ref: 'game',
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
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);
