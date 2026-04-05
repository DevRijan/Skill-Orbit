// =============================================
// SKILL-ORBIT — utils/badges.js
// Achievement (Badge) definitions & evaluation
// =============================================

// Ensure safe string conversion
function getCompleted(p) {
  if (!p || !p.completed_lessons) return [];
  if (Array.isArray(p.completed_lessons)) return p.completed_lessons;
  try { return JSON.parse(p.completed_lessons); } catch(e) { return []; }
}
function getActivityLog(p) {
  if (!p || !p.activity_log) return {};
  if (typeof p.activity_log === 'object') return p.activity_log;
  try { return JSON.parse(p.activity_log); } catch(e) { return {}; }
}
function getInteractions(p) {
  // If we extend progress table or localStorage to have 'interactions'
  if (!p || !p.interactions) return {};
  if (typeof p.interactions === 'object') return p.interactions;
  try { return JSON.parse(p.interactions); } catch(e) { return {}; }
}

const BADGES = [
  // --- BEGINNER ---
  {
    id: 'first_step',
    name: 'First Step',
    icon: '⭐',
    description: 'You completed your very first lesson. The journey begins!',
    category: 'Beginner',
    hidden: false,
    xpReward: 10,
    condition: (p) => getCompleted(p).length >= 1,
  },
  {
    id: 'hello_world',
    name: 'Hello, World?',
    icon: '👋',
    description: 'You wrote your first line of code in the editor.',
    category: 'Beginner',
    hidden: false,
    xpReward: 15,
    condition: (p) => (getInteractions(p).editor_typed_chars || 0) > 0, // Mocked trigger, front-end will usually trigger this
  },
  
  // --- PROGRESSION ---
  {
    id: 'lessons_10',
    name: 'Ten Down',
    icon: '🎯',
    description: 'Completed 10 lessons overall.',
    category: 'Progression',
    hidden: false,
    xpReward: 50,
    condition: (p) => getCompleted(p).length >= 10,
  },
  {
    id: 'html_starter',
    name: 'HTML Starter',
    icon: '🌱',
    description: 'Began the HTML module.',
    category: 'Progression',
    hidden: false,
    xpReward: 20,
    condition: (p) => getCompleted(p).some((id) => id.startsWith('html')),
  },
  {
    id: 'html_master',
    name: 'HTML Master',
    icon: '🏅',
    description: 'Completed the entire HTML core curriculum.',
    category: 'Progression',
    hidden: false,
    xpReward: 100,
    condition: (p) => {
      const done = getCompleted(p);
      const htmlLessons = Array.from({ length: 10 }, (_, i) => `html-${String(i + 1).padStart(2, '0')}`);
      return htmlLessons.length > 0 && htmlLessons.every((id) => done.includes(id));
    },
  },
  {
    id: 'css_starter',
    name: 'CSS Explorer',
    icon: '🎨',
    description: 'Began the CSS module.',
    category: 'Progression',
    hidden: false,
    xpReward: 20,
    condition: (p) => getCompleted(p).some((id) => id.startsWith('css')),
  },
  {
    id: 'css_master',
    name: 'CSS Wizard',
    icon: '🧙',
    description: 'Completed the entire CSS curriculum.',
    category: 'Progression',
    hidden: false,
    xpReward: 100,
    condition: (p) => {
      const done = getCompleted(p);
      const cssLessons = Array.from({ length: 12 }, (_, i) => `css-${String(i + 1).padStart(2, '0')}`);
      return cssLessons.length > 0 && cssLessons.every((id) => done.includes(id));
    },
  },
  {
    id: 'xp_100',
    name: '100 XP Club',
    icon: '⚡',
    description: 'You reached 100 total XP.',
    category: 'Progression',
    hidden: false,
    xpReward: 0,
    condition: (p) => (p.xp_total || p.xp || 0) >= 100,
  },
  {
    id: 'xp_500',
    name: 'XP Hunter',
    icon: '💎',
    description: 'You reached 500 total XP. Quite the collection!',
    category: 'Progression',
    hidden: false,
    xpReward: 0,
    condition: (p) => (p.xp_total || p.xp || 0) >= 500,
  },
  {
    id: 'streak_3',
    name: '3-Day Streak',
    icon: '🔥',
    description: 'Maintained a 3-day learning streak.',
    category: 'Progression',
    hidden: false,
    xpReward: 30,
    condition: (p) => (p.streak || 0) >= 3,
  },
  {
    id: 'streak_7',
    name: 'Unstoppable',
    icon: '🚀',
    description: 'Maintained a 7-day learning streak.',
    category: 'Progression',
    hidden: false,
    xpReward: 75,
    condition: (p) => (p.streak || 0) >= 7,
  },

  // --- SKILL-BASED ---
  {
    id: 'dom_whisperer',
    name: 'DOM Whisperer',
    icon: '🕸️',
    description: 'Successfully structured nested HTML elements.',
    category: 'Skill',
    hidden: false,
    xpReward: 40,
    condition: (p) => (getInteractions(p).nested_elements || 0) > 0,
  },
  {
    id: 'style_guru',
    name: 'Style Guru',
    icon: '💅',
    description: 'Applied custom colors and spacing via CSS.',
    category: 'Skill',
    hidden: false,
    xpReward: 40,
    condition: (p) => (getInteractions(p).custom_styles || 0) > 0,
  },
  {
    id: 'sharp_mind',
    name: 'Sharp Mind',
    icon: '🧠',
    description: 'Answered 5 quizzes correctly in a row.',
    category: 'Skill',
    hidden: false,
    xpReward: 50,
    condition: (p) => (getInteractions(p).quiz_streak || 0) >= 5,
  },

  // --- RESILIENCE ---
  {
    id: 'now_it_works',
    name: 'Okay, Now It Works',
    icon: '🛠️',
    description: 'Got the right answer after getting it wrong 3 times.',
    category: 'Resilience',
    hidden: false,
    xpReward: 25,
    condition: (p) => (getInteractions(p).resilience_fixes || 0) > 0,
  },
  {
    id: 'still_here',
    name: 'Still Here.',
    icon: '⏳',
    description: 'Stayed on a single lesson for more than 15 minutes, refusing to give up.',
    category: 'Resilience',
    hidden: true,
    xpReward: 30,
    condition: (p) => (getInteractions(p).long_lesson || 0) > 0,
  },

  // --- EXPLORATION & SECRET ---
  {
    id: 'what_happens_if',
    name: 'What Happens If...',
    icon: '🧪',
    description: 'You intentionally broke the HTML structure just to see what the browser would do.',
    category: 'Exploration',
    hidden: true,
    xpReward: 40,
    condition: (p) => (getInteractions(p).broken_structure || 0) > 0,
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    icon: '🦉',
    description: 'Completed a lesson between midnight and 4 AM.',
    category: 'Secret',
    hidden: true,
    xpReward: 50,
    condition: (p) => (getInteractions(p).night_owl || 0) > 0,
  },
  {
    id: 'theme_flipper',
    name: 'Light? Dark?',
    icon: '🌓',
    description: 'Toggled the dark mode switch 5 times in one session.',
    category: 'Secret',
    hidden: true,
    xpReward: 10,
    condition: (p) => (getInteractions(p).theme_flips || 0) >= 5,
  },
  {
    id: 'the_page_listens',
    name: 'The Page Listens',
    icon: '⚡',
    description: 'You triggered an interactive element inside a live preview.',
    category: 'Exploration',
    hidden: false,
    xpReward: 25,
    condition: (p) => (getInteractions(p).preview_clicks || 0) > 0,
  }
];

/**
 * Evaluate which achievements a user has newly earned.
 * @param {Object} progress - progress row from DB
 * @param {Array}  alreadyEarned - array of badge_id strings already in DB
 * @returns {Array} newly earned achievement objects
 */
function checkNewBadges(progress, alreadyEarned = []) {
  if (!progress) return [];
  return BADGES.filter((b) => {
    if (alreadyEarned.includes(b.id)) return false;
    try {
      return b.condition(progress);
    } catch(e) {
      console.error('Error in condition for badge', b.id, e);
      return false;
    }
  });
}

module.exports = { BADGES, checkNewBadges };
