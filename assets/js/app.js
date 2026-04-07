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
  initSidebar();
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
      

      
      if (window.updateEditorTheme) {
        window.updateEditorTheme(isLight);
      }
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

// ── Sidebar Toggle ──────────────────────────────
function initSidebar() {
  const toggleBtn = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', () => {
      document.body.classList.remove('sidebar-open');
    });
  }
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

// ── Utility: Live Global XP Sync ────────────────
window.updateLiveXPDisplay = function() {
  if (typeof loadProgress !== 'function') return;
  const progress = loadProgress();
  const xpElements = document.querySelectorAll('#totalXP, .user-total-xp');
  xpElements.forEach(el => {
    el.textContent = progress.xp;
    // Tiny bounce animation to show it updated live
    el.style.transform = 'scale(1.2)';
    el.style.display = 'inline-block';
    el.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    setTimeout(() => {
      el.style.transform = 'scale(1)';
    }, 200);
  });
};
