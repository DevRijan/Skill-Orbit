// =============================================
// SKILL-ORBIT — quiz.js
// MCQ Quiz engine
// =============================================

let currentQuiz    = [];
let currentQIndex  = 0;
let quizAnswered   = false;

/**
 * Initialize quiz with questions array.
 * @param {Array} questions
 */
function initQuiz(questions) {
  currentQuiz   = questions;
  currentQIndex = 0;
  quizAnswered  = false;

  if (!questions || questions.length === 0) {
    const container = document.getElementById('quizContainer');
    if (container) container.innerHTML = '<p class="quiz-intro">No quiz for this lesson yet.</p>';
    return;
  }

  renderQuestion(0);
}

// ── Render a question ─────────────────────────────
function renderQuestion(index) {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  const q = currentQuiz[index];
  if (!q) {
    renderQuizComplete();
    return;
  }

  container.innerHTML = `
    <div class="quiz-question animate-fadeInUp">
      <div style="font-size:0.8rem;color:var(--text-muted);margin:var(--spacing-lg) var(--spacing-lg) 0;">
        Question ${index + 1} of ${currentQuiz.length}
      </div>
      <h4 style="padding: var(--spacing-md) var(--spacing-lg);">${q.question}</h4>
      <div class="quiz-options" style="padding: 0 var(--spacing-lg);" id="quizOptions"></div>
      <div id="quizFeedback" style="padding: var(--spacing-md) var(--spacing-lg); min-height: 40px;"></div>
    </div>
  `;

  const optionsEl = document.getElementById('quizOptions');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(i, q.correct, btn));
    optionsEl.appendChild(btn);
  });
}

// ── Handle answer ─────────────────────────────────
function handleAnswer(selected, correctIndex, clickedBtn) {
  if (quizAnswered) return;
  quizAnswered = true;

  const allOptions = document.querySelectorAll('.quiz-option');
  allOptions.forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === correctIndex) opt.classList.add('correct');
    else if (i === selected) opt.classList.add('wrong');
  });

  const feedback = document.getElementById('quizFeedback');
  if (selected === correctIndex) {
    if (feedback) feedback.innerHTML = `<span style="color:var(--color-success);font-weight:600;">✅ Correct!</span>`;
  } else {
    if (feedback) feedback.innerHTML = `<span style="color:var(--color-danger);font-weight:600;">❌ Wrong. The answer is: ${currentQuiz[currentQIndex].options[correctIndex]}</span>`;
  }

  // Next question button
  setTimeout(() => {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.style.cssText = 'margin: 0 var(--spacing-lg) var(--spacing-lg); width: calc(100% - 48px);';
    nextBtn.textContent = currentQIndex + 1 < currentQuiz.length ? 'Next Question →' : 'Finish Quiz 🎉';
    nextBtn.addEventListener('click', () => {
      currentQIndex++;
      quizAnswered = false;
      renderQuestion(currentQIndex);
    });
    document.getElementById('quizContainer')?.appendChild(nextBtn);
  }, 600);
}

// ── Quiz Complete Screen ───────────────────────────
function renderQuizComplete() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align:center; padding: var(--spacing-2xl) var(--spacing-lg);" class="animate-fadeInUp">
      <div style="font-size: 3rem; margin-bottom: var(--spacing-lg);">🎉</div>
      <h3 style="margin-bottom: var(--spacing-sm);">Quiz Complete!</h3>
      <p style="color: var(--text-muted); margin-bottom: var(--spacing-xl);">Great job finishing this lesson!</p>
      <a href="dashboard.html" class="btn btn-primary">
        <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
      </a>
    </div>
  `;
}
