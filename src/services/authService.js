const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.register = async (username, password) => {
  const existing = await User.findOne({ where: { username } });
  if (existing) throw new Error('Username already exists');
  return await User.create({ username, password });
};

exports.login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('User not found');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};