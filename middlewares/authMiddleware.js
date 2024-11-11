const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if the token is present
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied, token not provided' });
  }

  // Extract the token from the Authorization header
  const bearerToken = token.split(' ')[1];

  try {
    // Verify the token
    const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
    
    // Attach user to request object
    req.user = await User.findById(verified.id).select('-password'); // Exclude the password field for security
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
