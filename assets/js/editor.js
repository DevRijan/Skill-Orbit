// =============================================
// SKILL-ORBIT — editor.js
// Live code editor with iframe preview
// =============================================

// ── State ────────────────────────────────────────
let currentLesson    = null;
let activeEditorTab  = 'html'; // 'html' | 'css'
window.monacoHtmlEditor = null; // Changed to window for global access
window.monacoCssEditor  = null;
let currentFontSize  = 14;

// Configure Monaco
if (window.require) {
  require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.46.0/min/vs' }});
}

// ── Initialize Editor ─────────────────────────────
function initEditorWithLesson(lesson) {
  currentLesson = lesson;

  if (window.require) {
    require(['vs/editor/editor.main'], function () {
      setupMonaco(lesson);
    });
  } else {
    console.error("Monaco loader not found.");
  }
}

function setupMonaco(lesson) {
  const htmlContainer = document.getElementById('htmlEditorContainer');
  const cssContainer  = document.getElementById('cssEditorContainer');

  const isLight = document.body.classList.contains('light-mode');
  const themeMode = isLight ? 'vs' : 'vs-dark';

  window.monacoHtmlEditor = monaco.editor.create(htmlContainer, {
    value: lesson.challenge?.startCode || '',
    language: 'html',
    theme: themeMode,
    minimap: { enabled: false },
    fontSize: 14,
    automaticLayout: true,
    padding: { top: 16 }
  });

  window.monacoCssEditor = monaco.editor.create(cssContainer, {
    value: lesson.challenge?.startCSS || '/* Add your CSS here */\n',
    language: 'css',
    theme: themeMode,
    minimap: { enabled: false },
    fontSize: 14,
    automaticLayout: true,
    padding: { top: 16 }
  });

  // Live preview on input
  monacoHtmlEditor.onDidChangeModelContent(updatePreview);
  monacoCssEditor.onDidChangeModelContent(updatePreview);

  // Tab switching (HTML/CSS)
  document.getElementById('editorTabHTML').addEventListener('click', () => switchEditorTab('html'));
  document.getElementById('editorTabCSS').addEventListener('click',  () => switchEditorTab('css'));

  // Reset
  document.getElementById('resetBtn')?.addEventListener('click', () => {
    monacoHtmlEditor.setValue(lesson.challenge?.startCode || '');
    monacoCssEditor.setValue(lesson.challenge?.startCSS || '/* Add your CSS here */\n');
    updatePreview();
  });

  // Manual run
  document.getElementById('runBtn')?.addEventListener('click', updatePreview);
  document.getElementById('refreshPreview')?.addEventListener('click', updatePreview);

  // Navigation
  setupLessonNavigation(lesson.id);

  // Challenge check
  document.getElementById('checkBtn')?.addEventListener('click', checkChallenge);
  document.getElementById('hintBtn')?.addEventListener('click', toggleHint);

  // Font Size Controls
  document.getElementById('fontIncreaseBtn')?.addEventListener('click', () => changeFontSize(1));
  document.getElementById('fontDecreaseBtn')?.addEventListener('click', () => changeFontSize(-1));

  // Resizer Logic
  setupResizer();

  // Check for Snippet Recovery (Fallback Redirect)
  checkSnippetRecovery();

  // Overlay Toggles
  const overlay = document.getElementById('editorOverlay');
  
  // Draggable FAB Logic
  const fab = document.getElementById('openEditorBtn');
  if (fab) {
    let isDraggingFab = false;
    let hasMoved = false;
    let offsetX, offsetY;
    // We add a tiny threshold to detect actual intent to drag vs a subtle mouse slip clicking
    let startX, startY;

    const dragStart = (e) => {
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let clientY = e.touches ? e.touches[0].clientY : e.clientY;

      isDraggingFab = true;
      hasMoved = false;
      startX = clientX;
      startY = clientY;

      const rect = fab.getBoundingClientRect();
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;

      fab.style.transition = 'none'; // Snap instantly to cursor during drag
    };

    const dragMove = (e) => {
      if (!isDraggingFab) return;

      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let clientY = e.touches ? e.touches[0].clientY : e.clientY;

      // Threshold check for drag vs slip
      if (!hasMoved && Math.hypot(clientX - startX, clientY - startY) > 5) {
        hasMoved = true;
      }

      if (hasMoved) {
        e.preventDefault(); // Stop scrolling strictly if they are dragging
        let newX = clientX - offsetX;
        let newY = clientY - offsetY;

        const maxX = window.innerWidth - fab.offsetWidth - 10;
        const maxY = window.innerHeight - fab.offsetHeight - 10;
        
        if (newX < 10) newX = 10;
        if (newX > maxX) newX = maxX;
        if (newY < 10) newY = 10;
        if (newY > maxY) newY = maxY;

        fab.style.bottom = 'auto';
        fab.style.right = 'auto';
        fab.style.left = `${newX}px`;
        fab.style.top = `${newY}px`;
      }
    };

    const dragEnd = () => {
      if (!isDraggingFab) return;
      isDraggingFab = false;
      fab.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      if (!hasMoved) {
        overlay.classList.add('active');
      }
    };

    fab.addEventListener('mousedown', dragStart);
    fab.addEventListener('touchstart', dragStart, { passive: false });

    // Document-level binds catch fast mouse moves outside the button bounds safely
    document.addEventListener('mousemove', dragMove, { passive: false });
    document.addEventListener('touchmove', dragMove, { passive: false });
    
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
  }

  document.getElementById('closeEditorBtn')?.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  // Try it button from theory page
  const tryItBtn = document.getElementById('tryItBtn');
  if (tryItBtn) {
    tryItBtn.addEventListener('click', () => {
      monacoHtmlEditor.setValue(lesson.codeExample || '');
      switchEditorTab('html');
      updatePreview();
      overlay.classList.add('active'); // Open overlay automatically
    });
  }

  // Initial preview
  updatePreview();
}

window.updateEditorTheme = function(isLight) {
  if (monacoHtmlEditor && monacoCssEditor) {
    const themeMode = isLight ? 'vs' : 'vs-dark';
    monaco.editor.setTheme(themeMode);
  }
};

// ── Font Size Control ─────────────────────────────
function changeFontSize(delta) {
  currentFontSize += delta;
  if (currentFontSize < 10) currentFontSize = 10;
  if (currentFontSize > 32) currentFontSize = 32;

  if (monacoHtmlEditor) monacoHtmlEditor.updateOptions({ fontSize: currentFontSize });
  if (monacoCssEditor) monacoCssEditor.updateOptions({ fontSize: currentFontSize });
}

// ── Resizer Logic ─────────────────────────────────
function setupResizer() {
  const resizer = document.getElementById('editorResizer');
  const previewPanel = document.getElementById('previewPanel');
  const editorPanelFull = document.querySelector('.lesson-editor-panel-full');
  
  if (!resizer || !previewPanel || !editorPanelFull) return;

  let isDragging = false;

  resizer.addEventListener('mousedown', (e) => {
    isDragging = true;
    resizer.classList.add('dragging');
    document.body.style.cursor = 'ns-resize';
    e.preventDefault(); // Prevent text selection
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const containerRect = editorPanelFull.getBoundingClientRect();
    let newPreviewHeight = containerRect.bottom - e.clientY;
    
    // Constraints
    const minPreviewHeight = 100;
    const maxPreviewHeight = containerRect.height - 150; // leave room for editor

    if (newPreviewHeight < minPreviewHeight) newPreviewHeight = minPreviewHeight;
    if (newPreviewHeight > maxPreviewHeight) newPreviewHeight = maxPreviewHeight;

    previewPanel.style.height = `${newPreviewHeight}px`;

    // Trigger Monaco layout update
    if (monacoHtmlEditor) monacoHtmlEditor.layout();
    if (monacoCssEditor)  monacoCssEditor.layout();
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      resizer.classList.remove('dragging');
      document.body.style.cursor = '';
    }
  });
}

// ── Update Preview ────────────────────────────────
function updatePreview() {
  const htmlVal = monacoHtmlEditor ? monacoHtmlEditor.getValue() : '';
  const cssVal  = monacoCssEditor ? monacoCssEditor.getValue() : '';
  const frame   = document.getElementById('previewFrame');
  if (!frame) return;

  const doc = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: sans-serif; padding: 16px; margin: 0; }
  ${cssVal}
</style>
</head>
<body>
${htmlVal}
</body>
</html>`;

  frame.srcdoc = doc;
}

// ── Editor Tab Switch ─────────────────────────────
function switchEditorTab(tab) {
  activeEditorTab = tab;
  const htmlEditor = document.getElementById('htmlEditorContainer');
  const cssEditor  = document.getElementById('cssEditorContainer');
  const htmlTab    = document.getElementById('editorTabHTML');
  const cssTab     = document.getElementById('editorTabCSS');

  if (tab === 'html') {
    htmlEditor.classList.remove('hidden');
    cssEditor.classList.add('hidden');
    htmlTab.classList.add('active');
    cssTab.classList.remove('active');
  } else {
    cssEditor.classList.remove('hidden');
    htmlEditor.classList.add('hidden');
    cssTab.classList.add('active');
    htmlTab.classList.remove('active');
  }
}

// ── Challenge Checker ─────────────────────────────
function checkChallenge() {
  const checkBtn = document.getElementById('checkBtn');
  
  // Handle Sandbox Reset
  if (checkBtn && checkBtn.dataset.mode === 'sandbox') {
    resetToChallenge();
    return;
  }

  if (!currentLesson || !currentLesson.challenge) return;

  const htmlVal  = monacoHtmlEditor ? monacoHtmlEditor.getValue().trim() : '';
  const solution = currentLesson.challenge.solution || '';
  const result   = document.getElementById('challengeResult');
  if (!result) return;

  // Simple check: see if key solution elements appear in user code
  const solutionTags = solution.match(/<[^/][^>]*>/g) || [];
  const userCode     = htmlVal.toLowerCase();

  let correct = true;
  if (solutionTags.length > 0) {
    correct = solutionTags.every(tag => userCode.includes(tag.toLowerCase()));
  } else {
    // Fallback if no tags (e.g. just raw text matching)
    correct = userCode.includes(solution.toLowerCase());
  }

  result.style.display = 'flex';
  if (correct) {
    result.className = 'challenge-result-box success animate-fadeInUp';
    result.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Correct! You have successfully completed the challenge.</span>';
    
    const progress = markLessonComplete(currentLesson.id, currentLesson.xp);
    showXPToast(currentLesson.xp);
    renderGamification(progress);
  } else {
    result.className = 'challenge-result-box error animate-fadeInUp';
    result.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> <span>Not quite. Check the hint or review the theory.</span>';
  }
}

// ── Hint Toggle ───────────────────────────────────
function toggleHint() {
  const hint = document.getElementById('challengeHint');
  if (hint) {
    hint.style.display = hint.style.display === 'none' ? 'flex' : 'none';
  }
}

// ── Lesson Navigation ─────────────────────────────
function setupLessonNavigation(currentId) {
  const moduleId = currentId.split('-')[0];
  const moduleLessons = CURRICULUM.filter(l => l.module === moduleId);
  const currentIndex = moduleLessons.findIndex(l => l.id === currentId);

  document.getElementById('prevLessonBtn')?.addEventListener('click', () => {
    if (currentIndex > 0) {
      const prev = moduleLessons[currentIndex - 1].id;
      window.location.href = `lesson.html?lesson=${prev}`;
    } else {
      window.location.href = 'dashboard.html';
    }
  });

  const nextBtn = document.getElementById('nextLessonBtn');
  if (nextBtn) {
    if (currentIndex < moduleLessons.length - 1) {
      nextBtn.addEventListener('click', () => {
        const next = moduleLessons[currentIndex + 1].id;
        window.location.href = `lesson.html?lesson=${next}`;
      });
    } else {
      nextBtn.innerHTML = 'Finish Module <i class="fa-solid fa-flag-checkered"></i>';
      nextBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
      });
    }
  }
}
function resetToChallenge() {
  if (!currentLesson) return;
  
  const challengeText = document.getElementById('challengeText');
  const checkBtn = document.getElementById('checkBtn');
  
  if (challengeText) {
    challengeText.classList.remove('sandbox-mode');
    challengeText.innerHTML = `<i class="fa-solid fa-dumbbell"></i> ${currentLesson.challenge?.instruction || 'Complete the Challenge'}`;
  }
  
  if (checkBtn) {
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span class="hide-mobile">Check Code</span>';
    checkBtn.classList.remove('btn-outline');
    checkBtn.classList.add('btn-success');
    checkBtn.dataset.mode = 'normal';
  }
  
  if (window.monacoHtmlEditor) window.monacoHtmlEditor.setValue(currentLesson.challenge?.startCode || '');
  if (window.monacoCssEditor) window.monacoCssEditor.setValue(currentLesson.challenge?.startCSS || '');
  updatePreview();
}

function checkSnippetRecovery() {
  const trialCode = localStorage.getItem('skill-orbit-trial-code');
  if (trialCode) {
    localStorage.removeItem('skill-orbit-trial-code');
    
    // Slight delay to ensure editor is fully ready
    setTimeout(() => {
      if (window.monacoHtmlEditor) {
        window.trySnippet(trialCode); // Re-trigger the logic via the global function
      }
    }, 100);
  }
}
