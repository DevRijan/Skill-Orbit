// =============================================
// SKILL-ORBIT — lessons.js
// Loads curriculum JSON, renders lesson cards & sidebar
// =============================================

let CURRICULUM = [];

function toEmptyLesson(lesson = {}) {
  return {
    ...lesson,
    title: 'Empty Lesson',
    subtitle: '',
    theory: '',
    steps: [],
    interactive_steps: [],
    codeExample: '',
    challenge: {
      instruction: '',
      hint: '',
      startCode: '',
      startingCode: '',
      solution: '',
    },
    quiz: [],
  };
}

function getUpgradedCurriculum(rawCurriculum) {
  const base = Array.isArray(rawCurriculum) ? rawCurriculum : [];
  return base.map((lesson) => toEmptyLesson(lesson));
}

/**
 * Loads curriculum.json and renders the dashboard/sidebar.
 */
async function loadDashboard() {
  try {
<<<<<<< HEAD
    CURRICULUM = getUpgradedCurriculum(window.SKILL_ORBIT_CURRICULUM || []);
    // renderDashboard(); // Obsolete, replaced by switchCourse
=======
    CURRICULUM = window.SKILL_ORBIT_CURRICULUM || [];
    renderDashboard();
>>>>>>> parent of 7cca945 (Created a Gamified Dashboard Path)
    renderSidebar();
    updateProgressBars();
  } catch (err) {
    console.error('Failed to load curriculum:', err);
  }
}

// ── Section order (curriculum order) ──────────────
function orderedSectionTitles(lessons) {
  const titles = [];
  lessons.forEach((l) => {
    const t = l.section || 'General';
    if (!titles.includes(t)) titles.push(t);
  });
  return titles;
}

function createLessonTopicGroup(sectionTitle, sectionLessons, track, startIndex) {
  const wrap = document.createElement('article');
  wrap.className = `lesson-topic-group lesson-topic-group--${track}`;
  wrap.setAttribute('aria-labelledby', `topic-${track}-${sectionTitle.replace(/\s+/g, '-')}`);

  const head = document.createElement('header');
  head.className = 'lesson-topic-head';
  const count = sectionLessons.length;
  head.innerHTML = `
    <div class="lesson-topic-head-main">
      <span class="lesson-topic-glyph" aria-hidden="true"><i class="fa-solid fa-bookmark"></i></span>
      <div class="lesson-topic-head-copy">
        <h3 class="lesson-topic-title" id="topic-${track}-${sectionTitle.replace(/\s+/g, '-')}">${sectionTitle}</h3>
        <p class="lesson-topic-meta">${count} lesson${count === 1 ? '' : 's'}</p>
      </div>
    </div>
    <div class="lesson-topic-rail" aria-hidden="true"></div>
  `;

  const grid = document.createElement('div');
  grid.className = 'lesson-cards-grid';
  sectionLessons.forEach((lesson, i) => {
    grid.appendChild(createLessonCard(lesson, startIndex + i));
  });

  wrap.appendChild(head);
  wrap.appendChild(grid);
  return wrap;
}

function renderModuleLessonGroups(container, moduleLessons, track) {
  container.innerHTML = '';
  container.classList.add('module-lesson-groups', 'stagger-children');

  const titles = orderedSectionTitles(moduleLessons);
  if (titles.length === 0) return;

  let offset = 0;
  titles.forEach((sectionTitle) => {
    const sectionLessons = moduleLessons.filter((l) => (l.section || 'General') === sectionTitle);
    container.appendChild(createLessonTopicGroup(sectionTitle, sectionLessons, track, offset));
    offset += sectionLessons.length;
  });
}

// ── Dashboard Lesson Grid ─────────────────────────
function renderDashboard() {
  const htmlGrid = document.getElementById('html-lessons-grid');
  const cssGrid  = document.getElementById('css-lessons-grid');
  if (!htmlGrid || !cssGrid) return;

  const htmlLessons = CURRICULUM.filter(l => l.module === 'html');
  const cssLessons  = CURRICULUM.filter(l => l.module === 'css');

  renderModuleLessonGroups(htmlGrid, htmlLessons, 'html');
  renderModuleLessonGroups(cssGrid, cssLessons, 'css');
}

function createLessonCard(lesson, index) {
  const progress  = loadProgress();
  const completed = progress.completedLessons.includes(lesson.id);

  const card = document.createElement('div');
  card.className = `lesson-card-item ${completed ? 'completed' : ''}`;
  card.innerHTML = `
    <span class="lesson-num">Lesson ${index + 1}</span>
    <span class="lesson-card-title">${lesson.title}</span>
    <span class="lesson-xp-badge"><i class="fa-solid fa-bolt"></i> ${lesson.xp} XP</span>
  `;
  card.addEventListener('click', () => {
    window.location.href = `lesson.html?lesson=${lesson.id}`;
  });
  return card;
}

// ── Sidebar ───────────────────────────────────────
function renderSidebar() {
  const htmlSidebar = document.getElementById('html-sidebar-lessons');
  const cssSidebar  = document.getElementById('css-sidebar-lessons');
  if (!htmlSidebar || !cssSidebar) return;

  const htmlLessons = CURRICULUM.filter(l => l.module === 'html');
  const cssLessons  = CURRICULUM.filter(l => l.module === 'css');

  htmlSidebar.innerHTML = '';
  cssSidebar.innerHTML  = '';

  renderSidebarModule(htmlSidebar, htmlLessons);
  renderSidebarModule(cssSidebar, cssLessons);

  // Update XP and streak
  const progress = loadProgress();
  const xpEl = document.getElementById('totalXP');
  const streakEl = document.getElementById('streakCount');
  if (xpEl) xpEl.textContent = progress.xp;
  if (streakEl) streakEl.textContent = progress.streak || 0;

  // Update User Profile Name from auth module
  const profile = (typeof getProfile === 'function') ? getProfile() : null;
  const nameEls = document.querySelectorAll('.user-name');
  nameEls.forEach(el => el.textContent = profile ? profile.name : 'Learner');
  // Update sidebar avatar emoji
  const avatarEl = document.querySelector('.sidebar-user .user-avatar');
  if (avatarEl && profile) {
    avatarEl.innerHTML = profile.avatar || '🚀';
    avatarEl.style.fontSize = '1.4rem';
  }
}

function renderSidebarModule(container, lessons, options = {}) {
  const { focusLessonId = null } = options;
  const titles = orderedSectionTitles(lessons);

  if (titles.length === 0) {
    lessons.forEach((l) => container.appendChild(createSidebarItem(l)));
    return;
  }

  titles.forEach((sectionTitle) => {
    const sectionLessons = lessons.filter((l) => (l.section || 'General') === sectionTitle);
    const group = document.createElement('div');
    group.className = 'sidebar-topic-group';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sidebar-topic-toggle';
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-controls', `sidebar-panel-${sectionTitle.replace(/\s+/g, '-')}`);
    btn.innerHTML = `
      <span class="sidebar-topic-title">${sectionTitle}</span>
      <i class="fa-solid fa-chevron-down sidebar-topic-caret" aria-hidden="true"></i>
    `;

    const panel = document.createElement('div');
    panel.className = 'sidebar-topic-lessons';
    panel.id = `sidebar-panel-${sectionTitle.replace(/\s+/g, '-')}`;
    sectionLessons.forEach((l) => panel.appendChild(createSidebarItem(l)));

    btn.addEventListener('click', () => {
      const collapsed = group.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    });

    group.appendChild(btn);
    group.appendChild(panel);
    container.appendChild(group);
  });

  if (focusLessonId) {
    container.querySelectorAll('.sidebar-topic-group').forEach((g) => {
      const active = g.querySelector(`.sidebar-lesson-item[data-id="${focusLessonId}"]`);
      const toggle = g.querySelector('.sidebar-topic-toggle');
      if (active) {
        g.classList.remove('collapsed');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
      } else {
        g.classList.add('collapsed');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

function createSidebarItem(lesson) {
  const progress  = loadProgress();
  const completed = progress.completedLessons.includes(lesson.id);

  const item = document.createElement('div');
  item.className = `sidebar-lesson-item ${completed ? 'completed' : ''}`;
  item.dataset.id = lesson.id; // Add ID for active marking
  item.innerHTML = `
    <i class="fa-solid ${completed ? 'fa-circle-check' : 'fa-circle-dot'}"></i>
    <span>${lesson.title}</span>
  `;
  item.addEventListener('click', () => {
    window.location.href = `lesson.html?lesson=${lesson.id}`;
  });
  return item;
}

// ── Progress Bars ─────────────────────────────────
function updateProgressBars() {
  const htmlProg = getModuleProgress('html', CURRICULUM);
  const cssProg  = getModuleProgress('css',  CURRICULUM);

  const htmlBar  = document.getElementById('htmlProgressBar');
  const cssBar   = document.getElementById('cssProgressBar');
  const htmlText = document.getElementById('htmlProgressText');
  const cssText  = document.getElementById('cssProgressText');

  if (htmlBar)  htmlBar.style.width  = htmlProg.percent + '%';
  if (cssBar)   cssBar.style.width   = cssProg.percent  + '%';
  if (htmlText) htmlText.textContent = `${htmlProg.completed} / ${htmlProg.total} lessons`;
  if (cssText)  cssText.textContent  = `${cssProg.completed}  / ${cssProg.total} lessons`;
}

const LESSON_SIDEBAR_COLLAPSED_KEY = 'skill-orbit-lesson-sidebar-collapsed';

let lessonSidebarToggleInitialized = false;

/**
 * Desktop: collapses the curriculum column; mobile: slides the curriculum drawer.
 * Top bar and sidebar header both toggle the same state.
 */
function initLessonSidebarToggle() {
  if (lessonSidebarToggleInitialized) return;
  const wrapper = document.querySelector('.lesson-wrapper');
  const overlay = document.getElementById('lessonSidebarOverlay');
  const toggles = [
    document.getElementById('lessonSidebarToggle'),
    document.getElementById('lessonSidebarToggleHeader')
  ].filter(Boolean);

  if (!wrapper || toggles.length === 0) return;
  lessonSidebarToggleInitialized = true;

  const mq = window.matchMedia('(max-width: 1024px)');

  const isMobile = () => mq.matches;

  function syncOverlayA11y() {
    if (!overlay) return;
    const open = document.body.classList.contains('lesson-curriculum-open');
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function updateAria() {
    let expanded;
    if (isMobile()) {
      expanded = document.body.classList.contains('lesson-curriculum-open');
    } else {
      expanded = !wrapper.classList.contains('sidebar-collapsed');
    }
    toggles.forEach((btn) => btn.setAttribute('aria-expanded', expanded ? 'true' : 'false'));
    const sidebar = document.getElementById('lessonSidebar');
    if (sidebar) {
      sidebar.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    }
    syncOverlayA11y();
  }

  function toggle() {
    if (isMobile()) {
      document.body.classList.toggle('lesson-curriculum-open');
    } else {
      wrapper.classList.toggle('sidebar-collapsed');
      const collapsed = wrapper.classList.contains('sidebar-collapsed');
      localStorage.setItem(LESSON_SIDEBAR_COLLAPSED_KEY, collapsed ? 'true' : 'false');
    }
    updateAria();
  }

  if (!isMobile()) {
    const saved = localStorage.getItem(LESSON_SIDEBAR_COLLAPSED_KEY);
    if (saved === 'true') {
      wrapper.classList.add('sidebar-collapsed');
    }
  }

  toggles.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      document.body.classList.remove('lesson-curriculum-open');
      updateAria();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!document.body.classList.contains('lesson-curriculum-open')) return;
    document.body.classList.remove('lesson-curriculum-open');
    updateAria();
  });

  mq.addEventListener('change', () => {
    if (isMobile()) {
      document.body.classList.remove('lesson-curriculum-open');
    }
    updateAria();
  });

  updateAria();
}

// ── Lesson navigation (footer + side buttons at end of scroll) ──
let lessonNavigationInitialized = false;


function initLessonNavigation(currentId) {
  if (lessonNavigationInitialized) return;
  lessonNavigationInitialized = true;

  const moduleId = currentId.split('-')[0];
  const moduleLessons = CURRICULUM.filter((l) => l.module === moduleId);
  const currentIndex = moduleLessons.findIndex((l) => l.id === currentId);
  if (currentIndex < 0 || moduleLessons.length === 0) return;

  const goPrev = () => {
    if (currentIndex > 0) {
      window.location.href = `lesson.html?lesson=${moduleLessons[currentIndex - 1].id}`;
    } else {
      window.location.href = 'dashboard.html';
    }
  };

  const goNext = () => {
    if (currentIndex < moduleLessons.length - 1) {
      window.location.href = `lesson.html?lesson=${moduleLessons[currentIndex + 1].id}`;
    } else {
      window.location.href = 'dashboard.html';
    }
  };

  document.getElementById('prevLessonBtn')?.addEventListener('click', goPrev);
  document.getElementById('nextLessonBtn')?.addEventListener('click', goNext);

  const nextBtn = document.getElementById('nextLessonBtn');

  if (currentIndex >= moduleLessons.length - 1) {
    if (nextBtn) {
      nextBtn.innerHTML = 'Finish Module <i class="fa-solid fa-flag-checkered"></i>';
    }
  }
}

// ── Lesson Page Initialization ────────────────────
async function initLessonPage() {
  initLessonSidebarToggle();

  const params   = new URLSearchParams(window.location.search);
  const lessonId = params.get('lesson') || 'html-01';

  try {
    // 1. Ensure CURRICULUM is loaded
    if (!CURRICULUM || CURRICULUM.length === 0) {
      CURRICULUM = getUpgradedCurriculum(window.SKILL_ORBIT_CURRICULUM || []);
    }
    
    // 2. Find the lesson metadata/content
    const lessonData = CURRICULUM.find(l => l.id === lessonId);

    if (!lessonData) {
      throw new Error('Lesson not found in curriculum.');
    }

    // 3. Check if content (theory) is already in the curriculum object
    if (lessonData.theory) {
      renderLesson(lessonData);
      initEditorWithLesson(lessonData);
      initQuiz(lessonData.quiz || [], lessonId);
      renderLessonNav(lessonId);
      renderLessonSidebar(lessonData.module);
      initLessonNavigation(lessonId);
    } else {
      // Fallback: If theory is missing, try loading from the external file (legacy support)
      const data = await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `data/lessons/${lessonId.split('-')[0]}/${lessonId}.js`;
        
        script.onload = () => {
          const globalVarName = `LESSON_DATA_${lessonId.replace('-', '_')}`;
          if (window[globalVarName]) {
            resolve(window[globalVarName]);
          } else {
            reject(new Error('Lesson data variable not found in JS file.'));
          }
        };
        
        script.onerror = () => reject(new Error('Failed to load lesson script.'));
        document.head.appendChild(script);
      });

      renderLesson(data);
      initEditorWithLesson(data);
      initQuiz(data.quiz || [], lessonId);
      renderLessonNav(lessonId);
      renderLessonSidebar(data.module);
      initLessonNavigation(lessonId);
    }
  } catch (err) {
    console.error('Failed to load lesson:', err);
    document.getElementById('theoryBody').innerHTML =
      `<div class="error-state">
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>Lesson content not found. This lesson might still be under development.</p>
        <a href="dashboard.html" class="btn btn-outline">Back to Dashboard</a>
      </div>`;
  }
}

function renderLessonSidebar(module) {
  const sidebarContainer = document.getElementById('lesson-sidebar-content');
  if (!sidebarContainer) return;

  const moduleLessons = CURRICULUM.filter(l => l.module === module);
  sidebarContainer.innerHTML = '';
  const params = new URLSearchParams(window.location.search);
  const currentId = params.get('lesson') || 'html-01';

  renderSidebarModule(sidebarContainer, moduleLessons, { focusLessonId: currentId });

  setTimeout(() => {
    const items = sidebarContainer.querySelectorAll('.sidebar-lesson-item');
    items.forEach((item) => {
      if (item.dataset.id === currentId) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }, 100);
}

function renderLesson(lesson) {
  document.title = `${lesson.title} | Skill-Orbit`;

  const titleEl  = document.getElementById('lessonTitle');
  const badgeEl  = document.getElementById('lessonModuleBadge');
  const bodyEl   = document.getElementById('theoryBody');
  const exampleEl = document.getElementById('theoryCodeExample');
  const interactiveContainer = document.getElementById('interactiveLessonContainer');

  if (titleEl)  titleEl.textContent  = lesson.title;
  if (badgeEl)  badgeEl.textContent  = lesson.module.toUpperCase();
  if (typeof updateLiveXPDisplay === 'function') updateLiveXPDisplay();

  // Handle Interactive vs Static Theory
  if (lesson.interactive_steps && lesson.interactive_steps.length > 0) {
    if (bodyEl) bodyEl.style.display = 'none';
    if (exampleEl) exampleEl.style.display = 'none';
    if (interactiveContainer) interactiveContainer.style.display = 'block';
    
    if (typeof initInteractiveLesson === 'function') {
      initInteractiveLesson(lesson);
    }
  } else {
    if (interactiveContainer) interactiveContainer.style.display = 'none';
    if (bodyEl) {
      bodyEl.style.display = 'block';
      bodyEl.innerHTML = lesson.theory || '';
      wrapCodeSnippets(bodyEl, lesson);
    }
    
    if (exampleEl && lesson.codeExample) {
      exampleEl.style.display = 'block';
      exampleEl.innerHTML = `
        <div class="code-window-lite">
          <div class="code-window-header">
            <div class="window-dots">
              <span class="dot-red"></span>
              <span class="dot-yellow"></span>
              <span class="dot-green"></span>
            </div>
            <div class="window-label">example.html</div>
          </div>
          <div class="code-window-body">
            <button class="btn-snippet-try" onclick="trySnippet('${escapeJs(lesson.codeExample)}')">Try it <i class="fa-solid fa-play"></i></button>
            <pre><code class="language-html">${escapeHtml(lesson.codeExample)}</code></pre>
          </div>
        </div>
      `;
      if (window.hljs) hljs.highlightAll();
    } else if (exampleEl) {
      exampleEl.style.display = 'none';
    }
  }

  // Challenge
  const challengeText = document.getElementById('challengeText');
  const hintText      = document.getElementById('hintText');
  if (challengeText && lesson.challenge) {
    challengeText.textContent = lesson.challenge.instruction;
  }
  if (hintText && lesson.challenge) {
    hintText.textContent = lesson.challenge.hint || 'No hint available.';
  }

  // Hook for custom interactive lesson logic
  if (typeof lesson.onRender === 'function') {
    setTimeout(() => lesson.onRender(), 50);
  }
}

function renderLessonNav(currentId) {
  const dotsContainer = document.getElementById('lessonDots');
  if (!dotsContainer) return;

  const module = currentId.split('-')[0];
  const moduleLessons = CURRICULUM.filter(l => l.module === module);
  const progress = loadProgress();

  dotsContainer.innerHTML = '';
  moduleLessons.forEach(l => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    if (l.id === currentId) dot.classList.add('active');
    else if (progress.completedLessons.includes(l.id)) dot.classList.add('completed');
    dotsContainer.appendChild(dot);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeJs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

/**
 * Wraps theory pre blocks in a VS Code style window
 */
function wrapCodeSnippets(container, lesson) {
  const preBlocks = container.querySelectorAll('pre');
  preBlocks.forEach((pre, i) => {
    const code = pre.textContent;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-window-lite animate-fadeInUp';
    wrapper.style.animationDelay = `${(i + 1) * 0.1}s`;
    
    wrapper.innerHTML = `
      <div class="code-window-header">
        <div class="window-dots">
          <span class="dot-red"></span>
          <span class="dot-yellow"></span>
          <span class="dot-green"></span>
        </div>
        <div class="window-label">snippet.html</div>
      </div>
      <div class="code-window-body">
        <button class="btn-snippet-try">Try it <i class="fa-solid fa-play"></i></button>
      </div>
    `;
    
    const body = wrapper.querySelector('.code-window-body');
    body.appendChild(pre.cloneNode(true));
    
    // Replace original
    pre.parentNode.replaceChild(wrapper, pre);

    // Add listener to button
    wrapper.querySelector('.btn-snippet-try').addEventListener('click', () => {
      trySnippet(code);
    });
  });
  
  if (window.hljs) hljs.highlightAll();
}

window.trySnippet = function(code) {
  if (typeof initEditorWithLesson === 'function' && window.monacoHtmlEditor) {
    window.monacoHtmlEditor.setValue(code);
    
    // Update Editor UI for Sandbox Mode
    const challengeText = document.getElementById('challengeText');
    const checkBtn = document.getElementById('checkBtn');
    
    if (challengeText) {
      challengeText.classList.add('sandbox-mode');
      challengeText.innerHTML = '<i class="fa-solid fa-flask"></i> Snippet Sandbox';
    }
    
    if (checkBtn) {
      checkBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Reset to Challenge';
      checkBtn.classList.add('btn-outline');
      checkBtn.classList.remove('btn-success');
      // Store original listener or just use a flag
      checkBtn.dataset.mode = 'sandbox';
    }

    const overlay = document.getElementById('editorOverlay');
    if (overlay) overlay.classList.add('active');
    if (typeof updatePreview === 'function') updatePreview();
  } else {
    // Fallback if editor not ready (e.g. Monaco still loading)
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || 'html-01';
    localStorage.setItem('skill-orbit-trial-code', code);
    window.location.href = `lesson.html?lesson=${lessonId}&try=true`;
  }
};
