import mongoose from 'mongoose';

const inGameSchema = new mongoose.Schema({
  game_id: {
    type: ObjectId,
    required: true,
    ref: 'game',
  },
  blue_pickList: {
    type: ObjectId,
    required: true,
  },
  red_pickList: {
    type: ObjectId,
    required: true,
  },
  blue_banList: {
    type: ObjectId,
    required: true,
  },
  red_banList: {
    type: ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('ingame', inGameSchema, 'ingameData');
