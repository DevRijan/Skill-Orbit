// =============================================
// SKILL-ORBIT — editor.js
// Live code editor with iframe preview
// =============================================

// ── State ────────────────────────────────────────
let currentLesson   = null;
let activeEditorTab = 'html'; // 'html' | 'css'

// ── Initialize Editor ─────────────────────────────
function initEditorWithLesson(lesson) {
  currentLesson = lesson;

  const htmlEditor   = document.getElementById('htmlEditor');
  const cssEditor    = document.getElementById('cssEditor');
  const preview      = document.getElementById('previewFrame');

  // Set starter code from lesson challenge
  if (lesson.challenge) {
    htmlEditor.value = lesson.challenge.startCode || '';
  }
  cssEditor.value = lesson.challenge?.startCSS || '/* Add your CSS here */\n';

  // Live preview on input
  htmlEditor.addEventListener('input', updatePreview);
  cssEditor.addEventListener('input',  updatePreview);

  // Tab switching
  document.getElementById('editorTabHTML').addEventListener('click', () => switchEditorTab('html'));
  document.getElementById('editorTabCSS').addEventListener('click',  () => switchEditorTab('css'));

  // Try it button — loads example code
  const tryItBtn = document.getElementById('tryItBtn');
  if (tryItBtn) {
    tryItBtn.addEventListener('click', () => {
      htmlEditor.value = lesson.codeExample || '';
      switchEditorTab('html');
      updatePreview();
    });
  }

  // Reset
  document.getElementById('resetBtn')?.addEventListener('click', () => {
    htmlEditor.value = lesson.challenge?.startCode || '';
    cssEditor.value  = lesson.challenge?.startCSS  || '/* Add your CSS here */\n';
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

  // Initial preview
  updatePreview();

  // Panel Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchPanelTab(btn.dataset.tab));
  });
}

// ── Update Preview ────────────────────────────────
function updatePreview() {
  const htmlVal = document.getElementById('htmlEditor')?.value || '';
  const cssVal  = document.getElementById('cssEditor')?.value  || '';
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
  const htmlEditor = document.getElementById('htmlEditor');
  const cssEditor  = document.getElementById('cssEditor');
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

// ── Panel Tab Switch ──────────────────────────────
function switchPanelTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  document.querySelector(`.tab-btn[data-tab="${tab}"]`)?.classList.add('active');
  document.getElementById(`${tab}Content`)?.classList.add('active');
}

// ── Challenge Checker ─────────────────────────────
function checkChallenge() {
  if (!currentLesson?.challenge) return;

  const htmlVal  = document.getElementById('htmlEditor')?.value?.trim() || '';
  const solution = currentLesson.challenge.solution || '';
  const result   = document.getElementById('challengeResult');
  if (!result) return;

  // Simple check: see if key solution elements appear in user code
  const solutionTags = solution.match(/<[^/][^>]*>/g) || [];
  const userCode     = htmlVal.toLowerCase();

  let correct = solutionTags.every(tag => userCode.includes(tag.toLowerCase()));

  result.style.display = 'block';
  if (correct) {
    result.className = 'challenge-result success';
    result.innerHTML = '✅ Correct! Great job! Complete the quiz to earn your XP.';
    switchPanelTab('quiz');
    const progress = markLessonComplete(currentLesson.id, currentLesson.xp);
    showXPToast(currentLesson.xp);
    renderGamification(progress);
  } else {
    result.className = 'challenge-result error';
    result.innerHTML = '❌ Not quite. Check the hint or review the theory.';
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
  // Example: html-01 → html-02
  const parts  = currentId.split('-');
  const module = parts[0];
  const num    = parseInt(parts[1], 10);

  document.getElementById('prevLessonBtn')?.addEventListener('click', () => {
    if (num > 1) {
      const prev = `${module}-${String(num - 1).padStart(2, '0')}`;
      window.location.href = `lesson.html?lesson=${prev}`;
    } else {
      window.location.href = 'dashboard.html';
    }
  });

  document.getElementById('nextLessonBtn')?.addEventListener('click', () => {
    const next = `${module}-${String(num + 1).padStart(2, '0')}`;
    window.location.href = `lesson.html?lesson=${next}`;
  });
}
