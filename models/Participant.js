const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  bibNumber: String,
  name: String,
  raceId: { type: String, required: true },
});

module.exports = mongoose.model('Participant', ParticipantSchema);
