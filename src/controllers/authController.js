const authService  = require('../services/authService');
const isProd = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  secure: true,      // REQUIRED for SameSite=None
  sameSite: "none",  // REQUIRED for cross-origin
  maxAge: 24 * 60 * 60 * 1000,
};
const register = async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);

    res.cookie('token', token, cookieOptions);
      


    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



const login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);

    res.cookie('token', token, cookieOptions);
    
    res.status(200).json({ message: 'Login successful',  user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login };
