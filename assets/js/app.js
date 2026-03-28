// =============================================
// SKILL-ORBIT — app.js
// App initialization: theme, navbar, routing
// =============================================

/**
 * Initialize the application on DOM ready.
 * Handles: dark/light mode toggle, navbar scroll effect, hash routing.
 */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initRouter();
});

// ── Theme ──────────────────────────────────────
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('skill-orbit-theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (toggle) toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('skill-orbit-theme', isLight ? 'light' : 'dark');
      toggle.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });
  }
}

// ── Navbar scroll effect ────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ── Simple Hash Router ──────────────────────────
function initRouter() {
  // Reads ?lesson=html-01 from URL query params
  const params = new URLSearchParams(window.location.search);
  const lessonId = params.get('lesson');
  if (lessonId) {
    // Store for lesson.js to pick up
    sessionStorage.setItem('current-lesson', lessonId);
  }
}

// ── Utility: Show XP Toast ──────────────────────
function showXPToast(xp) {
  const toast = document.getElementById('xpToast');
  const text  = document.getElementById('xpToastText');
  if (!toast || !text) return;

  text.textContent = `+${xp} XP Earned!`;
  toast.style.display = 'flex';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// ── Utility: Animate element ────────────────────
function animateElement(el, animation = 'animate-fadeInUp') {
  el.classList.remove(animation);
  void el.offsetWidth; // reflow
  el.classList.add(animation);
}
