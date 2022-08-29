const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const playerListSchema = new mongoose.Schema({
  playerList: {
    type: Object,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model('playerList', playerListSchema);
