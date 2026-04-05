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
    // renderDashboard(); // Obsolete, replaced by switchCourse
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

function renderModuleLessonGroups(container, moduleLessons, track) {
  container.innerHTML = '';
  container.className = 'progression-map animate-fadeInUp';

  // Create SVG layer for connectors
  const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgLayer.setAttribute('class', 'map-svg-layer');
  svgLayer.style.width = '100%';
  svgLayer.style.height = '100%';
  container.appendChild(svgLayer);

  const progress = typeof loadProgress === 'function' ? loadProgress() : { completedLessons: [] };
  
  // Find the first uncompleted lesson to mark as "current"
  let currentLessonId = null;
  for (const l of moduleLessons) {
    if (!progress.completedLessons.includes(l.id)) {
      currentLessonId = l.id;
      break;
    }
  }

  // Ensure tooltips stay active on hover
  const tooltip = document.getElementById('mapNodeTooltip');
  if (tooltip) {
    tooltip.addEventListener('mouseenter', () => clearTimeout(tooltipHideTimeout));
    tooltip.addEventListener('mouseleave', hideMapTooltip);
  }

  // Draw nodes
  let globalIndex = 0;
  const titles = orderedSectionTitles(moduleLessons);
  
  titles.forEach((sectionTitle) => {
    const sectionLessons = moduleLessons.filter(l => (l.section || 'General') === sectionTitle);
    
    const marker = document.createElement('div');
    marker.className = 'map-section-marker';
    marker.textContent = sectionTitle;
    container.appendChild(marker);
    
    sectionLessons.forEach((lesson, i) => {
      globalIndex++;
      const isCompleted = progress.completedLessons.includes(lesson.id);
      const isCurrent = lesson.id === currentLessonId;
      const isLocked = !isCompleted && !isCurrent;
      
      const wrap = document.createElement('div');
      wrap.className = 'map-node-wrapper';
      
      const node = document.createElement('button');
      node.className = `map-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`;
      // Add milestone crown to the last lesson of a section
      if (i === sectionLessons.length - 1 && sectionLessons.length > 1) {
         node.classList.add('milestone');
      }
      
      node.setAttribute('aria-label', `${lesson.title} - ${isCompleted ? 'Completed' : (isCurrent ? 'Current' : 'Locked')}`);
      node.innerHTML = isCompleted ? '<i class="fa-solid fa-check"></i>' 
                     : (isLocked ? '<i class="fa-solid fa-lock"></i>' : '<i class="fa-solid fa-star"></i>');
                     
      node.addEventListener('mouseenter', () => showMapTooltip(node, lesson, globalIndex, isCompleted, isCurrent, isLocked, track));
      node.addEventListener('mouseleave', hideMapTooltip);
      node.addEventListener('focus', () => showMapTooltip(node, lesson, globalIndex, isCompleted, isCurrent, isLocked, track));
      node.addEventListener('blur', hideMapTooltip);
      
      node.addEventListener('click', () => {
         if (!isLocked || isCurrent) window.location.href = `lesson.html?lesson=${lesson.id}`;
      });
      
      wrap.appendChild(node);
      container.appendChild(wrap);
    });
  });
  
  // Draw SVG conectors
  setTimeout(() => drawMapConnectors(container, svgLayer, track), 100);
}

function drawMapConnectors(container, svgLayer, track) {
  svgLayer.innerHTML = '';
  const nodes = container.querySelectorAll('.map-node');
  if (nodes.length < 2) return;
  
  const containerRect = container.getBoundingClientRect();
  let pathD = '';
  
  for(let i=0; i<nodes.length-1; i++) {
    const n1 = nodes[i];
    const n2 = nodes[i+1];
    const rect1 = n1.getBoundingClientRect();
    const rect2 = n2.getBoundingClientRect();
    
    // Centers relative to SVG area
    const x1 = rect1.left + rect1.width/2 - containerRect.left;
    const y1 = rect1.top + rect1.height/2 - containerRect.top;
    const x2 = rect2.left + rect2.width/2 - containerRect.left;
    const y2 = rect2.top + rect2.height/2 - containerRect.top;
    
    if (i === 0) pathD += `M ${x1} ${y1} `;
    
    const ctrlY = y1 + (y2 - y1) / 2;
    pathD += `C ${x1} ${ctrlY}, ${x2} ${ctrlY}, ${x2} ${y2} `;
  }
  
  const bgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  bgPath.setAttribute('d', pathD);
  bgPath.setAttribute('fill', 'none');
  bgPath.setAttribute('stroke', 'rgba(255,255,255,0.06)');
  bgPath.setAttribute('stroke-width', '16');
  bgPath.setAttribute('stroke-linecap', 'round');
  svgLayer.appendChild(bgPath);
  
  // Progress path
  const activeNodes = container.querySelectorAll('.map-node.completed, .map-node.current');
  if (activeNodes.length > 1) {
     let activePathD = '';
     for(let i=0; i<activeNodes.length-1; i++) {
        const n1 = activeNodes[i];
        const n2 = activeNodes[i+1];
        const rect1 = n1.getBoundingClientRect();
        const rect2 = n2.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width/2 - containerRect.left;
        const y1 = rect1.top + rect1.height/2 - containerRect.top;
        const x2 = rect2.left + rect2.width/2 - containerRect.left;
        const y2 = rect2.top + rect2.height/2 - containerRect.top;
        
        if (i === 0) activePathD += `M ${x1} ${y1} `;
        
        const ctrlY = y1 + (y2 - y1) / 2;
        activePathD += `C ${x1} ${ctrlY}, ${x2} ${ctrlY}, ${x2} ${y2} `;
     }
     if (activePathD) {
        const strokeColor = track === 'html' ? '#f97316' : (track === 'css' ? '#3b82f6' : '#7c3aed');
        const activePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        activePath.setAttribute('d', activePathD);
        activePath.setAttribute('fill', 'none');
        activePath.setAttribute('stroke', strokeColor);
        activePath.setAttribute('stroke-width', '8');
        activePath.setAttribute('stroke-linecap', 'round');
        svgLayer.appendChild(activePath);
     }
  }
}

let tooltipHideTimeout;

function showMapTooltip(nodeEl, lessonData, index, isCompleted, isCurrent, isLocked) {
  clearTimeout(tooltipHideTimeout);
  const tooltip = document.getElementById('mapNodeTooltip');
  if (!tooltip) return;
  
  document.getElementById('ttipLessonNum').textContent = `Lesson ${index}`;
  document.getElementById('ttipLessonXp').innerHTML = `<i class="fa-solid fa-bolt"></i> ${lessonData.xp || 50} XP`;
  document.getElementById('ttipLessonTitle').textContent = lessonData.title;
  
  const desc = isCompleted ? 'You mastered this topic. Revisit anytime.' : (lessonData.subtitle || 'Learn the core concepts to unlock the next challenge.');
  document.getElementById('ttipLessonDesc').textContent = desc;
  
  const btn = document.getElementById('ttipActionBtn');
  if (isCompleted) {
    btn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Review';
    btn.className = 'btn-tooltip-action';
  } else if (isCurrent) {
    btn.innerHTML = 'Start <i class="fa-solid fa-arrow-right"></i>';
    btn.className = 'btn-tooltip-action';
  } else {
    btn.innerHTML = '<i class="fa-solid fa-lock"></i> Locked';
    btn.className = 'btn-tooltip-action locked';
  }
  
  btn.onclick = () => {
    if (!isLocked || isCurrent) window.location.href = `lesson.html?lesson=${lessonData.id}`;
  };
  
  const rect = nodeEl.getBoundingClientRect();
  const containerRect = document.getElementById('active-lessons-grid').getBoundingClientRect();
  
  // Position tooltip relative to document
  const top = rect.top + window.scrollY - 160; 
  const left = rect.left + window.scrollX + (rect.width / 2);
  
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  tooltip.classList.add('visible');
}

function hideMapTooltip() {
  tooltipHideTimeout = setTimeout(() => {
    const tooltip = document.getElementById('mapNodeTooltip');
    if (tooltip) tooltip.classList.remove('visible');
  }, 200);
}

// Redraw SVG on resize
window.addEventListener('resize', () => {
  const container = document.getElementById('active-lessons-grid');
  if (container) {
     const svg = container.querySelector('.map-svg-layer');
     // Re-fetch track from the active HTML class or rely on courseSwitcher active state
     const activeCourseId = localStorage.getItem('skill-orbit-active-course') || 'html';
     if (svg) drawMapConnectors(container, svg, activeCourseId);
  }
});

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
