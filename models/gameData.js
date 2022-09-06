const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  teamNames: {
    type: Object,
    required: true,
    default: { blue: 'BLUE TEAM', red: 'RED TEAM' },
  },

  mode: {
    type: Number,
    required: true,
  },

  password: {
    type: string,
  },

  banPickList: {
    type: Object,
    required: true,
    default: {
      banList: { blue: ['', '', '', '', ''], red: ['', '', '', '', ''] },
      pickList: { blue: ['', '', '', '', ''], red: ['', '', '', '', ''] },
    },
  },

  userList: {
    type: Object,
    required: true,
  },

  editer: {
    type: Object,
  },

  isProceeding: {
    type: Boolean,
    required: true,
    default: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 3600 * 24 * 3,
  },
});

module.exports = mongoose.model('gameData', gameSchema);
