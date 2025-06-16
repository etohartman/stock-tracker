const Stock = require("../models/stock");

module.exports = {
  create,
  update,
  deleteNote,
};

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const stock = await Stock.findById(req.params.stockId);
    stock.notes.push(req.body);
    await stock.save();
    const newNote = stock.notes[stock.notes.length - 1];
    newNote._doc.user = req.user;
    res.status(201).json(newNote);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function update(req, res) {
  try {
    const stock = await Stock.findOne({ "notes._id": req.params.noteId });
    const note = stock.notes.id(req.params.noteId);
    if (!note.user.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    note.content = req.body.content;
    await stock.save();
    res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function deleteNote(req, res) {
  try {
    const stock = await Stock.findOne({ "notes._id": req.params.noteId });
    console.log({ stock });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    stock.notes.pull({ _id: req.params.noteId });
    await stock.save();
    console.log(stock.notes);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("DELETE NOTE ERROR:", err);
    res.status(500).json({ err: err.message });
  }
}