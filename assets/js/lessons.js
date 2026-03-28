// =============================================
// SKILL-ORBIT — lessons.js
// Loads curriculum JSON, renders lesson cards & sidebar
// =============================================

let CURRICULUM = [];

/**
 * Loads curriculum.json and renders the dashboard/sidebar.
 */
async function loadDashboard() {
  try {
    const res = await fetch('data/curriculum.json');
    CURRICULUM = await res.json();
    renderDashboard();
    renderSidebar();
    updateProgressBars();
  } catch (err) {
    console.error('Failed to load curriculum:', err);
  }
}

// ── Dashboard Lesson Grid ─────────────────────────
function renderDashboard() {
  const htmlGrid = document.getElementById('html-lessons-grid');
  const cssGrid  = document.getElementById('css-lessons-grid');
  if (!htmlGrid || !cssGrid) return;

  const htmlLessons = CURRICULUM.filter(l => l.module === 'html');
  const cssLessons  = CURRICULUM.filter(l => l.module === 'css');

  htmlGrid.innerHTML = '';
  cssGrid.innerHTML  = '';
  htmlGrid.classList.add('stagger-children');
  cssGrid.classList.add('stagger-children');

  htmlLessons.forEach((lesson, i) => htmlGrid.appendChild(createLessonCard(lesson, i)));
  cssLessons.forEach((lesson, i) => cssGrid.appendChild(createLessonCard(lesson, i)));
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

  htmlLessons.forEach(l => htmlSidebar.appendChild(createSidebarItem(l)));
  cssLessons.forEach(l => cssSidebar.appendChild(createSidebarItem(l)));

  // Update XP and streak
  const progress = loadProgress();
  const xpEl = document.getElementById('totalXP');
  const streakEl = document.getElementById('streakCount');
  if (xpEl) xpEl.textContent = progress.xp;
  if (streakEl) streakEl.textContent = progress.streak || 0;
}

function createSidebarItem(lesson) {
  const progress  = loadProgress();
  const completed = progress.completedLessons.includes(lesson.id);

  const item = document.createElement('div');
  item.className = `sidebar-lesson-item ${completed ? 'completed' : ''}`;
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

// ── Lesson Page Initialization ────────────────────
async function initLessonPage() {
  const params   = new URLSearchParams(window.location.search);
  const lessonId = params.get('lesson') || 'html-01';

  try {
    const res  = await fetch(`data/lessons/${lessonId.split('-')[0]}/${lessonId}.json`);
    const data = await res.json();
    renderLesson(data);
    initEditorWithLesson(data);
    initQuiz(data.quiz || []);
    renderLessonNav(lessonId);
  } catch (err) {
    console.error('Failed to load lesson:', err);
    document.getElementById('theoryBody').innerHTML =
      '<p>Lesson not found. Please return to the dashboard.</p>';
  }
}

function renderLesson(lesson) {
  document.title = `${lesson.title} | Skill-Orbit`;

  const titleEl  = document.getElementById('lessonTitle');
  const badgeEl  = document.getElementById('lessonModuleBadge');
  const bodyEl   = document.getElementById('theoryBody');
  const xpEl     = document.getElementById('lessonXP');
  const exampleEl = document.getElementById('theoryCodeExample');

  if (titleEl)  titleEl.textContent  = lesson.title;
  if (badgeEl)  badgeEl.textContent  = lesson.module.toUpperCase();
  if (xpEl)     xpEl.textContent     = lesson.xp;
  if (bodyEl)   bodyEl.innerHTML     = lesson.theory;
  if (exampleEl && lesson.codeExample) {
    exampleEl.innerHTML = `<pre><code class="language-html">${escapeHtml(lesson.codeExample)}</code></pre>`;
    if (window.hljs) hljs.highlightAll();
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
}

function renderLessonNav(currentId) {
  const prevBtn = document.getElementById('prevLessonBtn');
  const nextBtn = document.getElementById('nextLessonBtn');
  // Navigation handled by editor.js
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
