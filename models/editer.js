const mongoose = require('mongoose');

const editerSchema = new mongoose.Schema({
  phase: {
    type: String,
    // required: true,
  },
  turnData: {
    type: Object,
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
