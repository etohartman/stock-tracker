const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true }
});

module.exports = mongoose.model('Note', noteSchema);