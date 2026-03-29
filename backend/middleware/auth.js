// =============================================
// SKILL-ORBIT — middleware/auth.js
// JWT verification middleware
// =============================================

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skill-orbit-super-secret-key-change-in-prod';

/**
 * Middleware: require a valid JWT in Authorization header.
 * Sets req.userId and req.userEmail on success.
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId    = payload.userId;
    req.userEmail = payload.email;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
}

/**
 * Middleware: optionally authenticate (sets req.userId if token present,
 * but does not block unauthenticated requests).
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.userId    = payload.userId;
      req.userEmail = payload.email;
    } catch {
      // ignore invalid token — treat as unauthenticated
    }
  }
  next();
}

/**
 * Generate a JWT token for a user.
 */
function signToken(userId, email) {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '30d' }  // long-lived for a learning platform
  );
}

module.exports = { requireAuth, optionalAuth, signToken, JWT_SECRET };
