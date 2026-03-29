// =============================================
// SKILL-ORBIT — utils/badges.js
// Badge definitions & evaluation (server-side)
// =============================================

const BADGES = [
  {
    id: 'html-starter',
    name: 'HTML Starter',
    icon: '🌱',
    description: 'Complete your first HTML lesson',
    condition: (progress) =>
      progress.completed_lessons.some((id) => id.startsWith('html')),
  },
  {
    id: 'html-master',
    name: 'HTML Master',
    icon: '🏅',
    description: 'Complete all HTML lessons (10 lessons)',
    condition: (progress) => {
      const htmlLessons = Array.from({ length: 10 }, (_, i) =>
        `html-${String(i + 1).padStart(2, '0')}`
      );
      return htmlLessons.every((id) => progress.completed_lessons.includes(id));
    },
  },
  {
    id: 'css-starter',
    name: 'CSS Explorer',
    icon: '🎨',
    description: 'Complete your first CSS lesson',
    condition: (progress) =>
      progress.completed_lessons.some((id) => id.startsWith('css')),
  },
  {
    id: 'css-master',
    name: 'CSS Wizard',
    icon: '🧙',
    description: 'Complete all CSS lessons',
    condition: (progress) => {
      const cssLessons = Array.from({ length: 12 }, (_, i) =>
        `css-${String(i + 1).padStart(2, '0')}`
      );
      return cssLessons.every((id) => progress.completed_lessons.includes(id));
    },
  },
  {
    id: 'xp-100',
    name: '100 XP Club',
    icon: '⚡',
    description: 'Earn 100 XP total',
    condition: (progress) => progress.xp_total >= 100,
  },
  {
    id: 'xp-500',
    name: 'XP Hunter',
    icon: '💎',
    description: 'Earn 500 XP total',
    condition: (progress) => progress.xp_total >= 500,
  },
  {
    id: 'streak-3',
    name: '3-Day Streak',
    icon: '🔥',
    description: 'Maintain a 3-day learning streak',
    condition: (progress) => (progress.streak || 0) >= 3,
  },
  {
    id: 'streak-7',
    name: 'Unstoppable',
    icon: '🚀',
    description: 'Maintain a 7-day learning streak',
    condition: (progress) => (progress.streak || 0) >= 7,
  },
  {
    id: 'first-lesson',
    name: 'First Step',
    icon: '⭐',
    description: 'Complete your very first lesson',
    condition: (progress) => progress.completed_lessons.length >= 1,
  },
  {
    id: 'lessons-10',
    name: 'Ten Down',
    icon: '🎯',
    description: 'Complete 10 lessons total',
    condition: (progress) => progress.completed_lessons.length >= 10,
  },
];

/**
 * Evaluate which badges a user has newly earned.
 * @param {Object} progress — progress row from DB (with parsed JSON fields)
 * @param {Array}  alreadyEarned — array of badge_id strings already in DB
 * @returns {Array} newly earned badge objects
 */
function checkNewBadges(progress, alreadyEarned = []) {
  return BADGES.filter(
    (b) => !alreadyEarned.includes(b.id) && b.condition(progress)
  );
}

module.exports = { BADGES, checkNewBadges };
