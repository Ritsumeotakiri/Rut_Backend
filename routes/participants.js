const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');

// GET all participants
router.get('/', async (req, res) => {
  const participants = await Participant.find();
  res.json(participants);
});

// POST create a new participant (with raceId)
router.post('/', async (req, res) => {
  const { bibNumber, name, raceId } = req.body;

  if (!bibNumber || !name || !raceId) {
    return res.status(400).json({ error: 'bibNumber, name, and raceId are required' });
  }

  const participant = new Participant({ bibNumber, name, raceId });
  await participant.save();
  res.json(participant);
});

// DELETE a participant by ID
router.delete('/:id', async (req, res) => {
  await Participant.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// GET participants by raceId
router.get('/race/:raceId', async (req, res) => {
  const participants = await Participant.find({ raceId: req.params.raceId });
  res.json(participants);
});

// Update a participant by ID
router.put('/:id', async (req, res) => {
  const { bibNumber, name } = req.body;
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
