const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// POST /api/notes - create note (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Title and description required' });
    const note = new Note({ user: req.user.id, title, description });
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/notes - get all notes for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/notes/:id - edit
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    note.title = title ?? note.title;
    note.description = description ?? note.description;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });
    await note.remove();
    res.json({ message: 'Note removed' });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
