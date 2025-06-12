const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
  try {
    // Use username instead of email if that's your schema
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    const user = await User.create({ username, password });
    const token = createJWT(user);
    res.json({ token, user: { _id: user._id, username: user.username } });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error();
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json({ token, user: { _id: user._id, username: user.username } });
  } catch (err) {
    res.status(400).json({ message: 'Bad Credentials' });
  }
};

/*--- Helper Functions ---*/

function createJWT(user) {
  return jwt.sign(
    { _id: user._id, username: user.username },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

