const mongoose = require('mongoose');

const HistoryResultSchema = new mongoose.Schema({
  raceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Race' },
  raceName: String,
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
  swimTime: Number,
  cycleTime: Number,
  runTime: Number,
  totalTime: Number,
  pushedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HistoryResult', HistoryResultSchema);
