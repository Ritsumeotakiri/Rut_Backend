const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');

// GET all participants
router.get('/', async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch participants' });
  }
});

// POST create a new participant (raceId is optional)
router.post('/', async (req, res) => {
  try {
    const { bibNumber, name, raceId } = req.body;

    if (!bibNumber || !name) {
      return res.status(400).json({ error: 'bibNumber and name are required' });
    }

    const participantData = { bibNumber, name };
    if (raceId) {
      participantData.raceId = raceId;
    }

    const participant = new Participant(participantData);
    await participant.save();

    res.json(participant);
  } catch (err) {
    console.error('❌ Failed to create participant:', err);
    res.status(500).json({ error: 'Failed to create participant' });
  }
});

// DELETE a participant by ID
router.delete('/:id', async (req, res) => {
  try {
    await Participant.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete participant' });
  }
});

// GET participants by raceId
router.get('/race/:raceId', async (req, res) => {
  try {
    const participants = await Participant.find({ raceId: req.params.raceId });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch participants by raceId' });
  }
});

// PUT update a participant by ID
router.put('/:id', async (req, res) => {
  try {
    const { bibNumber, name } = req.body;
    const updated = await Participant.findByIdAndUpdate(
      req.params.id,
      { bibNumber, name },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('❌ Failed to update participant:', err);
    res.status(400).json({ error: 'Failed to update participant' });
  }
});

module.exports = router;
