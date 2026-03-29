// =============================================
// SKILL-ORBIT — quiz.js  v2
// MCQ Quiz engine — 1 XP per correct answer,
// unrecoverable on wrong, per-question tracking
// =============================================

let currentQuiz   = [];
let currentQIndex = 0;
let quizAnswered  = false;
let quizLessonId  = null;    // set by initQuiz
let quizXPTotal   = 0;       // XP earned this session

const QUIZ_XP_LABEL = '+1 XP';

/**
 * Initialize quiz with questions array.
 * @param {Array} questions
 * @param {String} lessonId — needed for per-question XP tracking
 */
function initQuiz(questions, lessonId = null) {
  currentQuiz   = questions;
  currentQIndex = 0;
  quizAnswered  = false;
  quizLessonId  = lessonId;
  quizXPTotal   = 0;

  const section   = document.getElementById('quizSection');
  const container = document.getElementById('quizContainer');

  if (!questions || questions.length === 0) {
    if (container) container.innerHTML = '<p class="quiz-intro" style="padding:20px;">No quiz for this lesson yet.</p>';
    if (section) section.style.display = 'none';
    return;
  }

  if (section) section.style.display = 'block';

  // Check if quiz was already fully completed for this lesson
  if (lessonId) {
    const summary = (typeof getQuizXPSummary === 'function') ? getQuizXPSummary(lessonId) : null;
    if (summary && summary.answered >= questions.length) {
      // Show "already completed" summary instead of re-running
      renderQuizAlreadyDone(summary, questions.length);
      return;
    }
  }

  const startBtn = document.getElementById('startQuizBtn');
  if (startBtn) {
    const newBtn = startBtn.cloneNode(true);
    startBtn.parentNode.replaceChild(newBtn, startBtn);
    newBtn.innerHTML = '<i class="fa-solid fa-play"></i> Take Quiz &nbsp;<small style="opacity:0.7;font-weight:500;">(max 10 XP)</small>';
    newBtn.addEventListener('click', () => {
      renderQuestion(0);
      setTimeout(() => {
        const theoryContainer = document.querySelector('.lesson-theory-container');
        const sec = document.getElementById('quizSection');
        if (theoryContainer && sec) {
          theoryContainer.scrollTo({ top: sec.offsetTop - 20, behavior: 'smooth' });
        }
      }, 50);
    });
  }
}

// ── Already completed display ─────────────────────
function renderQuizAlreadyDone(summary, totalQ) {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="quiz-done-summary animate-fadeInUp" style="
      background:rgba(124,58,237,0.08);
      border:1px solid rgba(124,58,237,0.25);
      border-radius:16px;
      padding:28px 24px;
      margin:16px;
      text-align:center;">
      <div style="font-size:2.2rem;margin-bottom:10px;">✅</div>
      <h3 style="margin-bottom:4px;color:var(--text-primary);">Quiz Completed</h3>
      <p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:20px;">
        You answered this quiz before. XP cannot be re-earned.
      </p>
      <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;">
        <div style="text-align:center;">
          <div style="font-size:1.6rem;font-weight:900;color:#10b981;">${summary.correct}/${totalQ}</div>
          <div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Correct</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:1.6rem;font-weight:900;color:#fbbf24;">${summary.xpEarned} XP</div>
          <div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Earned</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:1.6rem;font-weight:900;color:#f87171;">${summary.wrong}</div>
          <div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Lost</div>
        </div>
      </div>
    </div>`;
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

  // Skip previously answered questions
  if (quizLessonId && typeof isQuizQuestionAnswered === 'function' && isQuizQuestionAnswered(quizLessonId, index)) {
    currentQIndex++;
    quizAnswered = false;
    renderQuestion(currentQIndex);
    return;
  }

  const progressPct = Math.round((index / currentQuiz.length) * 100);

  container.innerHTML = `
    <div class="quiz-question animate-fadeInUp" style="padding:0;">
      <!-- Progress bar -->
      <div style="height:3px;background:rgba(255,255,255,0.07);border-radius:3px;margin:16px 20px 0;">
        <div style="width:${progressPct}%;height:3px;background:linear-gradient(90deg,#7c3aed,#0ea5e9);border-radius:3px;transition:width 0.4s;"></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px 0;">
        <span style="font-size:0.78rem;color:var(--text-muted);">Question ${index + 1} of ${currentQuiz.length}</span>
        <span style="font-size:0.78rem;color:#fbbf24;font-weight:700;" id="quizXPCounter">Session XP: ${quizXPTotal}</span>
      </div>
      <h4 style="padding:14px 20px 10px;font-size:1rem;line-height:1.4;color:var(--text-primary);">${q.question}</h4>
      <div class="quiz-options" style="padding:0 20px;" id="quizOptions"></div>
      <div id="quizFeedback" style="padding:10px 20px 4px;min-height:32px;"></div>
    </div>
  `;

  const optionsEl = document.getElementById('quizOptions');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(i, q.correct, index, btn));
    optionsEl.appendChild(btn);
  });
}

// ── Handle answer ─────────────────────────────────
async function handleAnswer(selected, correctIndex, questionIndex, clickedBtn) {
  if (quizAnswered) return;
  quizAnswered = true;

  const allOptions = document.querySelectorAll('.quiz-option');
  allOptions.forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === correctIndex) opt.classList.add('correct');
    else if (i === selected) opt.classList.add('wrong');
  });

  const feedback = document.getElementById('quizFeedback');
  const isCorrect = selected === correctIndex;

  if (isCorrect) {
    // Award XP
    let xpAwarded = 0;
    if (quizLessonId && typeof awardQuizXP === 'function') {
      const result = await awardQuizXP(quizLessonId, questionIndex);
      xpAwarded = result.xpAwarded;
    } else {
      xpAwarded = 1; // fallback
    }
    quizXPTotal += xpAwarded;
    if (feedback) feedback.innerHTML = `
      <span style="color:var(--color-success);font-weight:700;display:flex;align-items:center;gap:8px;">
        ✅ Correct!
        <span style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);color:#10b981;
          border-radius:50px;padding:2px 10px;font-size:0.8rem;">${QUIZ_XP_LABEL} earned</span>
      </span>`;
    // Flash XP counter
    const counter = document.getElementById('quizXPCounter');
    if (counter) {
      counter.textContent = `Session XP: ${quizXPTotal}`;
      counter.style.transform = 'scale(1.3)';
      setTimeout(() => counter.style.transform = 'scale(1)', 300);
    }
    if (typeof updateLiveXPDisplay === 'function') updateLiveXPDisplay();
  } else {
    // Lock out XP for this question permanently
    if (quizLessonId && typeof recordQuizWrong === 'function') {
      await recordQuizWrong(quizLessonId, questionIndex);
    }
    if (feedback) feedback.innerHTML = `
      <div>
        <span style="color:var(--color-danger);font-weight:700;">❌ Wrong.</span>
        <span style="color:var(--text-muted);font-size:0.88rem;margin-left:6px;">Correct: <strong style="color:var(--text-primary);">${currentQuiz[questionIndex].options[correctIndex]}</strong></span>
        <div style="display:inline-flex;align-items:center;gap:6px;margin-left:10px;
          background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);
          border-radius:50px;padding:2px 10px;font-size:0.78rem;color:#f87171;">
          <i class="fa-solid fa-lock" style="font-size:0.65rem;"></i> 0 XP — lost forever
        </div>
      </div>`;
  }

  // Show XP toast for correct
  if (isCorrect && typeof showXPToast === 'function') {
    showXPToast(1);
  }

  // Next question button
  setTimeout(() => {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.style.cssText = 'margin:8px 20px 16px;width:calc(100% - 40px);';
    const isLast = currentQIndex + 1 >= currentQuiz.length;
    nextBtn.innerHTML = isLast
      ? 'Finish Quiz 🎉'
      : 'Next Question <i class="fa-solid fa-arrow-right"></i>';
    nextBtn.addEventListener('click', () => {
      currentQIndex++;
      quizAnswered = false;
      renderQuestion(currentQIndex);
    });
    document.getElementById('quizContainer')?.appendChild(nextBtn);
  }, 700);
}

// ── Quiz Complete Screen ───────────────────────────
function renderQuizComplete() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  const summary = (quizLessonId && typeof getQuizXPSummary === 'function')
    ? getQuizXPSummary(quizLessonId)
    : { correct: quizXPTotal, wrong: 0, xpEarned: quizXPTotal, answered: currentQuiz.length };

  const pct = currentQuiz.length > 0 ? Math.round((summary.correct / currentQuiz.length) * 100) : 0;
  const emoji = pct === 100 ? '🏆' : pct >= 70 ? '🎉' : pct >= 40 ? '📚' : '💪';

  container.innerHTML = `
    <div style="text-align:center;padding:32px 24px;" class="animate-fadeInUp">
      <div style="font-size:3rem;margin-bottom:12px;">${emoji}</div>
      <h3 style="margin-bottom:4px;color:var(--text-primary);">Quiz Complete!</h3>
      <p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:24px;">
        ${pct === 100 ? 'Perfect score! Maximum XP earned.' : 'XP from wrong answers cannot be recovered.'}
      </p>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;max-width:360px;margin-left:auto;margin-right:auto;">
        <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:14px;padding:14px 10px;">
          <div style="font-size:1.5rem;font-weight:900;color:#10b981;">${summary.correct}</div>
          <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;">Correct</div>
        </div>
        <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15);border-radius:14px;padding:14px 10px;">
          <div style="font-size:1.5rem;font-weight:900;color:#f87171;">${summary.wrong}</div>
          <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;">Wrong</div>
        </div>
        <div style="background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);border-radius:14px;padding:14px 10px;">
          <div style="font-size:1.5rem;font-weight:900;color:#fbbf24;">${summary.xpEarned}</div>
          <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;">XP Earned</div>
        </div>
      </div>

      <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:20px;">
        <i class="fa-solid fa-lock" style="font-size:0.75rem;"></i>
        ${summary.wrong > 0 ? `${summary.wrong} XP permanently lost from wrong answers.` : 'No XP lost!'}
      </p>

      <a href="dashboard.html" class="btn btn-primary">
        <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
      </a>
    </div>
  `;
}
