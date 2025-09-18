const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Note = require('../models/Note');

// simple admin check middleware
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/admin/users - list all users
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/notes - list all notes
router.get('/notes', auth, isAdmin, async (req, res) => {
  try {
    const notes = await Note.find().populate('user', 'email name role').sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/notes/:id - delete any note
router.delete('/notes/:id', auth, isAdmin, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    await note.remove();
    res.json({ message: 'Note removed by admin' });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
