const jwt = require('jsonwebtoken');

const generateJWT = (userId) => {
  const payload = { userId };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token valid for 1 day
  });

  return token;
};

module.exports = generateJWT;
