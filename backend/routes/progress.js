// =============================================
// SKILL-ORBIT — routes/progress.js
// GET    /api/progress            — load full progress
// POST   /api/progress/lesson     — mark lesson complete
// POST   /api/progress/quiz       — record quiz answer
// POST   /api/progress/challenge  — award challenge XP
// POST   /api/progress/sync       — full sync from localStorage (migration)
// DELETE /api/progress/reset      — reset all progress
// =============================================

const express = require('express');
const { getLeague } = require('../utils/levelCalc');
const router  = express.Router();

const { queries }        = require('../db/database');
const { requireAuth }    = require('../middleware/auth');
const { XP_REWARDS }     = require('../utils/levelCalc');
const { checkNewBadges } = require('../utils/badges');

// ── Helper: parse JSON fields from DB row ─────────────────────────────────────

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

function stringifyAndSave(userId, p) {
  const league = getLeague(p.xp_total);
  queries.updateProgress.run(
    p.xp_total,
    p.streak,
    p.last_visit,
    JSON.stringify(p.completed_lessons),
    JSON.stringify(p.lesson_xp),
    JSON.stringify(p.quiz_xp),
    JSON.stringify(p.challenge_xp),
    JSON.stringify(p.activity_log),
    league,
    userId
  );
}

// ── Streak helpers ────────────────────────────────────────────────────────────

function updateStreak(p) {
  const today = new Date().toDateString();
  const last  = p.last_visit ? new Date(p.last_visit).toDateString() : null;

  if (!last || last === today) {
    // Same day — no streak change
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (last === yesterday.toDateString()) {
      p.streak = (p.streak || 0) + 1;
    } else {
      p.streak = 1;
    }
  }
  p.last_visit = new Date().toISOString();
}

function recordActivityXP(amount, p) {
  const today = new Date().toISOString().slice(0, 10);
  p.activity_log[today] = (p.activity_log[today] || 0) + amount;
}

// ── Ensure progress row exists for user ───────────────────────────────────────

function ensureProgress(userId) {
  queries.createProgress.run(userId);
  return parseProgress(queries.getProgress.get(userId));
}

// ── Badge check & award ───────────────────────────────────────────────────────

function awardNewBadges(userId, progress) {
  const existingBadges = queries.getUserBadges.all(userId).map((b) => b.badge_id);
  const newBadges = checkNewBadges(progress, existingBadges);
  newBadges.forEach((b) => queries.awardBadge.run(userId, b.id));
  return newBadges;
}

// ── GET /api/progress ─────────────────────────────────────────────────────────

router.get('/', requireAuth, (req, res) => {
  try {
    const p = ensureProgress(req.userId);
    const badges = queries.getUserBadges.all(req.userId);
    return res.json({ progress: p, badges });
  } catch (err) {
    console.error('[progress/GET]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── POST /api/progress/lesson ─────────────────────────────────────────────────

router.post('/lesson', requireAuth, (req, res) => {
  try {
    const { lessonId } = req.body;
    if (!lessonId || typeof lessonId !== 'string') {
      return res.status(400).json({ error: 'lessonId is required.' });
    }

    const p = ensureProgress(req.userId);
    let xpAwarded = 0;

    // Add to completed list (idempotent)
    if (!p.completed_lessons.includes(lessonId)) {
      p.completed_lessons.push(lessonId);
    }

    // Award lesson XP only once
    if (!p.lesson_xp[lessonId]) {
      p.lesson_xp[lessonId] = XP_REWARDS.LESSON;
      p.xp_total += XP_REWARDS.LESSON;
      xpAwarded = XP_REWARDS.LESSON;
      recordActivityXP(XP_REWARDS.LESSON, p);
    }

    updateStreak(p);
    stringifyAndSave(req.userId, p);

    const newBadges = awardNewBadges(req.userId, p);

    return res.json({
      xpAwarded,
      xpTotal:   p.xp_total,
      streak:    p.streak,
      newBadges: newBadges.map((b) => ({ id: b.id, name: b.name, icon: b.icon })),
    });
  } catch (err) {
    console.error('[progress/lesson]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── POST /api/progress/quiz ───────────────────────────────────────────────────

router.post('/quiz', requireAuth, (req, res) => {
  try {
    const { lessonId, questionIndex, correct } = req.body;

    if (!lessonId || questionIndex === undefined) {
      return res.status(400).json({ error: 'lessonId and questionIndex are required.' });
    }

    const p = ensureProgress(req.userId);
    if (!p.quiz_xp[lessonId]) p.quiz_xp[lessonId] = {};

    const key = String(questionIndex);

    // Already answered — return existing result
    if (key in p.quiz_xp[lessonId]) {
      return res.json({
        xpAwarded:     0,
        alreadyAnswered: true,
        earned:        p.quiz_xp[lessonId][key],
        xpTotal:       p.xp_total,
      });
    }

    let xpAwarded = 0;
    if (correct) {
      p.quiz_xp[lessonId][key] = XP_REWARDS.QUIZ_Q;
      p.xp_total += XP_REWARDS.QUIZ_Q;
      xpAwarded = XP_REWARDS.QUIZ_Q;
      recordActivityXP(XP_REWARDS.QUIZ_Q, p);
    } else {
      p.quiz_xp[lessonId][key] = 0; // lock out
    }

    stringifyAndSave(req.userId, p);
    const newBadges = awardNewBadges(req.userId, p);

    return res.json({
      xpAwarded,
      alreadyAnswered: false,
      earned:   correct ? XP_REWARDS.QUIZ_Q : 0,
      xpTotal:  p.xp_total,
      newBadges: newBadges.map((b) => ({ id: b.id, name: b.name, icon: b.icon })),
    });
  } catch (err) {
    console.error('[progress/quiz]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── POST /api/progress/challenge ──────────────────────────────────────────────

router.post('/challenge', requireAuth, (req, res) => {
  try {
    const { lessonId } = req.body;
    if (!lessonId) return res.status(400).json({ error: 'lessonId is required.' });

    const p = ensureProgress(req.userId);

    if (p.challenge_xp[lessonId]) {
      return res.json({ xpAwarded: 0, alreadyEarned: true, xpTotal: p.xp_total });
    }

    p.challenge_xp[lessonId] = XP_REWARDS.CHALLENGE;
    p.xp_total += XP_REWARDS.CHALLENGE;
    recordActivityXP(XP_REWARDS.CHALLENGE, p);
    stringifyAndSave(req.userId, p);

    const newBadges = awardNewBadges(req.userId, p);

    return res.json({
      xpAwarded:    XP_REWARDS.CHALLENGE,
      alreadyEarned: false,
      xpTotal:      p.xp_total,
      newBadges:    newBadges.map((b) => ({ id: b.id, name: b.name, icon: b.icon })),
    });
  } catch (err) {
    console.error('[progress/challenge]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── POST /api/progress/sync ───────────────────────────────────────────────────
// Full sync from localStorage — used on first login (migration).

router.post('/sync', requireAuth, (req, res) => {
  try {
    const { progress: clientProgress } = req.body;
    if (!clientProgress) {
      return res.status(400).json({ error: 'progress object is required.' });
    }

    const serverP = ensureProgress(req.userId);

    // Merge: take max XP (never reduce), union completed lessons
    const mergedLessons = Array.from(
      new Set([...serverP.completed_lessons, ...(clientProgress.completedLessons || [])])
    );

    // Merge lesson XP
    const mergedLessonXP = { ...clientProgress.lessonXP, ...serverP.lesson_xp };

    // Merge quiz XP (union at question level)
    const mergedQuizXP = { ...clientProgress.quizXP };
    for (const [lid, qs] of Object.entries(serverP.quiz_xp)) {
      if (!mergedQuizXP[lid]) mergedQuizXP[lid] = {};
      Object.assign(mergedQuizXP[lid], qs);
    }

    // Merge challenge XP
    const mergedChallengeXP = { ...clientProgress.challengeXP, ...serverP.challenge_xp };

    // Recalculate total XP from sources
    const lessonXPTotal    = Object.values(mergedLessonXP).reduce((s, v) => s + v, 0);
    const quizXPTotal      = Object.values(mergedQuizXP).flatMap(Object.values).reduce((s, v) => s + v, 0);
    const challengeXPTotal = Object.values(mergedChallengeXP).reduce((s, v) => s + v, 0);
    const totalXP          = lessonXPTotal + quizXPTotal + challengeXPTotal;

    // Merge activity log
    const mergedLog = { ...clientProgress.activityLog };
    for (const [date, xp] of Object.entries(serverP.activity_log)) {
      mergedLog[date] = Math.max(mergedLog[date] || 0, xp);
    }

    const merged = {
      xp_total:          totalXP,
      streak:            Math.max(serverP.streak || 0, clientProgress.streak || 0),
      last_visit:        serverP.last_visit || clientProgress.lastVisit || new Date().toISOString(),
      completed_lessons: mergedLessons,
      lesson_xp:         mergedLessonXP,
      quiz_xp:           mergedQuizXP,
      challenge_xp:      mergedChallengeXP,
      activity_log:      mergedLog,
    };

    stringifyAndSave(req.userId, merged);
    const newBadges = awardNewBadges(req.userId, { ...merged, xp_total: totalXP });

    return res.json({
      message:   'Progress synced successfully.',
      progress:  merged,
      newBadges: newBadges.map((b) => ({ id: b.id, name: b.name, icon: b.icon })),
    });
  } catch (err) {
    console.error('[progress/sync]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── DELETE /api/progress/reset ────────────────────────────────────────────────

router.delete('/reset', requireAuth, (req, res) => {
  try {
    const fresh = {
      xp_total: 0, streak: 0, last_visit: null,
      completed_lessons: [], lesson_xp: {}, quiz_xp: {}, challenge_xp: {},
      activity_log: {},
    };
    stringifyAndSave(req.userId, fresh);

    // Remove all badges
    const { db } = require('../db/database');
    db.prepare('DELETE FROM badges WHERE user_id = ?').run(req.userId);

    return res.json({ message: 'Progress reset successfully.' });
  } catch (err) {
    console.error('[progress/reset]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
