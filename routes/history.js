const express = require('express');
const router = express.Router();
const HistoryResult = require('../models/historyResult');

router.post('/save', async (req, res) => {
  const { results, raceName } = req.body;

  if (!raceName || !Array.isArray(results)) {
    return res.status(400).json({ error: 'raceName and results array are required' });
  }

  try {
    const historyDocs = results.map((r) => ({
      raceId: Date.now().toString(), // Generate one here just to group them
      raceName,
      participantId: r.participantId || null, // optional
      participantName: r.participantName,
      bibNumber: r.bibNumber,
      swimTime: r.swimTime,
      cycleTime: r.cycleTime,
      runTime: r.runTime,
      totalTime: r.totalTime,
    }));

    await HistoryResult.insertMany(historyDocs);

    res.json({
      message: `✅ ${historyDocs.length} static results saved`,
      data: historyDocs
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save results' });
  }
});

module.exports = router;
