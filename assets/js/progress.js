// =============================================
// SKILL-ORBIT — progress.js
// Manages user progress via localStorage
// =============================================

const STORAGE_KEY = 'skill-orbit-progress';

/**
 * Default progress data structure.
 */
const DEFAULT_PROGRESS = {
  completedLessons: [],   // Array of lesson IDs e.g. ["html-01", "css-02"]
  xp: 0,
  badges: [],
  streak: 0,
  lastVisit: null,
};

// ── Load & Save ─────────────────────────────────
function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULT_PROGRESS };
  try {
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ── Mark lesson complete ─────────────────────────
function markLessonComplete(lessonId, xpReward = 20) {
  const progress = loadProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.xp += xpReward;
  }
  progress.lastVisit = new Date().toISOString();
  saveProgress(progress);
  updateStreak();
  return progress;
}

// ── Check if lesson is complete ─────────────────
function isLessonComplete(lessonId) {
  const progress = loadProgress();
  return progress.completedLessons.includes(lessonId);
}

// ── Get total XP ────────────────────────────────
function getTotalXP() {
  return loadProgress().xp;
}

// ── Streak Logic ────────────────────────────────
function updateStreak() {
  const progress = loadProgress();
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
      progress.streak = 1; // Reset streak
    }
  }

  progress.lastVisit = new Date().toISOString();
  saveProgress(progress);
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

// ── Reset all progress (for testing) ────────────
function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
