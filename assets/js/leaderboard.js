// =============================================
// SKILL-ORBIT — leaderboard.js  v2.0
// True global leaderboard via backend API.
// Falls back to localStorage when offline.
// =============================================

const LEADERBOARD_KEY = 'skill-orbit-leaderboard';

const LEAGUE_THRESHOLDS = [
  { league: 'Bronze',   minXP: 0    },
  { league: 'Silver',   minXP: 100  },
  { league: 'Gold',     minXP: 250  },
  { league: 'Platinum', minXP: 500  },
  { league: 'Diamond',  minXP: 1000 },
];

function getLeague(xp) {
  for (let i = LEAGUE_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEAGUE_THRESHOLDS[i].minXP) {
      return LEAGUE_THRESHOLDS[i].league;
    }
  }
  return 'Bronze';
}

let currentLeague = '';
let currentPeriod = 'alltime';

// ── Get Leaderboard ───────────────────────────────────────────────────────────
// Returns sorted leaderboard: online = real API, offline = localStorage fallback.

async function getLeaderboard(options = {}) {
  const opts = { limit: 50, ...options };

  if (window.SkillOrbitAPI && window.SkillOrbitAPI.isOnline()) {
    try {
      const res = await window.SkillOrbitAPI.leaderboard.getAll(opts);
      return res.leaderboard || [];
    } catch (err) {
      console.warn('[leaderboard] API fetch failed, using cache:', err.message);
    }
  }

  // Offline fallback — localStorage
  const raw = localStorage.getItem(LEADERBOARD_KEY);
  if (!raw) return [];
  try {
    const entries = JSON.parse(raw);
    // Filter by league if provided
    let filtered = entries;
    if (opts.league) {
      filtered = entries.filter(e => e.league === opts.league);
    }
    // Sort by XP (offline doesn't have weekly)
    filtered.sort((a, b) => (b.xp || 0) - (a.xp || 0));
    return filtered.slice(0, opts.limit);
  } catch {
    return [];
  }
}

// ── Get My Rank ───────────────────────────────────────────────────────────────

async function getMyRank() {
  if (window.SkillOrbitAPI && window.SkillOrbitAPI.isOnline() && window.SkillOrbitAPI.isAuthenticated()) {
    try {
      const res = await window.SkillOrbitAPI.leaderboard.getMyRank();
      return res.rank;
    } catch (err) {
      console.warn('[leaderboard] getMyRank failed:', err.message);
    }
  }

  // Offline fallback
  const profile = typeof getProfile === 'function' ? getProfile() : null;
  if (!profile) return null;
  const board = (await getLeaderboard());
  const id    = profile.name + '_' + (profile.joinedAt || '').slice(0, 10);
  const idx   = board.findIndex(e => e.id === id);
  return idx >= 0 ? idx + 1 : null;
}

// ── Get My Entry ──────────────────────────────────────────────────────────────

async function getMyEntry() {
  if (window.SkillOrbitAPI && window.SkillOrbitAPI.isOnline() && window.SkillOrbitAPI.isAuthenticated()) {
    try {
      const res = await window.SkillOrbitAPI.leaderboard.getMyRank();
      return res.entry || null;
    } catch (err) {
      console.warn('[leaderboard] getMyEntry failed:', err.message);
    }
  }

  // Offline fallback
  const profile = typeof getProfile === 'function' ? getProfile() : null;
  if (!profile) return null;
  const board = await getLeaderboard();
  const id    = profile.name + '_' + (profile.joinedAt || '').slice(0, 10);
  return board.find(e => e.id === id) || null;
}

// ── Sync (offline mode — push local user to localStorage board) ───────────────

function syncLeaderboard() {
  // Only sync to localStorage in offline mode
  if (window.SkillOrbitAPI && window.SkillOrbitAPI.isOnline()) return;

  const profile  = typeof getProfile   === 'function' ? getProfile()   : null;
  const progress = typeof loadProgress === 'function' ? loadProgress() : null;
  if (!profile || !progress) return;

  const BADGES_DEF  = (typeof BADGES !== 'undefined') ? BADGES : [];
  const CURRICULUM  = (typeof window.SKILL_ORBIT_CURRICULUM !== 'undefined') ? window.SKILL_ORBIT_CURRICULUM : [];
  const earnedBadges = BADGES_DEF.filter(b => {
    try { return b.condition(progress, CURRICULUM); } catch { return false; }
  }).length;

  const entry = {
    id:           profile.name + '_' + (profile.joinedAt || '').slice(0, 10),
    name:         profile.name,
    avatar:       profile.avatar || '🚀',
    xp:           progress.xp || 0,
    streak:       progress.streak || 0,
    lessonsCount: progress.completedLessons.length,
    badgesCount:  earnedBadges,
    level:        typeof getLevelInfo === 'function' ? getLevelInfo(progress.xp || 0).current.level : 1,
    levelTitle:   typeof getLevelInfo === 'function' ? getLevelInfo(progress.xp || 0).current.title : 'Beginner',
    league:       getLeague(progress.xp || 0),
    joinedAt:     profile.joinedAt || new Date().toISOString(),
    lastSeen:     new Date().toISOString(),
  };

  const raw   = localStorage.getItem(LEADERBOARD_KEY);
  let board   = [];
  try { board = raw ? JSON.parse(raw) : []; } catch { board = []; }

  const idx = board.findIndex(e => e.id === entry.id);
  if (idx >= 0) { board[idx] = entry; } else { board.push(entry); }

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board));
}

// ── Clear (debug) ─────────────────────────────────────────────────────────────

function clearLeaderboard() {
  localStorage.removeItem(LEADERBOARD_KEY);
}
