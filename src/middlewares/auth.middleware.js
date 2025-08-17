const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer token"
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // إضافة بيانات المستخدم في req
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Authorization middleware for admin only
const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ error: 'Not authenticated' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  next();
};
// Authorization middleware for Teacher only
const authorizeTeacher = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ error: 'Not authenticated' });
  }

  if (req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  next();
};

// Authorization middleware for Student only
const authorizeStudent = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ error: 'Not authenticated' });
  }

  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  next();
};
module.exports = { authenticate, authorizeAdmin, authorizeTeacher, authorizeStudent };