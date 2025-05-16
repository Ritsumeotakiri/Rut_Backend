const Race = require('../models/Race');
const Result = require('../models/Result');
const HistoryResult = require('../models/HistoryResult');

router.post('/:id/push-history', async (req, res) => {
  try {
    const race = await Race.findById(req.params.id);
    if (!race) return res.status(404).json({ error: 'Race not found' });

    const liveResults = await Result.find({ raceId: race._id });

    const historyResults = liveResults.map(result => ({
      raceId: result.raceId,
      raceName: race.name, // ✅ include race name
      participantId: result.participantId,
      swimTime: result.swimTime,
      cycleTime: result.cycleTime,
      runTime: result.runTime,
      totalTime: result.totalTime,
    }));

    await HistoryResult.insertMany(historyResults);

    res.json({ success: true, count: historyResults.length });
  } catch (err) {
    console.error('❌ Failed to push history:', err);
    res.status(500).json({ error: 'Failed to push results to history' });
  }
});
