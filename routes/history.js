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
    // Find all players in this race
    const participants = await Participant.find({ raceId });

    if (participants.length === 0) {
      return res.status(404).json({ error: 'No participants found for this race' });
    }

    const historyData = participants.map(p => {
      const swim = p.swimTime || 0;
      const cycle = p.cycleTime || 0;
      const run = p.runTime || 0;
      const total = swim + cycle + run;

      return {
        raceId,
        raceName,
        participantId: p._id,
        participantName: p.name,
        bibNumber: p.bibNumber,
        swimTime: swim,
        cycleTime: cycle,
        runTime: run,
        totalTime: total,
      };
    });

    await HistoryResult.insertMany(historyData);

    res.json({
      message: `✅ ${historyData.length} participant results saved to history`,
      data: historyData
    });
  } catch (err) {
    console.error('❌ Failed to save history:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
