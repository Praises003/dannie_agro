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

const getDirectReferrals = async (userId) => {
  const referrals = await User.findAll({
    where: { referredBy: userId },
    attributes: ['id', 'name', 'email', 'points', 'createdAt'],
  });
  return referrals;
};

const getReferralTree = async (userId) => {
  const levelOne = await User.findAll({
    where: { referredBy: userId },
    attributes: ['id', 'name', 'email', 'createdAt']
  });

  const levelOneIds = levelOne.map(u => u.id);

  const levelTwo = await User.findAll({
    where: { referredBy: levelOneIds },
    attributes: ['id', 'name', 'email', 'referredBy']
  });

  const tree = levelOne.map(user => ({
    ...user.toJSON(),
    referrals: levelTwo.filter(r => r.referredBy === user.id)
  }));

  return tree;
};

module.exports = { getProfile, updateProfile, getDirectReferrals, getReferralTree };