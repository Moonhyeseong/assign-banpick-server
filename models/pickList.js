import mongoose from 'mongoose';

const pickListSchema = new mongoose.Schema({
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
  top: {
    type: String,
    required: true,
  },
  jungle: {
    type: String,
    required: true,
  },
  mid: {
    type: String,
    required: true,
  },
  adc: {
    type: String,
    required: true,
  },
  sup: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('pickList', pickListSchema);
