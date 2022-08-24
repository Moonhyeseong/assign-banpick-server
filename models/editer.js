const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const editerSchema = new mongoose.Schema({
  game_id: {
    type: ObjectId,
    required: true,
  },
  phase: {
    type: String,
    // required: true,
  },
  turn: {
    type: String,
    // required: true,
  },
  currentIndex: {
    type: Number,
    // required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model('editer', editerSchema);
