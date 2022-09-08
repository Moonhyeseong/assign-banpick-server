const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  blueTeamName: {
    type: String,
    required: true,
    default: 'BLUE TEAM',
  },

  redTeamName: {
    type: String,
    required: true,
    default: 'RED TEAM',
  },

  mode: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
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
    default: false,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 10000,
  },
});

module.exports = mongoose.model('gameData', gameDataSchema);
