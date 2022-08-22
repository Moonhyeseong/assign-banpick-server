const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const inGameSchema = new mongoose.Schema({
  blue_pickList: {
    type: Array,
    required: true,
    default: ['', '', '', '', ''],
  },
  red_pickList: {
    type: Array,
    required: true,
    default: ['', '', '', '', ''],
  },
  blue_banList: {
    type: Array,
    required: true,
    default: ['', '', '', '', ''],
  },
  red_banList: {
    type: Array,
    required: true,
    default: ['', '', '', '', ''],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model('ingame', inGameSchema, 'ingameData');

//
