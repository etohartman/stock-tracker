const mongoose = require('mongoose');
const noteSchema = require('./note');

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  shares: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notes: [noteSchema] // <-- NESTED NOTES
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);