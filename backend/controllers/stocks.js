const Stock = require('../models/stock');

exports.getAll = async (req, res) => {
  const stocks = await Stock.find({ user: req.user._id });
  res.json(stocks);
};

exports.create = async (req, res) => {
  const stock = new Stock({ ...req.body, user: req.user._id });
  await stock.save();
  res.status(201).json(stock);
};

exports.update = async (req, res) => {
  const stock = await Stock.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!stock) return res.status(404).json({ error: 'Not found' });
  res.json(stock);
};

exports.delete = async (req, res) => {
  const stock = await Stock.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!stock) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};