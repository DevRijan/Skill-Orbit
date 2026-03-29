// =============================================
// SKILL-ORBIT — utils/levelCalc.js
// Shared XP / Level logic (mirrors frontend)
// =============================================

const LEVEL_THRESHOLDS = [
  { level: 1,  title: 'Beginner',    minXP: 0    },
  { level: 2,  title: 'Explorer',    minXP: 100  },
  { level: 3,  title: 'Apprentice',  minXP: 250  },
  { level: 4,  title: 'Developer',   minXP: 500  },
  { level: 5,  title: 'Architect',   minXP: 1000 },
  { level: 6,  title: 'Wizard',      minXP: 2000 },
  { level: 7,  title: 'Grandmaster', minXP: 5000 },
];

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

function getLevelInfo(xp) {
  let current = LEVEL_THRESHOLDS[0];
  let next = LEVEL_THRESHOLDS[1];

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXP) {
      current = LEVEL_THRESHOLDS[i];
      next    = LEVEL_THRESHOLDS[i + 1] || null;
      break;
    }
  }

  const xpInLevel = next ? xp - current.minXP : 0;
  const xpForNext = next ? next.minXP - current.minXP : 1;
  const percent   = next ? Math.round((xpInLevel / xpForNext) * 100) : 100;

  return { current, next, xpInLevel, xpForNext, percent };
}

// XP rewards — must stay in sync with frontend progress.js
const XP_REWARDS = {
  LESSON:    10,
  CHALLENGE: 10,
  QUIZ_Q:    1,
};

module.exports = { getLevelInfo, LEVEL_THRESHOLDS, XP_REWARDS, getLeague, LEAGUE_THRESHOLDS };
