// =============================================
// SKILL-ORBIT — routes/leaderboard.js
// GET  /api/leaderboard         — top 50 global
// GET  /api/leaderboard/me      — current user rank & entry
// =============================================

const express = require('express');
const router  = express.Router();

const { getLeaderboard, getUserRank, queries } = require('../db/database');
const { getLevelInfo }                         = require('../utils/levelCalc');
const { requireAuth, optionalAuth }            = require('../middleware/auth');

// ── GET /api/leaderboard ──────────────────────────────────────────────────────

router.get('/', optionalAuth, (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const league = req.query.league;
    const period = req.query.period || 'alltime';
    const entries = getLeaderboard({ limit, league, period });

    const enriched = entries.map((row, index) => {
      const levelInfo = getLevelInfo(row.xp);
      const badgeCount = queries.getBadgeCount.get(row.id);
      const badgesCount = badgeCount ? badgeCount.count : 0;
      return {
        rank:         index + 1,
        id:           row.id,
        name:         row.name,
        avatar:       row.avatar,
        xp:           row.xp,
        weeklyXP:     period === 'weekly' ? (row.weeklyXP || 0) : undefined,
        league:       row.league,
        streak:       row.streak,
        lessonsCount: row.lessons_count,
        badgesCount:  badgesCount,
        level:        levelInfo.current.level,
        levelTitle:   levelInfo.current.title,
        joinedAt:     row.joined_at,
        lastSeen:     row.last_seen,
        isMe:         req.userId ? row.id === req.userId : false,
      };
    });

    return res.json({ leaderboard: enriched, total: enriched.length });
  } catch (err) {
    console.error('[leaderboard/]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── GET /api/leaderboard/me ───────────────────────────────────────────────────

router.get('/me', requireAuth, (req, res) => {
  try {
    const rank = getUserRank(req.userId);
    const progress = queries.getProgress.get(req.userId);
    const user     = queries.findUserById.get(req.userId);

    if (!user) return res.status(404).json({ error: 'User not found.' });

    const xp       = progress ? progress.xp_total : 0;
    const levelInfo = getLevelInfo(xp);
    const completedLessons = progress
      ? JSON.parse(progress.completed_lessons || '[]')
      : [];

    return res.json({
      rank,
      entry: {
        id:          user.id,
        name:        user.name,
        avatar:      user.avatar,
        xp,
        streak:      progress ? (progress.streak || 0) : 0,
        lessonsCount: completedLessons.length,
        level:       levelInfo.current.level,
        levelTitle:  levelInfo.current.title,
        joinedAt:    user.joined_at,
      },
    });
  } catch (err) {
    console.error('[leaderboard/me]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
