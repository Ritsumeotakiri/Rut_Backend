const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  bibNumber: { type: String, required: true },
  name: { type: String, required: true },
  
});

module.exports = mongoose.model('Participant', ParticipantSchema);
