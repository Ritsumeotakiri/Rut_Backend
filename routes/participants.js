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

// POST create a new participant
router.post('/', async (req, res) => {
  const { bibNumber, name, raceId } = req.body;

  if (!bibNumber || !name || !raceId) {
    return res.status(400).json({ error: 'bibNumber, name, and raceId are required' });
  }

  try {
    const participant = new Participant({ bibNumber, name, raceId });
    await participant.save();
    res.status(201).json(participant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create participant' });
  }
});

// DELETE participant by ID
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
    res.status(500).json({ error: 'Failed to get participants by raceId' });
  }
});

// PUT update participant by ID
router.put('/:id', async (req, res) => {
  const { bibNumber, name } = req.body;

  if (!bibNumber && !name) {
    return res.status(400).json({ error: 'No data to update' });
  }

  try {
    const updated = await Participant.findByIdAndUpdate(
      req.params.id,
      { bibNumber, name },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update participant' });
  }
});

module.exports = router;
