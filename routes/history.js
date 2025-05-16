const express = require('express');
const router = express.Router();
const HistoryResult = require('../models/historyResult');
const Participant = require('../models/Participant');

router.post('/:raceId/push-history', async (req, res) => {
  const { raceId } = req.params;
  const { raceName } = req.body;

  if (!raceName) {
    return res.status(400).json({ error: 'Race name is required' });
  }

  try {
    const participants = await Participant.find({ raceId });

    if (participants.length === 0) {
      return res.status(404).json({ error: 'No participants found for this race' });
    }

    const historyData = participants.map(p => {
      const swimTime = p.swimTime || 0;
      const cycleTime = p.cycleTime || 0;
      const runTime = p.runTime || 0;
      const totalTime = swimTime + cycleTime + runTime;

      return {
        raceId,
        raceName,
        participantId: p._id,
        participantName: p.name,      // ✅ Include name
        bibNumber: p.bibNumber,       // ✅ Include bib
        swimTime,
        cycleTime,
        runTime,
        totalTime,
      };
    });

    await HistoryResult.insertMany(historyData);

    res.json({ message: '✅ Results pushed to history', count: historyData.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Server error while pushing to history' });
  }
});

module.exports = router;
