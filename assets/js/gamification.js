// =============================================
// SKILL-ORBIT — gamification.js
// XP, Badges, Streaks rendering
// =============================================

const BADGES = [
  {
    id: 'html-starter',
    name: 'HTML Starter',
    icon: '🌱',
    description: 'Complete your first HTML lesson',
    condition: (progress) => progress.completedLessons.some(id => id.startsWith('html')),
  },
  {
    id: 'html-master',
    name: 'HTML Master',
    icon: '🏅',
    description: 'Complete all HTML lessons',
    condition: (progress, curriculum) => {
      const htmlLessons = curriculum.filter(l => l.module === 'html');
      return htmlLessons.every(l => progress.completedLessons.includes(l.id));
    },
  },
  {
    id: 'css-starter',
    name: 'CSS Explorer',
    icon: '🎨',
    description: 'Complete your first CSS lesson',
    condition: (progress) => progress.completedLessons.some(id => id.startsWith('css')),
  },
  {
    id: 'css-master',
    name: 'CSS Wizard',
    icon: '🧙',
    description: 'Complete all CSS lessons',
    condition: (progress, curriculum) => {
      const cssLessons = curriculum.filter(l => l.module === 'css');
      return cssLessons.every(l => progress.completedLessons.includes(l.id));
    },
  },
  {
    id: 'xp-100',
    name: '100 XP Club',
    icon: '⚡',
    description: 'Earn 100 XP total',
    condition: (progress) => progress.xp >= 100,
  },
  {
    id: 'streak-3',
    name: '3-Day Streak',
    icon: '🔥',
    description: 'Maintain a 3-day streak',
    condition: (progress) => (progress.streak || 0) >= 3,
  },
];

/**
 * Render badges on the dashboard.
 * @param {Array} curriculum — the full curriculum array (for completion checks)
 */
function renderGamification(progress, curriculum = []) {
  const grid = document.getElementById('badges-grid');
  if (!grid) return;

  grid.innerHTML = '';
  grid.classList.add('stagger-children');

  BADGES.forEach(badge => {
    const earned = badge.condition(progress, curriculum);

    const item = document.createElement('div');
    item.className = `badge-item ${earned ? '' : 'locked'}`;
    item.title     = badge.description;
    item.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <div class="badge-name">${badge.name}</div>
    `;
    grid.appendChild(item);
  });
}

/**
 * Check and award any newly earned badges.
 * @param {Object} progress
 * @param {Array} curriculum
 * @returns {Array} newly earned badge IDs
 */
function checkBadges(progress, curriculum = []) {
  const newlyEarned = [];

  BADGES.forEach(badge => {
    if (!progress.badges.includes(badge.id) && badge.condition(progress, curriculum)) {
      progress.badges.push(badge.id);
      newlyEarned.push(badge);
    }
  });

  if (newlyEarned.length > 0) {
    saveProgress(progress);
    newlyEarned.forEach(b => showBadgeToast(b));
  }

  return newlyEarned;
}

/**
 * Show a badge earned toast (reuses XP toast styling).
 */
function showBadgeToast(badge) {
  const toast = document.getElementById('xpToast');
  const text  = document.getElementById('xpToastText');
  if (!toast || !text) return;

  text.textContent = `${badge.icon} Badge Earned: ${badge.name}!`;
  toast.style.display = 'flex';
  setTimeout(() => { toast.style.display = 'none'; }, 3500);
}
