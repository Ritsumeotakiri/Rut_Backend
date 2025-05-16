const express = require('express');
const router = express.Router();
const HistoryResult = require('../models/HistoryResult');

router.get('/race/:raceId', async (req, res) => {
  try {
    const results = await HistoryResult.find({ raceId: req.params.raceId })
      .populate('participantId')
      .sort({ totalTime: 1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
