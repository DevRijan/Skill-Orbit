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
    CURRICULUM = window.SKILL_ORBIT_CURRICULUM || [];
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

  renderSidebarModule(htmlSidebar, htmlLessons);
  renderSidebarModule(cssSidebar, cssLessons);

  // Update XP and streak
  const progress = loadProgress();
  const xpEl = document.getElementById('totalXP');
  const streakEl = document.getElementById('streakCount');
  if (xpEl) xpEl.textContent = progress.xp;
  if (streakEl) streakEl.textContent = progress.streak || 0;

  // Update User Profile Name
  const profile = JSON.parse(localStorage.getItem('skill-orbit-profile') || '{"name":"Learner"}');
  const nameEls = document.querySelectorAll('.user-name');
  nameEls.forEach(el => el.textContent = profile.name);
}

function renderSidebarModule(container, lessons) {
  // Get unique sections
  const sections = [];
  lessons.forEach(l => {
    if (l.section && !sections.includes(l.section)) {
      sections.push(l.section);
    }
  });

  if (sections.length > 0) {
    sections.forEach(sectionTitle => {
      const sectionHeader = document.createElement('div');
      sectionHeader.className = 'sidebar-section-header';
      sectionHeader.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${sectionTitle}`;
      container.appendChild(sectionHeader);

      const sectionLessons = lessons.filter(l => l.section === sectionTitle);
      sectionLessons.forEach(l => {
        container.appendChild(createSidebarItem(l));
      });
    });
  } else {
    // Fallback for backwards compatibility
    lessons.forEach(l => container.appendChild(createSidebarItem(l)));
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

// ── Lesson Page Initialization ────────────────────
async function initLessonPage() {
  const params   = new URLSearchParams(window.location.search);
  const lessonId = params.get('lesson') || 'html-01';

  try {
    // 1. Ensure CURRICULUM is loaded
    if (!CURRICULUM || CURRICULUM.length === 0) {
      CURRICULUM = window.SKILL_ORBIT_CURRICULUM || [];
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
      initQuiz(lessonData.quiz || []);
      renderLessonNav(lessonId);
      renderLessonSidebar(lessonData.module);
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
      initQuiz(data.quiz || []);
      renderLessonNav(lessonId);
      renderLessonSidebar(data.module);
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
  renderSidebarModule(sidebarContainer, moduleLessons);

  // Mark current lesson as active
  const params = new URLSearchParams(window.location.search);
  const currentId = params.get('lesson') || 'html-01';
  
  // Give it a tiny delay to ensure items are rendered
  setTimeout(() => {
    const items = sidebarContainer.querySelectorAll('.sidebar-lesson-item');
    items.forEach(item => {
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
  const xpEl     = document.getElementById('lessonXP');
  const exampleEl = document.getElementById('theoryCodeExample');

  if (titleEl)  titleEl.textContent  = lesson.title;
  if (badgeEl)  badgeEl.textContent  = lesson.module.toUpperCase();
  if (xpEl)     xpEl.textContent     = lesson.xp;
  if (bodyEl)   bodyEl.innerHTML     = lesson.theory;
  
  // Enhance snippets
  wrapCodeSnippets(bodyEl, lesson);

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
