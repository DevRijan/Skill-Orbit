// =============================================
// SKILL-ORBIT — progress.js  v2
// Granular XP tracking: lesson + quiz + challenge
// =============================================

const STORAGE_KEY = 'skill-orbit-progress';

/**
 * Default progress data structure.
 * XP is split into 3 independent, one-time-earn sources.
 */
const DEFAULT_PROGRESS = {
  completedLessons: [],   // lesson IDs where theory was read
  xp: 0,                  // total XP across all sources
  badges: [],
  streak: 0,
  lastVisit: null,
  activityLog: {},        // { 'YYYY-MM-DD': xpAmount }

  // ── NEW Granular XP tracking ──────────────
  lessonXP:    {},        // { 'html-01': 10 } — XP from lesson completion
  quizXP:      {},        // { 'html-01': { '0': 1, '1': 0, '2': 1 } } — per question
  challengeXP: {},        // { 'html-01': 10 } — XP from code challenge
};

// ── Load & Save ─────────────────────────────────
function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULT_PROGRESS };
  try {
    const p = JSON.parse(raw);
    // Migrate older saves missing new fields
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
  // Sync current user to leaderboard after every save
  if (typeof syncLeaderboard === 'function') syncLeaderboard();
}

// ── Mark lesson complete (theory XP) ────────────
// Awards LESSON_XP_REWARD exactly once per lesson.
const LESSON_XP_REWARD    = 10;
const CHALLENGE_XP_REWARD = 10;
const QUIZ_XP_PER_Q       = 1;

function markLessonComplete(lessonId) {
  const progress = loadProgress();
  const isNew = !progress.completedLessons.includes(lessonId);
  let xpAwarded = 0;

  if (isNew) {
    progress.completedLessons.push(lessonId);
  }

  // Award lesson XP only once
  if (!progress.lessonXP[lessonId]) {
    progress.lessonXP[lessonId] = LESSON_XP_REWARD;
    progress.xp += LESSON_XP_REWARD;
    xpAwarded = LESSON_XP_REWARD;
    recordActivityXP(LESSON_XP_REWARD, progress);
  }

  progress.lastVisit = new Date().toISOString();
  updateStreak(progress);
  saveProgress(progress);
  return { progress, xpAwarded };
}

// ── Award quiz XP for one question ──────────────
// Returns { xpAwarded, alreadyAnswered }
function awardQuizXP(lessonId, questionIndex) {
  const progress = loadProgress();
  if (!progress.quizXP[lessonId]) progress.quizXP[lessonId] = {};

  const key = String(questionIndex);
  // Already answered (correct or wrong) — no change
  if (key in progress.quizXP[lessonId]) {
    return { xpAwarded: 0, alreadyAnswered: true, earned: progress.quizXP[lessonId][key] };
  }

  // Mark as correct — award 1 XP
  progress.quizXP[lessonId][key] = QUIZ_XP_PER_Q;
  progress.xp += QUIZ_XP_PER_Q;
  recordActivityXP(QUIZ_XP_PER_Q, progress);
  saveProgress(progress);
  return { xpAwarded: QUIZ_XP_PER_Q, alreadyAnswered: false, earned: QUIZ_XP_PER_Q };
}

// ── Record wrong quiz answer (locks out XP) ─────
function recordQuizWrong(lessonId, questionIndex) {
  const progress = loadProgress();
  if (!progress.quizXP[lessonId]) progress.quizXP[lessonId] = {};
  const key = String(questionIndex);
  if (!(key in progress.quizXP[lessonId])) {
    progress.quizXP[lessonId][key] = 0; // 0 = answered wrong, locked out
    saveProgress(progress);
  }
  return { xpAwarded: 0 };
}

// ── Check if quiz question has been answered ─────
function isQuizQuestionAnswered(lessonId, questionIndex) {
  const progress = loadProgress();
  const key = String(questionIndex);
  return progress.quizXP[lessonId] && (key in progress.quizXP[lessonId]);
}

// ── Get quiz XP totals for a lesson ─────────────
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

// ── Award challenge XP (code editor) ────────────
function awardChallengeXP(lessonId) {
  const progress = loadProgress();
  if (progress.challengeXP[lessonId]) {
    return { xpAwarded: 0, alreadyEarned: true };
  }
  progress.challengeXP[lessonId] = CHALLENGE_XP_REWARD;
  progress.xp += CHALLENGE_XP_REWARD;
  recordActivityXP(CHALLENGE_XP_REWARD, progress);
  saveProgress(progress);
  return { xpAwarded: CHALLENGE_XP_REWARD, alreadyEarned: false };
}

// ── Get full XP breakdown for a lesson ──────────
function getLessonXPBreakdown(lessonId) {
  const progress = loadProgress();
  const quizSummary = getQuizXPSummary(lessonId);
  return {
    lesson:    progress.lessonXP[lessonId]    || 0,
    quiz:      quizSummary.xpEarned,
    challenge: progress.challengeXP[lessonId] || 0,
    total:     (progress.lessonXP[lessonId] || 0) + quizSummary.xpEarned + (progress.challengeXP[lessonId] || 0),
    maxTotal:  LESSON_XP_REWARD + (10 * QUIZ_XP_PER_Q) + CHALLENGE_XP_REWARD,
  };
}

// ── Check if lesson is complete ─────────────────
function isLessonComplete(lessonId) {
  return loadProgress().completedLessons.includes(lessonId);
}

// ── Get total XP ────────────────────────────────
function getTotalXP() {
  return loadProgress().xp;
}

// ── Streak Logic ────────────────────────────────
function updateStreak(progress) {
  const today = new Date().toDateString();
  const last  = progress.lastVisit ? new Date(progress.lastVisit).toDateString() : null;

  if (!last || last === today) {
    // Same day — no change
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

// ── Get progress per module ──────────────────────
function getModuleProgress(moduleId, curriculum) {
  const progress = loadProgress();
  const moduleLessons = curriculum.filter(l => l.module === moduleId);
  const completed = moduleLessons.filter(l => progress.completedLessons.includes(l.id));
  return {
    total: moduleLessons.length,
    completed: completed.length,
    percent: moduleLessons.length ? Math.round((completed.length / moduleLessons.length) * 100) : 0,
  };
}

// ── Reset all progress ────────────────────────────
function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

// ── Activity Log ─────────────────────────────────
function recordActivityXP(amount = 10, progress = null) {
  const p = progress || loadProgress();
  if (!p.activityLog) p.activityLog = {};
  const today = new Date().toISOString().slice(0, 10);
  p.activityLog[today] = (p.activityLog[today] || 0) + amount;
  if (!progress) saveProgress(p); // only save if not part of larger save
}

function getActivityLog() {
  return loadProgress().activityLog || {};
}

function getHeatmapData(days = 63) {
  const log = getActivityLog();
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({ date: key, xp: log[key] || 0 });
  }
  return result;
}
