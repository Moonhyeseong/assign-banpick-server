const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const userSchema = new mongoose.Schema({
  game_id: {
    type: ObjectId,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
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
    default: 'solo',
  },
  isReady: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 43200,
  },
});

module.exports = mongoose.model('user', userSchema);
