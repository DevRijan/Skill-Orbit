// =============================================
// SKILL-ORBIT — api.js  v1.0
// Frontend API client — bridges localStorage
// and the real backend REST API.
//
// Usage: loaded FIRST in every HTML page.
// All other JS files call SkillOrbitAPI.*
// =============================================

const SkillOrbitAPI = (() => {
  const BASE_URL = 'http://localhost:3001/api';
  const TOKEN_KEY = 'skill-orbit-jwt';

  // ── State ──────────────────────────────────

  let _isOnline  = false;   // backend reachable?
  let _token     = null;    // current JWT

  // ── Token helpers ───────────────────────────

  function getToken()        { return _token || localStorage.getItem(TOKEN_KEY); }
  function setToken(tok)     { _token = tok; localStorage.setItem(TOKEN_KEY, tok); }
  function clearToken()      { _token = null; localStorage.removeItem(TOKEN_KEY); }
  function isAuthenticated() { return !!getToken(); }

  // ── Core fetch wrapper ──────────────────────

  async function apiFetch(method, path, body = null, auth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
      const tok = getToken();
      if (tok) headers['Authorization'] = `Bearer ${tok}`;
    }

    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${path}`, opts);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const err = new Error(data.error || `HTTP ${res.status}`);
      err.status = res.status;
      err.data   = data;
      throw err;
    }
    return data;
  }

  // ── Health Check ────────────────────────────

  async function checkHealth() {
    try {
      const data = await apiFetch('GET', '/health', null, false);
      _isOnline = data.status === 'ok';
    } catch {
      _isOnline = false;
    }
    return _isOnline;
  }

  function isOnline() { return _isOnline; }

  // ── Auth API ────────────────────────────────

  async function register({ name, email, password, avatar }) {
    const data = await apiFetch('POST', '/auth/register', { name, email, password, avatar }, false);
    if (data.token) setToken(data.token);
    return data;
  }

  async function login({ email, password }) {
    const data = await apiFetch('POST', '/auth/login', { email, password }, false);
    if (data.token) setToken(data.token);
    return data;
  }

  async function getProfile() {
    return apiFetch('GET', '/auth/profile');
  }

  async function updateProfile({ name, avatar }) {
    return apiFetch('PUT', '/auth/profile', { name, avatar });
  }

  async function logout() {
    try { await apiFetch('POST', '/auth/logout'); } catch {}
    clearToken();
  }

  // ── Progress API ────────────────────────────

  async function loadProgress() {
    return apiFetch('GET', '/progress');
  }

  async function markLessonComplete(lessonId) {
    return apiFetch('POST', '/progress/lesson', { lessonId });
  }

  async function recordQuizAnswer(lessonId, questionIndex, correct) {
    return apiFetch('POST', '/progress/quiz', { lessonId, questionIndex, correct });
  }

  async function awardChallengeXP(lessonId) {
    return apiFetch('POST', '/progress/challenge', { lessonId });
  }

  async function syncProgress(localProgress) {
    return apiFetch('POST', '/progress/sync', { progress: localProgress });
  }

  async function resetProgress() {
    return apiFetch('DELETE', '/progress/reset');
  }

  // ── Leaderboard API ─────────────────────────

  async function getLeaderboard(options = {}) {
    const { limit = 50, league, period = 'alltime' } = options;
    const params = new URLSearchParams({ limit });
    if (league) params.set('league', league);
    if (period) params.set('period', period);
    return apiFetch('GET', `/leaderboard?${params.toString()}`);
  }

  async function getMyRank() {
    return apiFetch('GET', '/leaderboard/me');
  }

  // ── Badges API ──────────────────────────────

  async function getBadges() {
    return apiFetch('GET', '/badges');
  }

  async function checkBadges() {
    return apiFetch('POST', '/badges/check', {});
  }

  // ── Lessons API ─────────────────────────────

  async function getLessons() {
    return apiFetch('GET', '/lessons');
  }

  async function getLesson(id) {
    return apiFetch('GET', `/lessons/${id}`);
  }

  // ── Init ────────────────────────────────────
  // Call on page load. Returns true if backend is reachable.

  async function init() {
    const online = await checkHealth();
    if (online) {
      console.log('[API] ✅ Backend reachable at', BASE_URL);
    } else {
      console.warn('[API] ⚠️ Backend not reachable — running in offline mode.');
    }
    return online;
  }

  // ── Public API ──────────────────────────────

  return {
    init,
    isOnline,
    isAuthenticated,
    getToken,
    clearToken,

    auth: {
      register,
      login,
      getProfile,
      updateProfile,
      logout,
    },

    progress: {
      load:        loadProgress,
      markLesson:  markLessonComplete,
      recordQuiz:  recordQuizAnswer,
      challenge:   awardChallengeXP,
      sync:        syncProgress,
      reset:       resetProgress,
    },

    leaderboard: {
      getAll:  getLeaderboard,
      getMyRank,
    },

    badges: {
      getAll: getBadges,
      check:  checkBadges,
    },

    lessons: {
      getAll: getLessons,
      get:    getLesson,
    },
  };
})();

// Make globally available
window.SkillOrbitAPI = SkillOrbitAPI;
