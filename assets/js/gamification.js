// =============================================
// SKILL-ORBIT — gamification.js
// Achievement System & Cinematic Unlocks
// =============================================

/**
 * ACHIEVEMENT DEFINITIONS
 * Mirrored from backend/utils/badges.js for instant UI feedback.
 */
const ACHIEVEMENTS = [
  {
    id: 'first_step',
    name: 'First Step',
    icon: '⭐',
    description: 'You completed your very first lesson. The journey begins!',
    category: 'Beginner',
    hidden: false,
    xpReward: 10,
    condition: (p) => (p.completedLessons || []).length >= 1,
  },
  {
    id: 'hello_world',
    name: 'Hello, World?',
    icon: '👋',
    description: 'You wrote your first line of code in the editor.',
    category: 'Beginner',
    hidden: false,
    xpReward: 15,
    condition: (p) => (getTracked('editor_typed_chars') || 0) > 0,
  },
  {
    id: 'lessons_10',
    name: 'Ten Down',
    icon: '🎯',
    description: 'Completed 10 lessons overall.',
    category: 'Progression',
    hidden: false,
    xpReward: 50,
    condition: (p) => (p.completedLessons || []).length >= 10,
  },
  {
    id: 'html_starter',
    name: 'HTML Starter',
    icon: '🌱',
    description: 'Began the HTML module.',
    category: 'Progression',
    hidden: false,
    xpReward: 20,
    condition: (p) => (p.completedLessons || []).some(id => id.startsWith('html')),
  },
  {
    id: 'html_master',
    name: 'HTML Master',
    icon: '🏅',
    description: 'Completed the entire HTML core curriculum.',
    category: 'Progression',
    hidden: false,
    xpReward: 100,
    condition: (p, curr) => {
      const htmlLessons = curr.filter(l => l.module === 'html');
      return htmlLessons.length > 0 && htmlLessons.every(l => (p.completedLessons || []).includes(l.id));
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
    condition: (p) => (p.completedLessons || []).some(id => id.startsWith('css')),
  },
  {
    id: 'css_master',
    name: 'CSS Wizard',
    icon: '🧙',
    description: 'Completed the entire CSS curriculum.',
    category: 'Progression',
    hidden: false,
    xpReward: 100,
    condition: (p, curr) => {
      const cssLessons = curr.filter(l => l.module === 'css');
      return cssLessons.length > 0 && cssLessons.every(l => (p.completedLessons || []).includes(l.id));
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
    condition: (p) => (p.xp || 0) >= 100,
  },
  {
    id: 'xp_500',
    name: 'XP Hunter',
    icon: '💎',
    description: 'You reached 500 total XP. Quite the collection!',
    category: 'Progression',
    hidden: false,
    xpReward: 0,
    condition: (p) => (p.xp || 0) >= 500,
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
  {
    id: 'dom_whisperer',
    name: 'DOM Whisperer',
    icon: '🕸️',
    description: 'Successfully structured nested HTML elements.',
    category: 'Skill',
    hidden: false,
    xpReward: 40,
    condition: (p) => (getTracked('nested_elements') || 0) > 0,
  },
  {
    id: 'style_guru',
    name: 'Style Guru',
    icon: '💅',
    description: 'Applied custom colors and spacing via CSS.',
    category: 'Skill',
    hidden: false,
    xpReward: 40,
    condition: (p) => (getTracked('custom_styles') || 0) > 0,
  },
  {
    id: 'sharp_mind',
    name: 'Sharp Mind',
    icon: '🧠',
    description: 'Answered 5 quizzes correctly in a row.',
    category: 'Skill',
    hidden: false,
    xpReward: 50,
    condition: (p) => (getTracked('quiz_streak') || 0) >= 5,
  },
  {
    id: 'now_it_works',
    name: 'Okay, Now It Works',
    icon: '🛠️',
    description: 'Got the right answer after getting it wrong 3 times.',
    category: 'Resilience',
    hidden: false,
    xpReward: 25,
    condition: (p) => (getTracked('resilience_fixes') || 0) > 0,
  },
  {
    id: 'still_here',
    name: 'Still Here.',
    icon: '⏳',
    description: 'Stayed on a single lesson for more than 15 minutes, refusing to give up.',
    category: 'Resilience',
    hidden: true,
    xpReward: 30,
    condition: (p) => (getTracked('long_lesson') || 0) > 0,
  },
  {
    id: 'what_happens_if',
    name: 'What Happens If...',
    icon: '🧪',
    description: 'You intentionally broke the HTML structure just to see what the browser would do.',
    category: 'Exploration',
    hidden: true,
    xpReward: 40,
    condition: (p) => (getTracked('broken_structure') || 0) > 0,
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    icon: '🦉',
    description: 'Completed a lesson between midnight and 4 AM.',
    category: 'Secret',
    hidden: true,
    xpReward: 50,
    condition: (p) => (getTracked('night_owl') || 0) > 0,
  },
  {
    id: 'theme_flipper',
    name: 'Light? Dark?',
    icon: '🌓',
    description: 'Toggled the dark mode switch 5 times in one session.',
    category: 'Secret',
    hidden: true,
    xpReward: 10,
    condition: (p) => (getTracked('theme_flips') || 0) >= 5,
  },
  {
    id: 'the_page_listens',
    name: 'The Page Listens',
    icon: '⚡',
    description: 'You triggered an interactive element inside a live preview.',
    category: 'Exploration',
    hidden: false,
    xpReward: 25,
    condition: (p) => (getTracked('preview_clicks') || 0) > 0,
  }
];

// BACKWARD COMPATIBILITY: Map old variable name BADGES to ACHIEVEMENTS
const BADGES = ACHIEVEMENTS;

/**
 * Local Activity Tracking
 */
function getTracked(key) {
  const track = JSON.parse(localStorage.getItem('skill_orbit_activity_track') || '{}');
  return track[key];
}

function updateTrack(key, val, increment = true) {
  const track = JSON.parse(localStorage.getItem('skill_orbit_activity_track') || '{}');
  if (increment) track[key] = (track[key] || 0) + val;
  else track[key] = val;
  localStorage.setItem('skill_orbit_activity_track', JSON.stringify(track));
  
  // Re-check achievements after tracking update
  const progress = typeof loadProgress === 'function' ? loadProgress() : null;
  const curriculum = typeof CURRICULUM !== 'undefined' ? CURRICULUM : [];
  if (progress) checkBadges(progress, curriculum);
}

/**
 * Render achievements in a grid (Account/Dashboard)
 */
function renderGamification(progress, curriculum = []) {
  const grid = document.getElementById('dash-badges-grid') || document.getElementById('badges-grid');
  if (!grid) return;

  grid.innerHTML = '';
  grid.classList.add('stagger-children');

  ACHIEVEMENTS.forEach(achievement => {
    const earned = achievement.condition(progress, curriculum);
    const isSecret = achievement.hidden && !earned;

    const item = document.createElement('div');
    item.className = `achievement-chip ${earned ? 'earned' : 'locked'} ${isSecret ? 'secret' : ''}`;
    item.title = isSecret ? '???' : achievement.description;
    
    item.innerHTML = `
      <div class="achievement-icon">${isSecret ? '❓' : achievement.icon}</div>
      <div class="achievement-name">${isSecret ? 'Secret Achievement' : achievement.name}</div>
      ${earned ? '<i class="fa-solid fa-check-circle" style="color:#10b981; margin-left: auto;"></i>' : ''}
    `;
    grid.appendChild(item);
  });
}

/**
 * Core Achievement Check
 */
async function checkBadges(progress, curriculum = []) {
  const newlyEarned = [];

  ACHIEVEMENTS.forEach(achievement => {
    if (!(progress.badges || []).includes(achievement.id) && achievement.condition(progress, curriculum)) {
      if (!progress.badges) progress.badges = [];
      progress.badges.push(achievement.id);
      newlyEarned.push(achievement);
      
      // Award XP immediately if defined
      if (achievement.xpReward > 0 && typeof addXP === 'function') {
        addXP(achievement.xpReward);
      }
    }
  });

  if (newlyEarned.length > 0) {
    if (typeof saveProgress === 'function') saveProgress(progress);
    newlyEarned.forEach(a => triggerCinematicUnlock(a));
  }
  
  // Sync to backend if online
  if (window.SkillOrbitAPI && window.SkillOrbitAPI.isOnline() && window.SkillOrbitAPI.isAuthenticated()) {
    try {
      const res = await window.SkillOrbitAPI.badges.check();
      if (res.newBadges && res.newBadges.length > 0) {
        res.newBadges.forEach(bId => {
          if (!newlyEarned.find(e => e.id === bId)) {
            const def = ACHIEVEMENTS.find(x => x.id === bId);
            if (def) triggerCinematicUnlock(def);
          }
        });
      }
    } catch (err) {
      console.warn('[gamification] Sync failed:', err.message);
    }
  }

  return newlyEarned;
}

/**
 * ACHIEVMENT UNLOCK CINEMATIC
 */
function triggerCinematicUnlock(achievement) {
  // 1. Play Sound
  playUnlockSound();

  // 2. Create Overlay
  const overlay = document.createElement('div');
  overlay.className = 'achievement-unlock-overlay';
  
  overlay.innerHTML = `
    <div class="achievement-card-cinematic">
      <div class="achievement-xp-badge-cinematic">+${achievement.xpReward} XP</div>
      <div class="achievement-icon-animated">${achievement.icon}</div>
      <div class="achievement-info-cinematic">
        <div class="achievement-label-cinematic">Achievement Unlocked</div>
        <div class="achievement-title-cinematic">${achievement.name}</div>
        <div class="achievement-desc-cinematic">${achievement.description}</div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // 3. Fire Particles (if visuals.js is available)
  if (window.fireConfetti) {
    window.fireConfetti();
  } else if (typeof fireParticleBurst === 'function') {
    fireParticleBurst(window.innerWidth / 2, window.innerHeight * 0.7);
  }

  // 4. Remove after delay
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.8s ease';
    setTimeout(() => overlay.remove(), 800);
  }, 4000);
}

/**
 * Satisfying unlock sound using Web Audio API
 */
function playUnlockSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    const playNote = (freq, delay, duration, type='sine', volume=0.1) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };

    // Arpeggio: C5 -> E5 -> G5 -> C6
    playNote(523.25, 0, 0.5);      // C5
    playNote(659.25, 0.1, 0.5);    // E5
    playNote(783.99, 0.2, 0.5);    // G5
    playNote(1046.50, 0.3, 0.8, 'triangle', 0.15); // C6 (Crystal finish)
    
  } catch (e) {
    console.warn('Audio unlock sound failed to play', e);
  }
}

// Ensure trigger exists for badges UI
function showBadgeToast(badge) {
  // We keep this for backward compatibility but redirect to cinematic
  triggerCinematicUnlock(badge);
}
