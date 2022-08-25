const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const inGameSchema = new mongoose.Schema({
  banList: {
    type: Object,
    require: true,
    default: { blue: ['', '', '', '', ''], red: ['', '', '', '', ''] },
  },

  pickList: {
    type: Object,
    require: true,
    default: { blue: ['', '', '', '', ''], red: ['', '', '', '', ''] },
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
