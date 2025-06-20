const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    // Use process.env.SECRET for consistency
    const decoded = jwt.verify(token, process.env.SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};