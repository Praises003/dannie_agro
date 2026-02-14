const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const generateJWT =  require('../utils/generateJWT')
const generateReferralCode = require('../utils/generateReferralCode');

const register = async (data) => {
  const { name, email, password, referralCode } = data;

  if (!referralCode) {
    throw new Error("Referral code is required");
  }

  // Find referrer
  const referrer = await User.findOne({
    where: { referralCode }
  });

  if (!referrer) {
    throw new Error("Invalid referral code");
  }

  // Prevent duplicate email
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  //Prevention of self referral
  if (email === referrer.email) {
    throw new Error("You cannot refer yourself");
  }

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    referralCode: generateReferralCode(name),
    referredBy: referrer.id,
  });

  const token = generateJWT(newUser.id);

  return { user: newUser, token };
};


const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin, referralCode: user.referralCode } };
};

module.exports = { register, login };
