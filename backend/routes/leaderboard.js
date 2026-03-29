// =============================================
// SKILL-ORBIT — routes/leaderboard.js  v2.0
// GET  /api/leaderboard            — top 50 global (all-time)
// GET  /api/leaderboard/weekly     — top 50 for current ISO week
// GET  /api/leaderboard/me         — current user rank & entry
// GET  /api/leaderboard/user/:id   — public profile of any user
// =============================================

const express = require('express');
const router  = express.Router();

const {
  getLeaderboard,
  getWeeklyLeaderboard,
  getUserRank,
  getUserPublicProfile,
  queries,
} = require('../db/database');
const { getLevelInfo }              = require('../utils/levelCalc');
const { BADGES }                   = require('../utils/badges');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// ── Helpers ─────────────────────────────────────────────────────────────────

function enrichRow(row, index, requestUserId) {
  const levelInfo = getLevelInfo(row.xp);
  return {
    rank:         index + 1,
    id:           row.id,
    name:         row.name,
    avatar:       row.avatar,
    xp:           row.xp,
    streak:       row.streak,
    lessonsCount: row.lessons_count,
    badgesCount:  row.badge_count || 0,
    level:        levelInfo.current.level,
    levelTitle:   levelInfo.current.title,
    joinedAt:     row.joined_at,
    lastSeen:     row.last_seen,
    isMe:         requestUserId ? String(row.id) === String(requestUserId) : false,
  };
}

// ── GET /api/leaderboard ─────────────────────────────────────────────────────

router.get('/', optionalAuth, (req, res) => {
  try {
    const limit   = Math.min(parseInt(req.query.limit) || 50, 100);
    const entries = getLeaderboard(limit);
    const enriched = entries.map((row, i) => enrichRow(row, i, req.userId));
    return res.json({ leaderboard: enriched, total: enriched.length, type: 'alltime' });
  } catch (err) {
    console.error('[leaderboard/]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── GET /api/leaderboard/weekly ───────────────────────────────────────────────

router.get('/weekly', optionalAuth, (req, res) => {
  try {
    const limit   = Math.min(parseInt(req.query.limit) || 50, 100);
    const entries = getWeeklyLeaderboard(limit);
    const enriched = entries.map((row, i) => enrichRow(row, i, req.userId));

    // Compute next Monday (week reset time)
    const now        = new Date();
    const day        = now.getUTCDay();
    const daysToNext = day === 0 ? 1 : 8 - day;
    const nextMonday = new Date(now);
    nextMonday.setUTCDate(now.getUTCDate() + daysToNext);
    nextMonday.setUTCHours(0, 0, 0, 0);

    return res.json({
      leaderboard: enriched,
      total:       enriched.length,
      type:        'weekly',
      weekResetAt: nextMonday.toISOString(),
    });
  } catch (err) {
    console.error('[leaderboard/weekly]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── GET /api/leaderboard/me ───────────────────────────────────────────────────

router.get('/me', requireAuth, (req, res) => {
  try {
    const rank      = getUserRank(req.userId);
    const progress  = queries.getProgress.get(req.userId);
    const user      = queries.findUserById.get(req.userId);

    if (!user) return res.status(404).json({ error: 'User not found.' });

    const xp       = progress ? progress.xp_total : 0;
    const levelInfo = getLevelInfo(xp);
    const completedLessons = progress
      ? JSON.parse(progress.completed_lessons || '[]')
      : [];

    // Count badges
    const badgeRows = queries.getUserBadges.all(req.userId);

    return res.json({
      rank,
      entry: {
        id:           user.id,
        name:         user.name,
        avatar:       user.avatar,
        xp,
        streak:       progress ? (progress.streak || 0) : 0,
        lessonsCount: completedLessons.length,
        badgesCount:  badgeRows.length,
        level:        levelInfo.current.level,
        levelTitle:   levelInfo.current.title,
        joinedAt:     user.joined_at,
      },
    });
  } catch (err) {
    console.error('[leaderboard/me]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── GET /api/leaderboard/user/:id ─────────────────────────────────────────────
// Public profile — no auth required

router.get('/user/:id', optionalAuth, (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID.' });

    const row = getUserPublicProfile(userId);
    if (!row) return res.status(404).json({ error: 'User not found.' });

    const levelInfo  = getLevelInfo(row.xp);
    const badgeRows  = queries.getUserBadges.all(userId);
    const earnedIds  = badgeRows.map(b => b.badge_id);

    // Enrich badge list with definitions
    const badgeList = BADGES.map(b => ({
      id:          b.id,
      name:        b.name,
      icon:        b.icon,
      description: b.description,
      earned:      earnedIds.includes(b.id),
      earnedAt:    (badgeRows.find(r => r.badge_id === b.id) || {}).earned_at || null,
    }));

    return res.json({
      profile: {
        id:           row.id,
        name:         row.name,
        avatar:       row.avatar,
        xp:           row.xp,
        streak:       row.streak,
        lessonsCount: row.lessons_count,
        badgesCount:  row.badge_count,
        level:        levelInfo.current.level,
        levelTitle:   levelInfo.current.title,
        nextLevel:    levelInfo.next ? levelInfo.next.title : null,
        nextLevelXP:  levelInfo.next ? levelInfo.next.minXP : null,
        xpPercent:    levelInfo.percent,
        joinedAt:     row.joined_at,
        lastSeen:     row.last_seen,
        badges:       badgeList,
        isMe:         req.userId ? String(row.id) === String(req.userId) : false,
      },
    });
  } catch (err) {
    console.error('[leaderboard/user/:id]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
