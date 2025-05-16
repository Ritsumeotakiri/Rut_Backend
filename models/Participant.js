const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  bibNumber: { type: String, required: true },
  name: { type: String, required: true },
  raceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Race', required: false }, // optional
});

module.exports = mongoose.model('Participant', ParticipantSchema);
