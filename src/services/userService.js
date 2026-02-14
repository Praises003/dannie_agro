const { User } = require('../models');
const bcrypt = require('bcrypt');

const getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const updateProfile = async (userId, data) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;

  if (data.password) {
    user.password = await bcrypt.hash(data.password, 10);
  }

  await user.save();

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    referralCode: user.referralCode,
    points: user.points,
    earnings: user.earnings,
    rank: user.rank,
  };
};

module.exports = { getProfile, updateProfile };
