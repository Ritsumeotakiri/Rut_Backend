const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  bibNumber: String,
  name: String,
  raceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Race' },
});

module.exports = mongoose.model('Participant', ParticipantSchema);
