const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required.' });
  }

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    // Create and save a new user
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    
    await user.save();
    const token = user.generateJwt();
    res.status(201).json({ token });
  } catch (err) {
    // Handle duplicate key error specifically
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required.' });
  }

  passport.authenticate('local', (err, user, info) => {
    // Handle errors from Passport
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ message: 'Authentication error', error: err.message });
    }
    
    // User authenticated successfully
    if (user) {
      const token = user.generateJwt();
      return res.status(200).json({ token });
    }
    
    // User not found or invalid credentials
    res.status(401).json(info || { message: 'Invalid email or password.' });
  })(req, res);
};

module.exports = {
  register,
  login
};
