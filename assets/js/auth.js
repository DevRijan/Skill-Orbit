// =============================================
// SKILL-ORBIT — auth.js  v2.0
// Full email + password auth with JWT backend.
// Falls back to localStorage when offline.
// =============================================

const AUTH_KEY    = 'skill-orbit-profile';
const SESSION_KEY = 'skill-orbit-session';

// ── Avatar Palette ───────────────────────────────────────────────────────────
const AVATAR_EMOJIS = [
  '🧑‍💻','👩‍🎨','🦸‍♂️','🧙‍♀️','🦊','🐉',
  '🌊','🔥','⚡','🌙','🎯','🚀'
];

const LEVEL_THRESHOLDS = [
  { level: 1,  title: 'Beginner',    minXP: 0    },
  { level: 2,  title: 'Explorer',    minXP: 100  },
  { level: 3,  title: 'Apprentice',  minXP: 250  },
  { level: 4,  title: 'Developer',   minXP: 500  },
  { level: 5,  title: 'Architect',   minXP: 1000 },
  { level: 6,  title: 'Wizard',      minXP: 2000 },
  { level: 7,  title: 'Grandmaster', minXP: 5000 },
];

// ── Level helpers ─────────────────────────────────────────────────────────────
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
  const xpInLevel = next ? xp - current.minXP : 0;
  const xpForNext = next ? next.minXP - current.minXP : 1;
  const percent   = next ? Math.round((xpInLevel / xpForNext) * 100) : 100;
  return { current, next, xpInLevel, xpForNext, percent };
}

// ── Profile CRUD (localStorage) ──────────────────────────────────────────────

function getDefaultProfile() {
  return { name: 'Learner', email: '', avatar: '🚀', joinedAt: new Date().toISOString() };
}

function getProfile() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function saveProfile(data) {
  const existing = getProfile() || getDefaultProfile();
  const merged   = { ...existing, ...data };
  localStorage.setItem(AUTH_KEY, JSON.stringify(merged));
  window.dispatchEvent(new CustomEvent('authChanged', { detail: merged }));
  return merged;
}

function isLoggedIn() {
  // Online mode: check JWT token
  if (window.SkillOrbitAPI && window.SkillOrbitAPI.isAuthenticated()) return true;
  // Offline fallback: check localStorage profile
  return getProfile() !== null;
}

function logout() {
  if (window.SkillOrbitAPI) {
    if (window.SkillOrbitAPI.isOnline()) {
      // Fire and forget the server logout notification
      window.SkillOrbitAPI.auth.logout().catch(() => {});
    }
    // Synchronously eject the JWT token before the page dumps its state!
    if (typeof window.SkillOrbitAPI.clearToken === 'function') {
      window.SkillOrbitAPI.clearToken();
    }
  }
  
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('skill-orbit-progress');
  
  window.dispatchEvent(new CustomEvent('authChanged', { detail: null }));
  window.location.href = 'index.html';
}

// ── Initials avatar fallback ──────────────────────────────────────────────────
function getInitials(name) {
  return (name || 'L').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ── Navbar ───────────────────────────────────────────────────────────────────

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

function buildLoginButton() {
  const btn = document.createElement('button');
  btn.id        = 'navLoginBtn';
  btn.className = 'btn btn-primary btn-sm';
  btn.innerHTML = '<i class="fa-solid fa-user"></i> Login';
  btn.addEventListener('click', () => showAuthModal());
  return btn;
}

function updateNavAuth() {
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

  updateSidebarUser();
}

function updateSidebarUser() {
  const profile  = getProfile();
  const progress = typeof loadProgress === 'function' ? loadProgress() : null;

  const nameEl   = document.querySelector('.sidebar-user .user-name');
  const xpEl     = document.getElementById('totalXP');
  const streakEl = document.getElementById('streakCount');
  const emojiEl  = document.querySelector('.sidebar-user .user-avatar');

  if (nameEl   && profile)  nameEl.textContent   = profile.name;
  if (xpEl     && progress) xpEl.textContent     = progress.xp;
  if (streakEl && progress) streakEl.textContent = progress.streak || 0;
  if (emojiEl  && profile)  emojiEl.innerHTML    = profile.avatar;
}

// ── Auth Modal ────────────────────────────────────────────────────────────────

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
  document.querySelectorAll('.auth-tab-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.tab === tab)
  );
  document.querySelectorAll('.auth-form').forEach(f =>
    f.classList.toggle('active', f.id === `authForm-${tab}`)
  );
}

function setAuthError(formId, msg) {
  const form = document.getElementById(formId);
  if (!form) return;
  let err = form.querySelector('.auth-error');
  if (!err) {
    err = document.createElement('p');
    err.className = 'auth-error';
    form.prepend(err);
  }
  err.textContent = msg;
  err.style.display = msg ? 'block' : 'none';
}

function setAuthLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = loading;
  btn.innerHTML = loading
    ? '<i class="fa-solid fa-spinner fa-spin"></i> Please wait…'
    : btn.dataset.originalText || btn.innerHTML;
  if (!loading && btn.dataset.originalText) {
    btn.innerHTML = btn.dataset.originalText;
  }
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
        <button class="auth-tab-btn"        data-tab="signup">Sign Up</button>
      </div>

      <!-- LOGIN FORM -->
      <form class="auth-form active" id="authForm-login" autocomplete="off">
        <p class="auth-subtitle">Welcome back, learner! 👋</p>
        <div class="auth-field">
          <label for="loginEmail"><i class="fa-solid fa-envelope"></i> Email</label>
          <input type="email" id="loginEmail" class="auth-input" placeholder="your@email.com" required />
        </div>
        <div class="auth-field">
          <label for="loginPassword"><i class="fa-solid fa-lock"></i> Password</label>
          <div class="auth-password-wrap">
            <input type="password" id="loginPassword" class="auth-input" placeholder="Your password" required />
            <button type="button" class="auth-eye-btn" data-target="loginPassword" aria-label="Toggle password">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
        <button type="submit" class="btn btn-primary auth-submit-btn" id="loginSubmitBtn"
          data-original-text='<i class="fa-solid fa-rocket"></i> Let\'s Go!'>
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
          <label for="signupEmail"><i class="fa-solid fa-envelope"></i> Email</label>
          <input type="email" id="signupEmail" class="auth-input" placeholder="your@email.com" required />
        </div>
        <div class="auth-field">
          <label for="signupPassword"><i class="fa-solid fa-lock"></i> Password</label>
          <div class="auth-password-wrap">
            <input type="password" id="signupPassword" class="auth-input" placeholder="At least 6 characters" required minlength="6" />
            <button type="button" class="auth-eye-btn" data-target="signupPassword" aria-label="Toggle password">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
        <div class="auth-field">
          <label><i class="fa-solid fa-face-smile"></i> Pick Your Avatar</label>
          <div class="avatar-picker" id="avatarPicker"></div>
        </div>
        <button type="submit" class="btn btn-primary auth-submit-btn" id="signupSubmitBtn"
          data-original-text='<i class="fa-solid fa-star"></i> Create Profile'>
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
    btn.type        = 'button';
    btn.className   = `avatar-opt${i === 11 ? ' selected' : ''}`;
    btn.dataset.emoji = emoji;
    btn.textContent   = emoji;
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.avatar-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    picker.appendChild(btn);
  });

  // Password visibility toggles
  wrap.querySelectorAll('.auth-eye-btn').forEach(eyeBtn => {
    eyeBtn.addEventListener('click', () => {
      const targetId = eyeBtn.dataset.target;
      const input = wrap.querySelector(`#${targetId}`);
      if (!input) return;
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      eyeBtn.querySelector('i').className = isText ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
    });
  });

  // Tab switching
  wrap.querySelectorAll('.auth-tab-btn').forEach(b =>
    b.addEventListener('click', () => switchAuthTab(b.dataset.tab))
  );
  wrap.querySelectorAll('.auth-link-btn').forEach(b =>
    b.addEventListener('click', () => switchAuthTab(b.dataset.switch))
  );

  // Overlay close — only if logged in
  wrap.querySelector('#authOverlay').addEventListener('click', () => {
    if (isLoggedIn()) hideAuthModal();
  });

  // ── Login submit ────────────────────────────────────────────────────────────
  wrap.querySelector('#authForm-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email    = wrap.querySelector('#loginEmail').value.trim();
    const password = wrap.querySelector('#loginPassword').value;

    setAuthError('authForm-login', '');
    setAuthLoading('loginSubmitBtn', true);

    // Online mode: real API login
    if (window.SkillOrbitAPI && window.SkillOrbitAPI.isOnline()) {
      try {
        const res = await window.SkillOrbitAPI.auth.login({ email, password });
        const profile = {
          name:     res.user.name,
          email:    res.user.email,
          avatar:   res.user.avatar,
          joinedAt: res.user.joinedAt,
          id:       res.user.id,
        };
        saveProfile(profile);

        // Sync any existing localStorage progress to server (merges local with server)
        const localProgress = typeof loadProgress === 'function' ? loadProgress() : null;
        if (localProgress && localProgress.xp > 0) {
          await window.SkillOrbitAPI.progress.sync(localProgress).catch(() => {});
        }
        
        // Next, fully reload the current state from the database
        if (typeof pullProgressFromServer === 'function') {
          await pullProgressFromServer();
        }

        setAuthLoading('loginSubmitBtn', false);
        hideAuthModal();
        updateNavAuth();
        onAuthSuccess(profile);
      } catch (err) {
        setAuthLoading('loginSubmitBtn', false);
        setAuthError('authForm-login', err.message || 'Login failed. Check your credentials.');
      }
    } else {
      // Offline fallback — name-only
      const name = email.split('@')[0] || 'Learner';
      const profile = saveProfile({ name, email, avatar: '🚀', joinedAt: new Date().toISOString() });
      setAuthLoading('loginSubmitBtn', false);
      hideAuthModal();
      updateNavAuth();
      onAuthSuccess(profile);
    }
  });

  // ── Signup submit ────────────────────────────────────────────────────────────
  wrap.querySelector('#authForm-signup').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name     = wrap.querySelector('#signupName').value.trim() || 'Learner';
    const email    = wrap.querySelector('#signupEmail').value.trim();
    const password = wrap.querySelector('#signupPassword').value;
    const picked   = wrap.querySelector('.avatar-opt.selected');
    const avatar   = picked ? picked.dataset.emoji : '🚀';

    setAuthError('authForm-signup', '');
    setAuthLoading('signupSubmitBtn', true);

    // Online mode: real API register
    if (window.SkillOrbitAPI && window.SkillOrbitAPI.isOnline()) {
      try {
        const res = await window.SkillOrbitAPI.auth.register({ name, email, password, avatar });
        const profile = {
          name:     res.user.name,
          email:    res.user.email,
          avatar:   res.user.avatar,
          joinedAt: res.user.joinedAt,
          id:       res.user.id,
        };
        saveProfile(profile);

        // Sync any existing localStorage progress to server (merges local with server)
        const localProgress = typeof loadProgress === 'function' ? loadProgress() : null;
        if (localProgress && localProgress.xp > 0) {
          await window.SkillOrbitAPI.progress.sync(localProgress).catch(() => {});
        }
        
        // Next, fully reload the current state from the database
        if (typeof pullProgressFromServer === 'function') {
          await pullProgressFromServer();
        }

        setAuthLoading('signupSubmitBtn', false);
        hideAuthModal();
        updateNavAuth();
        onAuthSuccess(profile);
      } catch (err) {
        setAuthLoading('signupSubmitBtn', false);
        setAuthError('authForm-signup', err.message || 'Registration failed. Try again.');
      }
    } else {
      // Offline fallback
      const profile = saveProfile({ name, email, avatar, joinedAt: new Date().toISOString() });
      setAuthLoading('signupSubmitBtn', false);
      hideAuthModal();
      updateNavAuth();
      onAuthSuccess(profile);
    }
  });

  return wrap;
}

// ── Post-auth actions ─────────────────────────────────────────────────────────

function onAuthSuccess(profile) {
  updateNavAuth();
  const onIndex =
    window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
  if (onIndex) showWelcomeToast(profile);
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

// ── Init ──────────────────────────────────────────────────────────────────────

async function initAuth({ requireLogin = false } = {}) {
  // Check if backend is up
  if (window.SkillOrbitAPI) {
    await window.SkillOrbitAPI.init();

    // If JWT token exists, validate it by fetching profile
    if (window.SkillOrbitAPI.isAuthenticated()) {
      try {
        const res = await window.SkillOrbitAPI.auth.getProfile();
        const stored = getProfile();
        // Refresh local profile from server
        saveProfile({
          ...stored,
          name:   res.user.name,
          email:  res.user.email,
          avatar: res.user.avatar,
          id:     res.user.id,
        });

        // Sync any offline progress up to server BEFORE pulling
        const localProgress = typeof loadProgress === 'function' ? loadProgress() : null;
        if (localProgress && localProgress.xp > 0) {
          await window.SkillOrbitAPI.progress.sync(localProgress).catch(() => {});
        }

        // Pull user's latest joined progress into localStorage on page start
        if (typeof pullProgressFromServer === 'function') {
          await pullProgressFromServer();
        }
      } catch (err) {
        if (err.status === 401) {
          // Token expired — clear and show login
          window.SkillOrbitAPI.clearToken();
          localStorage.removeItem(AUTH_KEY);
        }
      }
    }
  }

  updateNavAuth();

  if (requireLogin && !isLoggedIn()) {
    showAuthModal('signup');
  }

  // Cross-tab sync
  window.addEventListener('storage', (e) => {
    if (e.key === AUTH_KEY) updateNavAuth();
  });
}
