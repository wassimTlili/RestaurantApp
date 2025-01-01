const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

exports.authenticate = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;

      // Check if the user's role is allowed
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
};
