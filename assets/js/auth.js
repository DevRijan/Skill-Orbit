// =============================================
// SKILL-ORBIT — auth.js
// User Profile / "Auth" — localStorage-based
// =============================================

const AUTH_KEY     = 'skill-orbit-profile';
const SESSION_KEY  = 'skill-orbit-session';

// ── Avatar Palette ────────────────────────────
const AVATAR_EMOJIS = [
  '🧑‍💻','👩‍🎨','🦸‍♂️','🧙‍♀️','🦊','🐉',
  '🌊','🔥','⚡','🌙','🎯','🚀'
];

const LEVEL_THRESHOLDS = [
  { level: 1,  title: 'Beginner',     minXP: 0    },
  { level: 2,  title: 'Explorer',     minXP: 100  },
  { level: 3,  title: 'Apprentice',   minXP: 250  },
  { level: 4,  title: 'Developer',    minXP: 500  },
  { level: 5,  title: 'Architect',    minXP: 1000 },
  { level: 6,  title: 'Wizard',       minXP: 2000 },
  { level: 7,  title: 'Grandmaster',  minXP: 5000 },
];

// ── Level helpers ─────────────────────────────
function getLevelInfo(xp) {
  let current = LEVEL_THRESHOLDS[0];
  let next    = LEVEL_THRESHOLDS[1];
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXP) {
      current = LEVEL_THRESHOLDS[i];
      next    = LEVEL_THRESHOLDS[i + 1] || null;
      break;
    }
  }
  const xpInLevel   = next ? xp - current.minXP : 0;
  const xpForNext   = next ? next.minXP - current.minXP : 1;
  const percent     = next ? Math.round((xpInLevel / xpForNext) * 100) : 100;
  return { current, next, xpInLevel, xpForNext, percent };
}

// ── Profile CRUD ──────────────────────────────
function getDefaultProfile() {
  return {
    name:       'Learner',
    email:      '',
    avatar:     '🚀',
    joinedAt:   new Date().toISOString(),
  };
}

function getProfile() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;  // not signed in
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveProfile(data) {
  const existing = getProfile() || getDefaultProfile();
  const merged   = { ...existing, ...data };
  localStorage.setItem(AUTH_KEY, JSON.stringify(merged));
  window.dispatchEvent(new CustomEvent('authChanged', { detail: merged }));
  return merged;
}

function isLoggedIn() {
  return getProfile() !== null;
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent('authChanged', { detail: null }));
  // Redirect to landing
  window.location.href = 'index.html';
}

// ── Initials avatar fallback ──────────────────
function getInitials(name) {
  return (name || 'L')
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ── Build navbar avatar chip ──────────────────
function buildNavAvatar(profile) {
  if (!profile) return null;
  const chip = document.createElement('a');
  chip.href      = 'account.html';
  chip.id        = 'navAvatarChip';
  chip.className = 'nav-avatar-chip';
  chip.title     = 'My Account';
  chip.innerHTML = `
    <span class="nav-avatar-emoji">${profile.avatar}</span>
    <span class="nav-avatar-name">${profile.name.split(' ')[0]}</span>
    <i class="fa-solid fa-chevron-down nav-avatar-caret"></i>
  `;
  return chip;
}

// ── Inject Login Button ───────────────────────
function buildLoginButton() {
  const btn = document.createElement('button');
  btn.id        = 'navLoginBtn';
  btn.className = 'btn btn-primary btn-sm';
  btn.innerHTML = '<i class="fa-solid fa-user"></i> Login';
  btn.addEventListener('click', () => showAuthModal());
  return btn;
}

// ── Update all nav auth elements ──────────────
function updateNavAuth() {
  // Remove previous
  document.querySelectorAll('#navAvatarChip, #navLoginBtn').forEach(el => el.remove());

  const navActions = document.querySelector('.nav-actions') || document.querySelector('.nav-links');
  if (!navActions) return;

  const profile = getProfile();
  if (profile) {
    const chip = buildNavAvatar(profile);
    navActions.prepend(chip);
  } else {
    const btn = buildLoginButton();
    navActions.prepend(btn);
  }

  // Update sidebar user info if it exists
  updateSidebarUser();
}

function updateSidebarUser() {
  const profile  = getProfile();
  const progress = typeof loadProgress === 'function' ? loadProgress() : null;

  const nameEl   = document.querySelector('.sidebar-user .user-name');
  const xpEl     = document.getElementById('totalXP');
  const streakEl = document.getElementById('streakCount');
  const emojiEl  = document.querySelector('.sidebar-user .user-avatar');

  if (nameEl && profile)  nameEl.textContent = profile.name;
  if (xpEl   && progress) xpEl.textContent   = progress.xp;
  if (streakEl && progress) streakEl.textContent = progress.streak || 0;
  if (emojiEl  && profile) {
    emojiEl.textContent  = '';
    emojiEl.style.fontSize = '1.4rem';
    emojiEl.innerHTML    = profile.avatar;
  }
}

// ── Auth Modal ────────────────────────────────
function showAuthModal(tab = 'login') {
  let modal = document.getElementById('authModal');
  if (!modal) {
    modal = createAuthModalDOM();
    document.body.appendChild(modal);
  }
  modal.classList.add('active');
  document.body.classList.add('modal-open');
  switchAuthTab(tab);
}

function hideAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.toggle('active', f.id === `authForm-${tab}`));
}

function createAuthModalDOM() {
  const wrap = document.createElement('div');
  wrap.id        = 'authModal';
  wrap.className = 'auth-modal-wrap';
  wrap.innerHTML = `
    <div class="auth-modal-overlay" id="authOverlay"></div>
    <div class="auth-modal-card" role="dialog" aria-modal="true" aria-label="Login or Sign Up">
      <div class="auth-modal-glow"></div>

      <div class="auth-modal-logo">
        <i class="fa-solid fa-circle-nodes"></i> Skill<span>Orbit</span>
      </div>

      <div class="auth-tab-bar">
        <button class="auth-tab-btn active" data-tab="login">Login</button>
        <button class="auth-tab-btn"         data-tab="signup">Sign Up</button>
      </div>

      <!-- LOGIN FORM -->
      <form class="auth-form active" id="authForm-login" autocomplete="off">
        <p class="auth-subtitle">Welcome back, learner! 👋</p>
        <div class="auth-field">
          <label for="loginName"><i class="fa-solid fa-user"></i> Display Name</label>
          <input type="text" id="loginName" class="auth-input" placeholder="Enter your name" required />
        </div>
        <button type="submit" class="btn btn-primary auth-submit-btn" id="loginSubmitBtn">
          <i class="fa-solid fa-rocket"></i> Let's Go!
        </button>
        <p class="auth-switch">Don't have a profile? <button type="button" class="auth-link-btn" data-switch="signup">Sign Up</button></p>
      </form>

      <!-- SIGNUP FORM -->
      <form class="auth-form" id="authForm-signup" autocomplete="off">
        <p class="auth-subtitle">Create your learning identity ✨</p>
        <div class="auth-field">
          <label for="signupName"><i class="fa-solid fa-user"></i> Display Name</label>
          <input type="text" id="signupName" class="auth-input" placeholder="E.g. Code Ninja" required />
        </div>
        <div class="auth-field">
          <label for="signupEmail"><i class="fa-solid fa-envelope"></i> Email <span class="optional">(optional)</span></label>
          <input type="email" id="signupEmail" class="auth-input" placeholder="your@email.com" />
        </div>
        <div class="auth-field">
          <label><i class="fa-solid fa-face-smile"></i> Pick Your Avatar</label>
          <div class="avatar-picker" id="avatarPicker"></div>
        </div>
        <button type="submit" class="btn btn-primary auth-submit-btn" id="signupSubmitBtn">
          <i class="fa-solid fa-star"></i> Create Profile
        </button>
        <p class="auth-switch">Already have one? <button type="button" class="auth-link-btn" data-switch="login">Login</button></p>
      </form>

    </div>
  `;

  // Build avatar picker
  const picker = wrap.querySelector('#avatarPicker');
  AVATAR_EMOJIS.forEach((emoji, i) => {
    const btn = document.createElement('button');
    btn.type      = 'button';
    btn.className = `avatar-opt${i === 11 ? ' selected' : ''}`;
    btn.dataset.emoji = emoji;
    btn.textContent   = emoji;
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.avatar-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    picker.appendChild(btn);
  });

  // Tab switching
  wrap.querySelectorAll('.auth-tab-btn').forEach(b => {
    b.addEventListener('click', () => switchAuthTab(b.dataset.tab));
  });
  wrap.querySelectorAll('.auth-link-btn').forEach(b => {
    b.addEventListener('click', () => switchAuthTab(b.dataset.switch));
  });

  // Overlay close — only if logged in already
  wrap.querySelector('#authOverlay').addEventListener('click', () => {
    if (isLoggedIn()) hideAuthModal();
  });

  // Login submit
  wrap.querySelector('#authForm-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = wrap.querySelector('#loginName').value.trim() || 'Learner';
    let profile = getProfile();
    if (!profile) {
      profile = saveProfile({ name, avatar: '🚀', joinedAt: new Date().toISOString() });
    }
    hideAuthModal();
    updateNavAuth();
    onAuthSuccess(profile);
  });

  // Signup submit
  wrap.querySelector('#authForm-signup').addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = wrap.querySelector('#signupName').value.trim()  || 'Learner';
    const email = wrap.querySelector('#signupEmail').value.trim();
    const picked = wrap.querySelector('.avatar-opt.selected');
    const avatar = picked ? picked.dataset.emoji : '🚀';
    const profile = saveProfile({ name, email, avatar, joinedAt: new Date().toISOString() });
    hideAuthModal();
    updateNavAuth();
    onAuthSuccess(profile);
  });

  return wrap;
}

// Called after successful login/signup
function onAuthSuccess(profile) {
  updateNavAuth();
  // If we're on index, redirect to dashboard
  const onIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
  if (onIndex) {
    showWelcomeToast(profile);
  }
}

function showWelcomeToast(profile) {
  const toast = document.createElement('div');
  toast.className = 'auth-welcome-toast';
  toast.innerHTML = `${profile.avatar} Welcome, <strong>${profile.name}</strong>! 🎉`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 50);
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ── Init ──────────────────────────────────────
function initAuth({ requireLogin = false } = {}) {
  updateNavAuth();
  if (requireLogin && !isLoggedIn()) {
    showAuthModal('signup');
  }
  // Listen for cross-tab changes
  window.addEventListener('storage', (e) => {
    if (e.key === AUTH_KEY) updateNavAuth();
  });
}
