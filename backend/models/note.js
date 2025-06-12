const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  // Optionally, you can add a reference to the user who wrote the note:
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = noteSchema; // Export as schema, not model, for nesting