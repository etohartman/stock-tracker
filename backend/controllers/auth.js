const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password required' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already taken' });
    }
    const user = await User.create({ name, email, password });
    const token = createJWT(user);
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ message: 'Bad Credentials' });
  }
};

function createJWT(user) {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}