// =============================================
// SKILL-ORBIT — routes/auth.js
// POST /api/auth/register
// POST /api/auth/login
// GET  /api/auth/profile
// PUT  /api/auth/profile
// POST /api/auth/logout  (client-side token drop, server-side last_seen)
// =============================================

const express  = require('express');
const bcrypt   = require('bcryptjs');
const router   = express.Router();

const { queries }            = require('../db/database');
const { requireAuth, signToken } = require('../middleware/auth');

// ── Helpers ───────────────────────────────────────────────────────────────────

const VALID_AVATARS = [
  '🧑‍💻','👩‍🎨','🦸‍♂️','🧙‍♀️','🦊','🐉',
  '🌊','🔥','⚡','🌙','🎯','🚀',
];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeProfile(user) {
  return {
    id:       user.id,
    name:     user.name,
    email:    user.email,
    avatar:   user.avatar,
    joinedAt: user.joined_at,
    lastSeen: user.last_seen,
  };
}

// ── POST /api/auth/register ───────────────────────────────────────────────────

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Validate inputs
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ error: 'A valid email is required.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const cleanName   = name.trim().slice(0, 40);
    const cleanEmail  = email.trim().toLowerCase();
    const chosenAvatar = avatar && VALID_AVATARS.includes(avatar) ? avatar : '🚀';

    // Check if email already exists
    const existing = queries.findUserByEmail.get(cleanEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const result = queries.createUser.run(cleanName, cleanEmail, passwordHash, chosenAvatar);
    const userId = result.lastInsertRowid;

    // Create blank progress record
    queries.createProgress.run(userId);

    // Fetch the created user
    const user = queries.findUserById.get(userId);
    const token = signToken(userId, cleanEmail);

    return res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: safeProfile(user),
    });
  } catch (err) {
    console.error('[auth/register]', err);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = queries.findUserByEmail.get(email.trim().toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Update last seen
    queries.updateUserSeen.run(user.id);

    const token = signToken(user.id, user.email);
    const profile = queries.findUserById.get(user.id);

    return res.json({
      message: 'Login successful!',
      token,
      user: safeProfile(profile),
    });
  } catch (err) {
    console.error('[auth/login]', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

// ── GET /api/auth/profile ─────────────────────────────────────────────────────

router.get('/profile', requireAuth, (req, res) => {
  try {
    const user = queries.findUserById.get(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    queries.updateUserSeen.run(req.userId);
    return res.json({ user: safeProfile(user) });
  } catch (err) {
    console.error('[auth/profile]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── PUT /api/auth/profile ─────────────────────────────────────────────────────

router.put('/profile', requireAuth, (req, res) => {
  try {
    const { name, avatar } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name cannot be empty.' });
    }
    const cleanName    = name.trim().slice(0, 40);
    const cleanAvatar  = avatar && VALID_AVATARS.includes(avatar) ? avatar : undefined;

    // Get current profile to preserve avatar if not changing
    const current = queries.findUserById.get(req.userId);
    if (!current) return res.status(404).json({ error: 'User not found.' });

    queries.updateUserProfile.run(
      cleanName,
      cleanAvatar || current.avatar,
      req.userId
    );

    const updated = queries.findUserById.get(req.userId);
    return res.json({ message: 'Profile updated.', user: safeProfile(updated) });
  } catch (err) {
    console.error('[auth/profile PUT]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── POST /api/auth/logout ─────────────────────────────────────────────────────

router.post('/logout', requireAuth, (req, res) => {
  // JWT is stateless — client must drop the token.
  // We just update last_seen.
  queries.updateUserSeen.run(req.userId);
  return res.json({ message: 'Logged out. Clear your token on the client.' });
});

module.exports = router;
