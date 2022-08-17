import mongoose from 'mongoose';

const banListSchema = new mongoose.Schema({
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
  side: {
    type: String,
    required: true,
  },
  ban1: {
    type: String,
    required: true,
  },
  ban2: {
    type: String,
    required: true,
  },
  ban3: {
    type: String,
    required: true,
  },
  ban4: {
    type: String,
    required: true,
  },
  ban5: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('banList', banListSchema);
