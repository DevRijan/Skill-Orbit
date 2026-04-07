/* =============================================
 * SKILL-ORBIT — interactive.js
 * Upgraded engine for gamified, DOM-first lessons
 * ============================================= */

let currentInteractiveStep = 0;
let interactiveSteps = [];
let interactiveLessonData = null;
let interactiveLessonMeta = null;
let interactiveSessionXP = 0;
let interactiveStreak = 0;
let interactiveWrongAttempts = 0;

const LESSON_UPGRADE_FLAG = '__upgradedInteractiveV2';

function upgradeCurriculumLessons(curriculum = []) {
  if (!Array.isArray(curriculum)) return [];
  return curriculum.map((lesson, lessonIndex) => upgradeLessonStructure(lesson, lessonIndex));
}

function upgradeLessonStructure(lesson, lessonIndex = 0) {
  if (!lesson || typeof lesson !== 'object') return lesson;
  if (lesson[LESSON_UPGRADE_FLAG]) return lesson;

  const sourceSteps = Array.isArray(lesson.interactive_steps) && lesson.interactive_steps.length > 0
    ? lesson.interactive_steps
    : convertLegacySteps(lesson.steps || [], lesson);

  const analysis = analyzeLesson(lesson, sourceSteps, lessonIndex);
  const upgradedSteps = sourceSteps.map((step, stepIndex) => normalizeInteractiveStep(step, stepIndex, analysis, lesson));

  return {
    ...lesson,
    interactive_steps: upgradedSteps,
    lessonBlueprint: {
      ...analysis,
      totalSteps: upgradedSteps.length,
      totalLessonXP: upgradedSteps.reduce((sum, step) => sum + (step.xpReward || 0), 0),
    },
    [LESSON_UPGRADE_FLAG]: true,
  };
}

function convertLegacySteps(legacySteps = [], lesson = {}) {
  if (!Array.isArray(legacySteps)) return [];

  const converted = [];
  legacySteps.forEach((step, index) => {
    if (!step || typeof step !== 'object') return;

    if (step.type === 'quiz' && Array.isArray(step.options)) {
      const correctLetter = typeof step.answer === 'string'
        ? step.answer.trim().toUpperCase()
        : 'A';
      const correctIndex = Math.max(0, step.options.findIndex((_, i) => String.fromCharCode(65 + i) === correctLetter));

      converted.push({
        hook: shortHook(step.question || `${lesson.title || 'Lesson'} quick check.`),
        challengePrompt: 'Choose the best answer to unlock the next checkpoint.',
        interactionType: 'multiple-choice',
        options: step.options.map((opt) => stripOptionPrefix(opt)),
        correctIndex,
        explanation: {
          intuition: 'Think in plain language first. Pick the option that best matches the core meaning.',
          mechanism: 'Multiple-choice checkpoints help you validate one idea before the lesson unlocks the next one.',
          code: `<!-- Quick check for ${lesson.id || 'lesson'} -->\n<!-- Correct option index: ${correctIndex} -->`
        },
        visualExample: `<div style='padding:14px;border:1px dashed #cbd5e1;border-radius:10px;'>Question ${index + 1} unlocked.</div>`,
      });
      return;
    }

    if (step.type === 'code') {
      converted.push({
        hook: shortHook(step.instruction || `Build the ${lesson.title || 'lesson'} structure.`),
        challengePrompt: 'Type the expected tag pattern in the check box to unlock this concept.',
        interactionType: 'live-type',
        placeholder: 'Type the key HTML tag (example: h1)',
        acceptedAnswers: deriveAcceptedAnswersFromCode(step.solution),
        explanation: {
          intuition: 'You are turning plain text into meaningful building blocks the browser can understand.',
          mechanism: 'Tags and attributes become DOM nodes. Correct structure makes JavaScript targeting reliable.',
          code: step.solution || '<p>Structure goes here</p>'
        },
        visualExample: step.solution || `<p>${escapeHTML(step.instruction || 'Structure preview')}</p>`,
      });
      return;
    }

    if (step.type === 'explanation' && step.content) {
      const keyword = deriveKeywordFromText(step.content, lesson.title);
      converted.push({
        hook: shortHook(step.content),
        challengePrompt: `Type the keyword "${keyword}" to confirm this concept before continuing.`,
        interactionType: 'live-type',
        placeholder: `Type: ${keyword}`,
        acceptedAnswers: [keyword],
        explanation: {
          intuition: firstSentence(step.content),
          mechanism: secondSentence(step.content) || 'Browsers parse structure into the DOM, then scripts interact with those nodes.',
          code: `<p>${escapeHTML(keyword)} is a key concept in ${lesson.title || 'this lesson'}.</p>`
        },
        visualExample: `<div style='padding:10px;border:1px solid #e2e8f0;border-radius:10px;'>${escapeHTML(keyword)} checkpoint passed.</div>`,
      });
    }
  });

  return converted;
}

function analyzeLesson(lesson, steps, lessonIndex) {
  const typeCounts = steps.reduce((acc, step) => {
    const key = step?.interactionType || 'unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const dominantInteraction = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'multiple-choice';

  let explanationStyle = 'Mixed interactive walkthrough';
  if (dominantInteraction === 'multiple-choice') explanationStyle = 'Prediction-first checkpoints';
  if (dominantInteraction === 'code-spotlight') explanationStyle = 'Code token targeting drills';
  if (dominantInteraction === 'live-type') explanationStyle = 'Typed recall checkpoints';

  const missingInteractivity = [];
  if (!typeCounts['live-type']) missingInteractivity.push('No typed checkpoint in source data');
  if (!typeCounts['code-spotlight']) missingInteractivity.push('No code-part targeting in source data');
  if (!typeCounts['multiple-choice']) missingInteractivity.push('No fast prediction round in source data');

  const challengeWeight = lesson?.challenge ? 1.2 : 0;
  const complexityScore = steps.length
    + (typeCounts['code-spotlight'] || 0) * 0.8
    + (typeCounts['live-type'] || 0) * 0.9
    + challengeWeight;

  let complexity = 'Beginner';
  if (complexityScore >= 5 && complexityScore < 7.5) complexity = 'Beginner+';
  if (complexityScore >= 7.5) complexity = 'Intermediate';

  return {
    coreConcept: lesson.title || `Lesson ${lessonIndex + 1}`,
    explanationStyle,
    missingInteractivity,
    complexity,
  };
}

function normalizeInteractiveStep(step, stepIndex, analysis, lesson) {
  const interactionType = normalizeInteractionType(step.interactionType);
  const explanation = normalizeExplanation(step.explanation, lesson, step);
  const hook = shortHook(step.hook || `${lesson.title || 'Concept'} checkpoint.`);
  const fallbackVisual = buildVisualFallback(explanation.code, lesson?.module || 'html');

  const normalized = {
    ...step,
    stepNumber: stepIndex + 1,
    interactionType,
    hook,
    challengePrompt: step.challengePrompt || deriveChallengePrompt(step, interactionType),
    explanation,
    visualExample: step.visualExample || fallbackVisual,
    xpReward: Number.isFinite(step.xpReward)
      ? Math.max(5, Math.floor(step.xpReward))
      : computeStepXP(step, interactionType, analysis),
    feedback: {
      correct: step.feedback?.correct || `Correct! ${analysis.coreConcept} is now locked in.`,
      incorrect: step.feedback?.incorrect || buildIncorrectReason(step, interactionType),
      hint: step.feedback?.hint || deriveHint(step, interactionType),
    },
  };

  if (interactionType === 'multiple-choice') {
    normalized.options = Array.isArray(step.options) && step.options.length > 0
      ? step.options.map((opt) => stripOptionPrefix(String(opt)))
      : ['Option A', 'Option B', 'Option C'];
    normalized.correctIndex = Number.isInteger(step.correctIndex)
      ? step.correctIndex
      : 0;
  }

  if (interactionType === 'code-spotlight') {
    const codeParts = Array.isArray(step.codeParts) && step.codeParts.length > 0
      ? step.codeParts
      : explanation.code
          .split(/(\s+)/)
          .filter(Boolean)
          .slice(0, 6)
          .map((part) => ({ text: part }));

    normalized.codeParts = codeParts.map((part) => ({ text: String(part.text || '').trim() }));
    normalized.correctIndex = Number.isInteger(step.correctIndex)
      ? step.correctIndex
      : 0;
  }

  if (interactionType === 'live-type') {
    normalized.placeholder = step.placeholder || 'Type your answer...';
    const accepted = Array.isArray(step.acceptedAnswers) && step.acceptedAnswers.length > 0
      ? step.acceptedAnswers
      : deriveAcceptedAnswersFromCode(explanation.code);

    normalized.acceptedAnswers = accepted.map((item) => String(item).trim()).filter(Boolean);
  }

  return normalized;
}

function normalizeInteractionType(type) {
  const valid = ['multiple-choice', 'code-spotlight', 'live-type'];
  return valid.includes(type) ? type : 'multiple-choice';
}

function normalizeExplanation(explanation = {}, lesson, step) {
  const intuition = explanation.intuition || firstSentence(step.hook) || `This checkpoint teaches ${lesson?.title || 'a core concept'}.`;
  const mechanism = explanation.mechanism || 'The browser parses this markup into the DOM, then JavaScript can target and update it.';
  const code = explanation.code || '<p>Practice step</p>';

  return {
    intuition,
    mechanism,
    code,
  };
}

function deriveChallengePrompt(step, type) {
  if (step.challengePrompt) return step.challengePrompt;

  if (type === 'multiple-choice') {
    return 'Pick the best option. One correct choice unlocks the next step.';
  }

  if (type === 'code-spotlight') {
    return 'Click the exact code token that matches the concept.';
  }

  return 'Type the expected keyword, tag, or term to continue.';
}

function deriveHint(step, type) {
  if (type === 'multiple-choice' && Array.isArray(step.options) && Number.isInteger(step.correctIndex)) {
    const expected = stripOptionPrefix(String(step.options[step.correctIndex] || ''));
    return `Hint: focus on "${expected}".`;
  }

  if (type === 'code-spotlight' && Array.isArray(step.codeParts) && Number.isInteger(step.correctIndex)) {
    const expected = String(step.codeParts[step.correctIndex]?.text || '').trim();
    return `Hint: the exact token is "${expected}".`;
  }

  if (type === 'live-type' && Array.isArray(step.acceptedAnswers)) {
    return `Hint: accepted value includes "${step.acceptedAnswers[0]}".`;
  }

  return 'Hint: re-read the hook and map it to the core idea being tested.';
}

function buildIncorrectReason(step, type) {
  if (type === 'multiple-choice') {
    return 'That option does not match what the browser actually does in this scenario.';
  }

  if (type === 'code-spotlight') {
    return 'That token is part of the snippet, but it is not the target concept for this checkpoint.';
  }

  return 'The typed value does not match the expected keyword for this concept.';
}

function computeStepXP(step, interactionType, analysis) {
  let xp = 8;
  if (interactionType === 'live-type') xp += 2;
  if (interactionType === 'code-spotlight') xp += 1;
  if (analysis?.complexity === 'Beginner+') xp += 1;
  if (analysis?.complexity === 'Intermediate') xp += 2;

  return Math.max(6, xp);
}

function buildVisualFallback(code, moduleName = 'html') {
  const border = moduleName === 'css' ? '#3b82f6' : '#f97316';
  return `
    <div style="padding:14px;border:1px solid ${border};border-radius:10px;background:#f8fafc;color:#0f172a;">
      <p style="margin:0 0 8px 0;font-weight:700;">Live DOM Preview</p>
      <pre style="margin:0;white-space:pre-wrap;font-family:'Fira Code', monospace;font-size:0.82rem;line-height:1.5;">${escapeHTML(code || '<p>Example</p>')}</pre>
    </div>
  `;
}

function initInteractiveLesson(lessonData) {
  interactiveLessonData = upgradeLessonStructure(lessonData || {});
  interactiveSteps = Array.isArray(interactiveLessonData.interactive_steps)
    ? interactiveLessonData.interactive_steps
    : [];
  interactiveLessonMeta = interactiveLessonData.lessonBlueprint || null;

  currentInteractiveStep = 0;
  interactiveSessionXP = 0;
  interactiveStreak = 0;
  interactiveWrongAttempts = 0;

  if (interactiveSteps.length === 0) {
    console.error('No interactive steps found for this lesson.');
    return;
  }

  const mount = document.getElementById('interactiveStepsMount');
  const progressContainer = document.getElementById('interactiveProgress');

  if (mount) mount.innerHTML = '';
  if (progressContainer) progressContainer.style.display = 'block';

  ensureProgressHud();
  updateInteractiveProgress();
  renderCurrentStep();
}

function ensureProgressHud() {
  const progressContainer = document.getElementById('interactiveProgress');
  if (!progressContainer) return;

  let hud = document.getElementById('interactiveHud');
  if (!hud) {
    hud = document.createElement('div');
    hud.id = 'interactiveHud';
    hud.className = 'interactive-hud';
    hud.innerHTML = `
      <div class="hud-chip"><span>Session XP</span><strong id="interactiveSessionXP">0</strong></div>
      <div class="hud-chip"><span>Streak</span><strong id="interactiveStreak">0</strong></div>
      <div class="hud-chip"><span>Complexity</span><strong id="interactiveComplexity">Beginner</strong></div>
    `;
    progressContainer.appendChild(hud);
  }

  const complexityEl = document.getElementById('interactiveComplexity');
  if (complexityEl) {
    complexityEl.textContent = interactiveLessonMeta?.complexity || 'Beginner';
  }

  updateHudCounters();
}

function updateHudCounters() {
  const xpEl = document.getElementById('interactiveSessionXP');
  const streakEl = document.getElementById('interactiveStreak');
  if (xpEl) xpEl.textContent = String(interactiveSessionXP);
  if (streakEl) streakEl.textContent = String(interactiveStreak);
}

function updateInteractiveProgress() {
  const progressBar = document.getElementById('interactiveProgressBar');
  const progressText = document.getElementById('interactiveProgressText');
  const pct = Math.floor((currentInteractiveStep / interactiveSteps.length) * 100);

  if (progressBar) progressBar.style.width = `${pct}%`;
  if (progressText) {
    progressText.textContent = `Step ${currentInteractiveStep + 1} of ${interactiveSteps.length}`;
  }
}

function renderCurrentStep() {
  const mount = document.getElementById('interactiveStepsMount');
  if (!mount) return;

  const step = interactiveSteps[currentInteractiveStep];
  if (!step) return;

  mount.innerHTML = '';
  mount.className = 'interactive-step-container fade-slide-up';

  if (currentInteractiveStep === 0 && interactiveLessonMeta) {
    mount.appendChild(createLessonAnalysisStrip(interactiveLessonMeta));
  }

  const hookEl = document.createElement('div');
  hookEl.className = 'interactive-hook';
  hookEl.innerHTML = `
    <div class="hook-icon-wrap"><i class="fa-solid fa-circle-question"></i></div>
    <div class="hook-copy">
      <p class="hook-label">Concept Hook</p>
      <h3 class="hook-text">${escapeHTML(step.hook)}</h3>
      <p class="hook-subtext">${escapeHTML(step.challengePrompt || 'Interact to unlock the next step.')}</p>
    </div>
    <div class="step-xp-badge">+${step.xpReward || 10} XP</div>
  `;
  mount.appendChild(hookEl);

  const interactionBox = document.createElement('div');
  interactionBox.className = 'interactive-box';

  if (step.interactionType === 'multiple-choice') {
    interactionBox.appendChild(renderMultipleChoiceInteraction(step));
  } else if (step.interactionType === 'code-spotlight') {
    interactionBox.appendChild(renderCodeSpotlightInteraction(step));
  } else {
    interactionBox.appendChild(renderLiveTypeInteraction(step));
  }

  mount.appendChild(interactionBox);

  const attemptFeedback = document.createElement('div');
  attemptFeedback.id = 'interactiveAttemptFeedback';
  attemptFeedback.className = 'attempt-feedback hidden';
  mount.appendChild(attemptFeedback);

  const feedbackContainer = document.createElement('div');
  feedbackContainer.id = 'interactiveFeedback';
  feedbackContainer.className = 'interactive-feedback hidden';
  mount.appendChild(feedbackContainer);
}

function createLessonAnalysisStrip(meta) {
  const wrap = document.createElement('div');
  wrap.className = 'lesson-analysis-strip';

  const missing = Array.isArray(meta.missingInteractivity) && meta.missingInteractivity.length > 0
    ? meta.missingInteractivity.join(' | ')
    : 'Balanced interaction coverage';

  wrap.innerHTML = `
    <div class="analysis-pill">
      <span>Core Concept</span>
      <strong>${escapeHTML(meta.coreConcept || 'Concept')}</strong>
    </div>
    <div class="analysis-pill">
      <span>Current Style</span>
      <strong>${escapeHTML(meta.explanationStyle || 'Interactive')}</strong>
    </div>
    <div class="analysis-pill">
      <span>Gap Check</span>
      <strong>${escapeHTML(missing)}</strong>
    </div>
    <div class="analysis-pill">
      <span>Complexity</span>
      <strong>${escapeHTML(meta.complexity || 'Beginner')}</strong>
    </div>
  `;

  return wrap;
}

function renderMultipleChoiceInteraction(step) {
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'mc-options-container';

  step.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-mc-option';

    const letter = String.fromCharCode(65 + idx);
    btn.innerHTML = `<span class="mc-letter">${letter}</span> <span class="mc-text">${escapeHTML(opt)}</span>`;

    btn.addEventListener('click', () => {
      const allButtons = optionsContainer.querySelectorAll('.btn-mc-option');
      allButtons.forEach((choice) => choice.classList.remove('selected', 'error-choice'));
      btn.classList.add('selected');

      const selectedLabel = String(opt || '').trim();
      const isCorrect = idx === step.correctIndex;

      if (isCorrect) {
        btn.classList.add('correct-choice');
        lockInteractionControls(optionsContainer);
        handleCorrectAnswer(step, btn, selectedLabel);
      } else {
        btn.classList.add('error-choice', 'shake-animation');
        setTimeout(() => btn.classList.remove('shake-animation'), 400);
        handleIncorrectAnswer(step, btn, selectedLabel);
      }
    });

    optionsContainer.appendChild(btn);
  });

  return optionsContainer;
}

function renderCodeSpotlightInteraction(step) {
  const codeContainer = document.createElement('div');
  codeContainer.className = 'code-spotlight-container';

  step.codeParts.forEach((part, idx) => {
    const token = String(part.text || '');
    const span = document.createElement('button');
    span.type = 'button';
    span.className = 'code-part';
    span.textContent = token;

    span.addEventListener('click', () => {
      const allParts = codeContainer.querySelectorAll('.code-part');
      allParts.forEach((node) => node.classList.remove('selected', 'error-choice'));
      span.classList.add('selected');

      const isCorrect = idx === step.correctIndex;
      if (isCorrect) {
        span.classList.add('correct-choice');
        lockInteractionControls(codeContainer);
        handleCorrectAnswer(step, span, token);
      } else {
        span.classList.add('error-choice', 'shake-animation');
        setTimeout(() => span.classList.remove('shake-animation'), 400);
        handleIncorrectAnswer(step, span, token);
      }
    });

    codeContainer.appendChild(span);
  });

  return codeContainer;
}

function renderLiveTypeInteraction(step) {
  const inputContainer = document.createElement('div');
  inputContainer.className = 'live-type-container';
  inputContainer.innerHTML = `
    <div class="type-input-wrapper">
      <input type="text" id="liveTypeInput" placeholder="${escapeHTML(step.placeholder || 'Type here...')}" autocomplete="off" spellcheck="false" />
      <button type="button" id="submitTypeBtn" class="btn btn-primary">Check</button>
    </div>
  `;

  const input = inputContainer.querySelector('#liveTypeInput');
  const button = inputContainer.querySelector('#submitTypeBtn');

  const onSubmit = () => {
    const userVal = String(input.value || '').trim().toLowerCase();
    const accepted = (step.acceptedAnswers || []).map((item) => String(item).trim().toLowerCase());
    const isCorrect = accepted.includes(userVal);

    if (isCorrect) {
      lockInteractionControls(inputContainer);
      button.classList.add('correct-choice');
      handleCorrectAnswer(step, button, userVal);
    } else {
      button.classList.remove('correct-choice');
      button.classList.add('shake-animation');
      setTimeout(() => button.classList.remove('shake-animation'), 400);
      handleIncorrectAnswer(step, button, userVal || '(empty)');
    }
  };

  button.addEventListener('click', onSubmit);
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    }
  });

  return inputContainer;
}

function lockInteractionControls(container) {
  if (!container) return;
  container.querySelectorAll('button, input').forEach((el) => {
    el.disabled = true;
    el.classList.add('locked');
  });
}

function handleCorrectAnswer(step, targetElement, selectedLabel) {
  clearAttemptFeedback();

  if (typeof playGamificationSound === 'function') {
    playGamificationSound('success');
  }

  const xpAward = step.xpReward || 10;
  if (typeof awardXP === 'function') {
    awardXP(xpAward);
  }

  interactiveSessionXP += xpAward;
  interactiveStreak += 1;
  updateHudCounters();

  if (targetElement) {
    targetElement.classList.add('interactive-success-glow');
  }

  showGameFeedback(xpAward, targetElement);
  revealDeepExplanation(step, selectedLabel);
}

function handleIncorrectAnswer(step, targetElement, selectedLabel) {
  interactiveStreak = 0;
  interactiveWrongAttempts += 1;
  updateHudCounters();

  if (typeof playGamificationSound === 'function') {
    playGamificationSound('error');
  }

  if (targetElement) {
    targetElement.classList.add('shake-animation');
    setTimeout(() => targetElement.classList.remove('shake-animation'), 350);
  }

  const reason = `${step.feedback?.incorrect || 'Not quite.'}`;
  const hint = step.feedback?.hint || 'Try matching your answer to the concept hook.';
  const context = selectedLabel ? `You chose: ${selectedLabel}` : '';

  showAttemptFeedback(reason, hint, context);
}

function showAttemptFeedback(reason, hint, context) {
  const attemptFeedback = document.getElementById('interactiveAttemptFeedback');
  if (!attemptFeedback) return;

  attemptFeedback.classList.remove('hidden');
  attemptFeedback.classList.add('error', 'fade-slide-up');
  attemptFeedback.innerHTML = `
    <div class="attempt-feedback-title"><i class="fa-solid fa-circle-exclamation"></i> Not yet</div>
    ${context ? `<p class="attempt-feedback-context">${escapeHTML(context)}</p>` : ''}
    <p>${escapeHTML(reason)}</p>
    <p class="attempt-feedback-hint"><strong>Hint:</strong> ${escapeHTML(hint)}</p>
  `;
}

function clearAttemptFeedback() {
  const attemptFeedback = document.getElementById('interactiveAttemptFeedback');
  if (!attemptFeedback) return;

  attemptFeedback.classList.add('hidden');
  attemptFeedback.classList.remove('error');
  attemptFeedback.innerHTML = '';
}

function showGameFeedback(xpAwarded, targetElement) {
  const amount = Number.isFinite(xpAwarded) ? xpAwarded : 10;
  const floatWrap = document.createElement('div');
  floatWrap.className = 'gamified-float-xp';
  floatWrap.textContent = `+${amount} XP`;

  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    floatWrap.style.left = `${rect.left + rect.width / 2}px`;
    floatWrap.style.top = `${rect.top}px`;
  } else {
    floatWrap.style.left = '50%';
    floatWrap.style.top = '30%';
  }

  document.body.appendChild(floatWrap);
  setTimeout(() => floatWrap.remove(), 1500);
}

function revealDeepExplanation(step, selectedLabel) {
  const container = document.getElementById('interactiveFeedback');
  if (!container) return;

  container.classList.remove('hidden');
  container.classList.add('fade-slide-up');

  container.innerHTML = `
    <div class="explanation-card">
      <div class="explanation-header">
        <i class="fa-solid fa-check-circle success-icon"></i>
        <span>${escapeHTML(step.feedback?.correct || 'Correct! Let\'s break it down.')}</span>
      </div>
      ${selectedLabel ? `<p class="explanation-selection-note">Your winning answer: <strong>${escapeHTML(selectedLabel)}</strong></p>` : ''}
      <div class="explanation-layers">
        <div class="exp-layer intuition">
          <div class="exp-layer-icon"><i class="fa-solid fa-lightbulb" style="color:#fbbf24;"></i></div>
          <div class="exp-layer-content">
            <strong>Intuition</strong>
            <p>${escapeHTML(step.explanation.intuition)}</p>
          </div>
        </div>
        <div class="exp-layer mechanism">
          <div class="exp-layer-icon"><i class="fa-solid fa-gear" style="color:#38bdf8;"></i></div>
          <div class="exp-layer-content">
            <strong>Mechanism</strong>
            <p>${escapeHTML(step.explanation.mechanism)}</p>
          </div>
        </div>
        <div class="exp-layer code-mapping">
          <div class="exp-layer-icon"><i class="fa-solid fa-code" style="color:#a3e635;"></i></div>
          <div class="exp-layer-content">
            <strong>Code Mapping</strong>
            <pre><code class="language-html">${escapeHTML(step.explanation.code)}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="visual-example-box">
      <div class="visual-example-top">
        <div><i class="fa-solid fa-eye" style="color:#f472b6;"></i> Live DOM Example</div>
        <div class="browser-dots"><span></span><span></span><span></span></div>
      </div>
      <div class="visual-example-render" id="liveVisualRender_${currentInteractiveStep}"></div>
    </div>

    <div class="next-step-wrap">
      <button type="button" class="btn btn-primary btn-next-step" id="btnNextStep">
        Continue <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `;

  renderVisualExample(step);

  if (typeof window.hljs !== 'undefined') {
    container.querySelectorAll('pre code').forEach((block) => window.hljs.highlightElement(block));
  }

  const nextBtn = document.getElementById('btnNextStep');
  if (nextBtn) nextBtn.addEventListener('click', goNextInteractiveStep);

  setTimeout(() => {
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 80);
}

function renderVisualExample(step) {
  const renderTarget = document.getElementById(`liveVisualRender_${currentInteractiveStep}`);
  if (!renderTarget) return;

  const html = step.visualExample || buildVisualFallback(step.explanation?.code || '<p>Preview</p>');
  renderTarget.innerHTML = html;

  const tag = document.createElement('div');
  tag.className = 'visual-dom-tag';
  tag.textContent = 'DOM render active';
  renderTarget.prepend(tag);

  animateVisualTargets(renderTarget, step.visualFocusSelector);
}

function animateVisualTargets(container, selector) {
  if (!container) return;

  const nodes = selector
    ? Array.from(container.querySelectorAll(selector))
    : Array.from(container.querySelectorAll('*')).filter((el) => !el.classList.contains('visual-dom-tag'));

  const targets = nodes.slice(0, 8);
  targets.forEach((node, index) => {
    setTimeout(() => {
      node.classList.add('interactive-visual-glow');
      setTimeout(() => node.classList.remove('interactive-visual-glow'), 900);
    }, index * 180);
  });
}

function goNextInteractiveStep() {
  currentInteractiveStep += 1;

  if (currentInteractiveStep < interactiveSteps.length) {
    updateInteractiveProgress();
    renderCurrentStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const progressBar = document.getElementById('interactiveProgressBar');
  if (progressBar) progressBar.style.width = '100%';

  finishInteractiveLesson();
}

function finishInteractiveLesson() {
  const mount = document.getElementById('interactiveStepsMount');
  if (!mount) return;

  const totalSteps = interactiveSteps.length || 1;
  const totalAttempts = totalSteps + interactiveWrongAttempts;
  const accuracyPct = Math.max(0, Math.round((totalSteps / totalAttempts) * 100));

  mount.className = 'interactive-step-container fade-slide-up';
  mount.innerHTML = `
    <div class="interactive-finish-banner">
      <div class="trophy-wrap">
        <i class="fa-solid fa-trophy"></i>
      </div>
      <h2>Lesson Cleared!</h2>
      <p>You completed every interactive checkpoint and unlocked the full concept path for this lesson.</p>
      <div class="finish-stats-grid">
        <div class="finish-stat"><span>Session XP</span><strong>${interactiveSessionXP}</strong></div>
        <div class="finish-stat"><span>Accuracy</span><strong>${accuracyPct}%</strong></div>
        <div class="finish-stat"><span>Steps</span><strong>${totalSteps}</strong></div>
      </div>
      <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap:wrap;">
        <button class="btn btn-primary" id="finishOpenEditorBtn">
          <i class="fa-solid fa-code"></i> Try Code Challenge
        </button>
      </div>
    </div>
  `;

  const editorBtn = document.getElementById('finishOpenEditorBtn');
  if (editorBtn) {
    editorBtn.addEventListener('click', () => {
      const openEditorBtn = document.getElementById('openEditorBtn');
      if (openEditorBtn) openEditorBtn.click();
    });
  }

  const quizSection = document.getElementById('quizSection');
  if (quizSection && interactiveLessonData && interactiveLessonData.quiz && interactiveLessonData.quiz.length > 0) {
    quizSection.style.display = 'block';
    mount.appendChild(quizSection);
  }
}

function firstSentence(text = '') {
  const cleaned = String(text || '').trim();
  if (!cleaned) return '';
  const sentence = cleaned.split(/(?<=[.!?])\s+/)[0] || cleaned;
  return sentence.trim();
}

function secondSentence(text = '') {
  const cleaned = String(text || '').trim();
  if (!cleaned) return '';
  const parts = cleaned.split(/(?<=[.!?])\s+/);
  return (parts[1] || '').trim();
}

function shortHook(text = '') {
  const cleaned = String(text || '').replace(/\s+/g, ' ').trim();
  if (!cleaned) return 'New concept unlocked.';

  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length <= 2) return cleaned;

  return `${sentences[0]} ${sentences[1]}`.trim();
}

function deriveKeywordFromText(text = '', fallback = 'concept') {
  const words = String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => word.length >= 4 && !['this', 'that', 'with', 'from', 'your', 'what', 'when', 'where', 'which', 'about'].includes(word));

  if (words.length === 0) {
    const titleWord = String(fallback || 'concept').split(' ')[0] || 'concept';
    return titleWord.toLowerCase();
  }

  return words[0];
}

function deriveAcceptedAnswersFromCode(code = '') {
  const tagMatches = [...String(code).matchAll(/<\/?([a-z0-9-]+)/gi)].map((match) => match[1]?.toLowerCase()).filter(Boolean);
  const uniqueTags = [...new Set(tagMatches)];
  if (uniqueTags.length > 0) return uniqueTags.slice(0, 3);
  return ['html'];
}

function stripOptionPrefix(optionText = '') {
  return String(optionText).replace(/^[A-Z]\)\s*/, '').trim();
}

function escapeHTML(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

window.upgradeCurriculumLessons = upgradeCurriculumLessons;
