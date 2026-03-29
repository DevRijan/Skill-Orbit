// =============================================
// SKILL-ORBIT — progress.js  v3.0
// Granular XP tracking: lesson + quiz + challenge
// Syncs to backend when online, localStorage when offline.
// =============================================

const STORAGE_KEY = 'skill-orbit-progress';

const DEFAULT_PROGRESS = {
  completedLessons: [],
  xp:               0,
  badges:           [],
  streak:           0,
  lastVisit:        null,
  activityLog:      {},
  lessonXP:         {},
  quizXP:           {},
  challengeXP:      {},
};

// ── XP reward constants (must match backend) ─────────────────────────────────

const LESSON_XP_REWARD    = 10;
const CHALLENGE_XP_REWARD = 10;
const QUIZ_XP_PER_Q       = 1;

// ── localStorage Load & Save ─────────────────────────────────────────────────

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULT_PROGRESS };
  try {
    const p = JSON.parse(raw);
    if (!p.lessonXP)    p.lessonXP    = {};
    if (!p.quizXP)      p.quizXP      = {};
    if (!p.challengeXP) p.challengeXP = {};
    if (!p.activityLog) p.activityLog = {};
    return p;
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  if (typeof syncLeaderboard === 'function') syncLeaderboard();
}

// ── Backend sync helpers ──────────────────────────────────────────────────────

function isAPIOnline() {
  return window.SkillOrbitAPI && window.SkillOrbitAPI.isOnline() && window.SkillOrbitAPI.isAuthenticated();
}

/**
 * Pull latest progress from server and sync into localStorage.
 * Called when the page loads and a user is authenticated.
 */
async function pullProgressFromServer() {
  if (!isAPIOnline()) return;
  try {
    const res = await window.SkillOrbitAPI.progress.load();
    const progress = res ? res.progress : null;
    if (!progress) return;

    // Map server field names → local field names
    const merged = {
      completedLessons: progress.completed_lessons || [],
      xp:               progress.xp_total          || 0,
      badges:           res.badges ? res.badges.map(b => b.badge_id || b) : [],
      streak:           progress.streak             || 0,
      lastVisit:        progress.last_visit         || null,
      activityLog:      progress.activity_log       || {},
      lessonXP:         progress.lesson_xp          || {},
      quizXP:           progress.quiz_xp            || {},
      challengeXP:      progress.challenge_xp       || {},
    };

    saveProgress(merged);
    return merged;
  } catch (err) {
    console.warn('[progress] Failed to pull from server:', err.message);
  }
}

// ── Mark lesson complete ──────────────────────────────────────────────────────

async function markLessonComplete(lessonId) {
  const progress  = loadProgress();
  let xpAwarded   = 0;

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }

  if (!progress.lessonXP[lessonId]) {
    progress.lessonXP[lessonId] = LESSON_XP_REWARD;
    progress.xp += LESSON_XP_REWARD;
    xpAwarded = LESSON_XP_REWARD;
    recordActivityXP(LESSON_XP_REWARD, progress);
  }

  progress.lastVisit = new Date().toISOString();
  updateStreak(progress);
  saveProgress(progress);

  // Sync to backend
  let newBadges = [];
  if (isAPIOnline()) {
    try {
      const res = await window.SkillOrbitAPI.progress.markLesson(lessonId);
      // Use server's authoritative XP value
      progress.xp    = res.xpTotal;
      progress.streak = res.streak;
      newBadges = res.newBadges || [];
      saveProgress(progress);
      // Show badge toasts for any newly unlocked badges
      if (typeof showBadgeToast === 'function') {
        newBadges.forEach(b => showBadgeToast(b));
      }
    } catch (err) {
      console.warn('[progress] Lesson sync failed:', err.message);
    }
  }

  return { progress, xpAwarded, newBadges };
}

// ── Award quiz XP for one question ───────────────────────────────────────────

async function awardQuizXP(lessonId, questionIndex) {
  const progress = loadProgress();
  if (!progress.quizXP[lessonId]) progress.quizXP[lessonId] = {};

  const key = String(questionIndex);
  if (key in progress.quizXP[lessonId]) {
    return { xpAwarded: 0, alreadyAnswered: true, earned: progress.quizXP[lessonId][key] };
  }

  progress.quizXP[lessonId][key] = QUIZ_XP_PER_Q;
  progress.xp += QUIZ_XP_PER_Q;
  recordActivityXP(QUIZ_XP_PER_Q, progress);
  saveProgress(progress);

  // Sync to backend
  if (isAPIOnline()) {
    try {
      const res = await window.SkillOrbitAPI.progress.recordQuiz(lessonId, questionIndex, true);
      progress.xp = res.xpTotal;
      saveProgress(progress);
    } catch (err) {
      console.warn('[progress] Quiz XP sync failed:', err.message);
    }
  }

  return { xpAwarded: QUIZ_XP_PER_Q, alreadyAnswered: false, earned: QUIZ_XP_PER_Q };
}

// ── Record wrong quiz answer ──────────────────────────────────────────────────

async function recordQuizWrong(lessonId, questionIndex) {
  const progress = loadProgress();
  if (!progress.quizXP[lessonId]) progress.quizXP[lessonId] = {};
  const key = String(questionIndex);
  if (!(key in progress.quizXP[lessonId])) {
    progress.quizXP[lessonId][key] = 0;
    saveProgress(progress);
  }

  // Sync to backend
  if (isAPIOnline()) {
    try {
      await window.SkillOrbitAPI.progress.recordQuiz(lessonId, questionIndex, false);
    } catch (err) {
      console.warn('[progress] Wrong quiz sync failed:', err.message);
    }
  }

  return { xpAwarded: 0 };
}

// ── Check if quiz question answered ──────────────────────────────────────────

function isQuizQuestionAnswered(lessonId, questionIndex) {
  const progress = loadProgress();
  const key = String(questionIndex);
  return progress.quizXP[lessonId] && (key in progress.quizXP[lessonId]);
}

// ── Get quiz XP summary for a lesson ─────────────────────────────────────────

function getQuizXPSummary(lessonId) {
  const progress = loadProgress();
  const qxp = progress.quizXP[lessonId] || {};
  const entries = Object.values(qxp);
  return {
    answered:  entries.length,
    correct:   entries.filter(v => v > 0).length,
    wrong:     entries.filter(v => v === 0).length,
    xpEarned:  entries.reduce((s, v) => s + v, 0),
  };
}

// ── Award challenge XP ────────────────────────────────────────────────────────

async function awardChallengeXP(lessonId) {
  const progress = loadProgress();
  if (progress.challengeXP[lessonId]) {
    return { xpAwarded: 0, alreadyEarned: true };
  }

  progress.challengeXP[lessonId] = CHALLENGE_XP_REWARD;
  progress.xp += CHALLENGE_XP_REWARD;
  recordActivityXP(CHALLENGE_XP_REWARD, progress);
  saveProgress(progress);

  // Sync to backend
  if (isAPIOnline()) {
    try {
      const res = await window.SkillOrbitAPI.progress.challenge(lessonId);
      progress.xp = res.xpTotal;
      saveProgress(progress);
    } catch (err) {
      console.warn('[progress] Challenge XP sync failed:', err.message);
    }
  }

  return { xpAwarded: CHALLENGE_XP_REWARD, alreadyEarned: false };
}

// ── Get full XP breakdown for a lesson ───────────────────────────────────────

function getLessonXPBreakdown(lessonId) {
  const progress   = loadProgress();
  const quizSummary = getQuizXPSummary(lessonId);
  return {
    lesson:    progress.lessonXP[lessonId]    || 0,
    quiz:      quizSummary.xpEarned,
    challenge: progress.challengeXP[lessonId] || 0,
    total:     (progress.lessonXP[lessonId] || 0) + quizSummary.xpEarned + (progress.challengeXP[lessonId] || 0),
    maxTotal:  LESSON_XP_REWARD + (10 * QUIZ_XP_PER_Q) + CHALLENGE_XP_REWARD,
  };
}

// ── Utility checks ────────────────────────────────────────────────────────────

function isLessonComplete(lessonId) {
  return loadProgress().completedLessons.includes(lessonId);
}

function getTotalXP() {
  return loadProgress().xp;
}

// ── Streak Logic ──────────────────────────────────────────────────────────────

function updateStreak(progress) {
  const today = new Date().toDateString();
  const last  = progress.lastVisit ? new Date(progress.lastVisit).toDateString() : null;

  if (!last || last === today) {
    // same day — no change
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (last === yesterday.toDateString()) {
      progress.streak = (progress.streak || 0) + 1;
    } else {
      progress.streak = 1;
    }
  }
  progress.lastVisit = new Date().toISOString();
}

// ── Module progress ───────────────────────────────────────────────────────────

function getModuleProgress(moduleId, curriculum) {
  const progress = loadProgress();
  const moduleLessons = curriculum.filter(l => l.module === moduleId);
  const completed     = moduleLessons.filter(l => progress.completedLessons.includes(l.id));
  return {
    total:     moduleLessons.length,
    completed: completed.length,
    percent:   moduleLessons.length ? Math.round((completed.length / moduleLessons.length) * 100) : 0,
  };
}

// ── Reset ─────────────────────────────────────────────────────────────────────

async function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);

  if (isAPIOnline()) {
    try {
      await window.SkillOrbitAPI.progress.reset();
    } catch (err) {
      console.warn('[progress] Reset sync failed:', err.message);
    }
  }
}

// ── Activity Log ──────────────────────────────────────────────────────────────

function recordActivityXP(amount = 10, progress = null) {
  const p = progress || loadProgress();
  if (!p.activityLog) p.activityLog = {};
  const today = new Date().toISOString().slice(0, 10);
  p.activityLog[today] = (p.activityLog[today] || 0) + amount;
  if (!progress) saveProgress(p);
}

function getActivityLog() {
  return loadProgress().activityLog || {};
}

function getHeatmapData(days = 63) {
  const log    = getActivityLog();
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({ date: key, xp: log[key] || 0 });
  }
  return result;
}
