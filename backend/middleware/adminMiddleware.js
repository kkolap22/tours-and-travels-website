const User = require('../models/User');

/**
 * Admin Middleware
 * Checks if the authenticated user has admin role
 * Must be used after authMiddleware
 */
const adminMiddleware = async (req, res, next) => {
  try {
    // Check if user ID exists from authMiddleware
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized: Please login first' });
    }

    // Fetch user from database
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has admin role
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    // Attach user to request for use in controllers
    req.user = user;
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = adminMiddleware;
