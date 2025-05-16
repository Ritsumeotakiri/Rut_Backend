const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  raceId: { type: String, required: true }, // 👈 changed from ObjectId to String
  name: { type: String, required: true },
  bibNumber: { type: String },
  swimTime: { type: Number, default: 0 },
  cycleTime: { type: Number, default: 0 },
  runTime: { type: Number, default: 0 },
});

module.exports = mongoose.model('Participant', participantSchema);
