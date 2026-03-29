// =============================================
// SKILL-ORBIT — routes/gamification.js
// GET  /api/badges        — all badges + earned status
// POST /api/badges/check  — re-evaluate badges for current user
// =============================================

const express = require('express');
const router  = express.Router();

const { queries }        = require('../db/database');
const { requireAuth }    = require('../middleware/auth');
const { BADGES, checkNewBadges } = require('../utils/badges');

function parseProgress(row) {
  if (!row) return null;
  return {
    ...row,
    completed_lessons: JSON.parse(row.completed_lessons || '[]'),
    lesson_xp:         JSON.parse(row.lesson_xp   || '{}'),
    quiz_xp:           JSON.parse(row.quiz_xp      || '{}'),
    challenge_xp:      JSON.parse(row.challenge_xp || '{}'),
    activity_log:      JSON.parse(row.activity_log || '{}'),
  };
}

// ── GET /api/badges ───────────────────────────────────────────────────────────

router.get('/', requireAuth, (req, res) => {
  try {
    const earnedRows = queries.getUserBadges.all(req.userId);
    const earnedIds  = earnedRows.map((r) => r.badge_id);

    const allBadges = BADGES.map((b) => {
      const earnedRow = earnedRows.find((r) => r.badge_id === b.id);
      return {
        id:          b.id,
        name:        b.name,
        icon:        b.icon,
        description: b.description,
        earned:      earnedIds.includes(b.id),
        earnedAt:    earnedRow ? earnedRow.earned_at : null,
      };
    });

    return res.json({ badges: allBadges });
  } catch (err) {
    console.error('[badges/GET]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── POST /api/badges/check ────────────────────────────────────────────────────
// Re-evaluate all badge conditions — awards any newly earned ones.

router.post('/check', requireAuth, (req, res) => {
  try {
    const progressRow = queries.getProgress.get(req.userId);
    const p           = parseProgress(progressRow);

    if (!p) return res.json({ newBadges: [] });

    const existingBadges = queries.getUserBadges.all(req.userId).map((b) => b.badge_id);
    const newBadges      = checkNewBadges(p, existingBadges);

    newBadges.forEach((b) => queries.awardBadge.run(req.userId, b.id));

    return res.json({
      newBadges: newBadges.map((b) => ({
        id:   b.id,
        name: b.name,
        icon: b.icon,
        description: b.description,
      })),
    });
  } catch (err) {
    console.error('[badges/check]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
