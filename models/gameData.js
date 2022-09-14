const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: '',
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

  timer: {
    type: Boolean,
    required: true,
    default: true,
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

  banpickTurnData: {
    type: Object,
    default: [
      { phase: 'ban', side: 'blue', role: 'TOP' },
      { phase: 'ban', side: 'red', role: 'TOP' },
      { phase: 'ban', side: 'blue', role: 'TOP' },
      { phase: 'ban', side: 'red', role: 'TOP' },
      { phase: 'ban', side: 'blue', role: 'TOP' },
      { phase: 'ban', side: 'red', role: 'TOP' },
      { phase: 'pick', side: 'blue', role: 'TOP' },
      { phase: 'pick', side: 'red', role: 'TOP' },
      { phase: 'pick', side: 'red', role: 'JUNGLE' },
      { phase: 'pick', side: 'blue', role: 'JUNGLE' },
      { phase: 'pick', side: 'blue', role: 'MID' },
      { phase: 'pick', side: 'red', role: 'MID' },
      { phase: 'ban', side: 'red', role: 'TOP' },
      { phase: 'ban', side: 'blue', role: 'TOP' },
      { phase: 'ban', side: 'red', role: 'TOP' },
      { phase: 'ban', side: 'blue', role: 'TOP' },
      { phase: 'pick', side: 'red', role: 'ADC' },
      { phase: 'pick', side: 'blue', role: 'ADC' },
      { phase: 'pick', side: 'blue', role: 'SUPPORT' },
      { phase: 'pick', side: 'red', role: 'SUPPORT' },
    ],
  },

  banpickCount: {
    type: Number,
    default: 0,
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
