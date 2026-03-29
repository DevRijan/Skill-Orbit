// =============================================
// SKILL-ORBIT — leaderboard.js
// localStorage-based competitive leaderboard
// =============================================

const LEADERBOARD_KEY = 'skill-orbit-leaderboard';

/**
 * Returns the leaderboard array, sorted by XP descending.
 * @returns {Array} sorted array of user entries
 */
function getLeaderboard() {
  const raw = localStorage.getItem(LEADERBOARD_KEY);
  if (!raw) return [];
  try {
    const entries = JSON.parse(raw);
    return entries.sort((a, b) => (b.xp || 0) - (a.xp || 0));
  } catch {
    return [];
  }
}

/**
 * Upserts the current user's entry in the leaderboard.
 * Called automatically after every XP change via saveProgress().
 */
function syncLeaderboard() {
  const profile  = typeof getProfile  === 'function' ? getProfile()  : null;
  const progress = typeof loadProgress === 'function' ? loadProgress() : null;
  if (!profile || !progress) return;

  const curriculum = (typeof CURRICULUM !== 'undefined' && Array.isArray(CURRICULUM)) ? CURRICULUM : [];
  const BADGES_DEF  = (typeof BADGES !== 'undefined') ? BADGES : [];
  const earnedBadges = BADGES_DEF.filter(b => {
    try { return b.condition(progress, curriculum); } catch { return false; }
  }).length;

  const entry = {
    id:           profile.name + '_' + (profile.joinedAt || '').slice(0, 10), // stable-ish ID
    name:         profile.name,
    avatar:       profile.avatar || '🚀',
    xp:           progress.xp || 0,
    streak:       progress.streak || 0,
    lessonsCount: progress.completedLessons.length,
    badgesCount:  earnedBadges,
    level:        typeof getLevelInfo === 'function' ? getLevelInfo(progress.xp || 0).current.level : 1,
    levelTitle:   typeof getLevelInfo === 'function' ? getLevelInfo(progress.xp || 0).current.title : 'Beginner',
    joinedAt:     profile.joinedAt || new Date().toISOString(),
    lastSeen:     new Date().toISOString(),
  };

  // Load existing, replace or insert
  const raw = localStorage.getItem(LEADERBOARD_KEY);
  let board = [];
  try { board = raw ? JSON.parse(raw) : []; } catch { board = []; }

  const idx = board.findIndex(e => e.id === entry.id);
  if (idx >= 0) {
    board[idx] = entry;
  } else {
    board.push(entry);
  }

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board));
}

/**
 * Returns the current user's rank (1-indexed) or null if not on board.
 */
function getMyRank() {
  const profile = typeof getProfile === 'function' ? getProfile() : null;
  if (!profile) return null;
  const board = getLeaderboard();
  const id = profile.name + '_' + (profile.joinedAt || '').slice(0, 10);
  const idx = board.findIndex(e => e.id === id);
  return idx >= 0 ? idx + 1 : null;
}

/**
 * Returns the current user's leaderboard entry or null.
 */
function getMyEntry() {
  const profile = typeof getProfile === 'function' ? getProfile() : null;
  if (!profile) return null;
  const board = getLeaderboard();
  const id = profile.name + '_' + (profile.joinedAt || '').slice(0, 10);
  return board.find(e => e.id === id) || null;
}

/**
 * Clears the leaderboard (admin/debug use).
 */
function clearLeaderboard() {
  localStorage.removeItem(LEADERBOARD_KEY);
}
