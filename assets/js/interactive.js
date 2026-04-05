/* =============================================
 * SKILL-ORBIT — interactive.js
 * Engine for Gamified, Micro-Interactive Lessons
 * ============================================= */

let currentInteractiveStep = 0;
let interactiveSteps = [];
let interactiveLessonData = null;

function initInteractiveLesson(lessonData) {
  interactiveLessonData = lessonData;
  interactiveSteps = lessonData.interactive_steps || [];
  currentInteractiveStep = 0;
  
  if (interactiveSteps.length === 0) {
    console.error("No interactive steps found for this lesson.");
    return;
  }
  
  const mount = document.getElementById('interactiveStepsMount');
  const progressContainer = document.getElementById('interactiveProgress');
  
  if (mount) mount.innerHTML = '';
  if (progressContainer) progressContainer.style.display = 'block';
  
  updateInteractiveProgress();
  renderCurrentStep();
}

function updateInteractiveProgress() {
  const progressBar = document.getElementById('interactiveProgressBar');
  const progressText = document.getElementById('interactiveProgressText');
  const pct = Math.floor(((currentInteractiveStep) / interactiveSteps.length) * 100);
  
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (progressText) progressText.textContent = `Step ${currentInteractiveStep + 1} of ${interactiveSteps.length}`;
}

function renderCurrentStep() {
  const mount = document.getElementById('interactiveStepsMount');
  if (!mount) return;
  
  const step = interactiveSteps[currentInteractiveStep];
  
  // Clear previous Step and apply slide in
  mount.innerHTML = '';
  mount.className = 'interactive-step-container fade-slide-up';
  
  // 1. Hook
  const hookEl = document.createElement('div');
  hookEl.className = 'interactive-hook';
  hookEl.innerHTML = `
    <div class="hook-icon-wrap"><i class="fa-solid fa-circle-question"></i></div>
    <h3 class="hook-text">${step.hook}</h3>
  `;
  mount.appendChild(hookEl);
  
  // 2. Interaction
  const interactionBox = document.createElement('div');
  interactionBox.className = 'interactive-box';
  
  if (step.interactionType === 'multiple-choice') {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'mc-options-container';
    
    step.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn-mc-option';
      
      const letter = String.fromCharCode(65 + idx); // A, B, C
      btn.innerHTML = `<span class="mc-letter">${letter}</span> <span class="mc-text">${opt}</span>`;
      
      btn.onclick = () => handleAnswer(idx, step.correctIndex, btn, step);
      optionsContainer.appendChild(btn);
    });
    interactionBox.appendChild(optionsContainer);
  } else if (step.interactionType === 'code-spotlight') {
    const codeContainer = document.createElement('div');
    codeContainer.className = 'code-spotlight-container';
    
    if (step.codeParts) {
      step.codeParts.forEach((part, idx) => {
        const span = document.createElement('span');
        span.className = 'code-part';
        span.textContent = part.text;
        span.onclick = () => handleAnswer(idx, step.correctIndex, span, step);
        codeContainer.appendChild(span);
      });
    }
    interactionBox.appendChild(codeContainer);
  } else if (step.interactionType === 'live-type') {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'live-type-container';
    inputContainer.innerHTML = `
      <div class="type-input-wrapper">
        <input type="text" id="liveTypeInput" placeholder="${step.placeholder || 'Type here...'}" autocomplete="off" spellcheck="false" />
        <button id="submitTypeBtn" class="btn btn-primary">Check</button>
      </div>
    `;
    interactionBox.appendChild(inputContainer);
    
    setTimeout(() => {
      const input = document.getElementById('liveTypeInput');
      const btn = document.getElementById('submitTypeBtn');
      if (input && btn) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') btn.click();
        });
        btn.onclick = () => {
          const userVal = input.value.trim().toLowerCase();
          const isCorrect = step.acceptedAnswers.some(ans => userVal === ans.toLowerCase());
          handleAnswer(isCorrect ? step.correctIndex : -1, step.correctIndex, btn, step);
        };
      }
    }, 0);
  }
  
  mount.appendChild(interactionBox);
  
  // 3. Container for feedback & explanation (hidden initially)
  const feedbackContainer = document.createElement('div');
  feedbackContainer.id = 'interactiveFeedback';
  feedbackContainer.className = 'interactive-feedback hidden';
  mount.appendChild(feedbackContainer);
}

function handleAnswer(selectedIndex, correctIndex, btnElement, step) {
  const feedbackContainer = document.getElementById('interactiveFeedback');
  if (feedbackContainer && !feedbackContainer.classList.contains('hidden') && feedbackContainer.dataset.locked === 'true') {
      return;
  }
  
  const allBtns = btnElement.parentElement.querySelectorAll('.btn-mc-option, .code-part');
  allBtns.forEach(b => {
    b.classList.remove('selected', 'error-choice');
  });
  
  btnElement.classList.add('selected');
  
  if (selectedIndex === correctIndex) {
    btnElement.classList.add('correct-choice');
    showGameFeedback(true, btnElement);
    
    if (typeof playGamificationSound === 'function') playGamificationSound('success');
    if (typeof awardXP === 'function') awardXP(10);
    
    revealDeepExplanation(step, feedbackContainer);
    allBtns.forEach(b => b.style.pointerEvents = 'none');
  } else {
    btnElement.classList.add('error-choice');
    btnElement.classList.add('shake-animation');
    setTimeout(() => btnElement.classList.remove('shake-animation'), 400);
    if (typeof playGamificationSound === 'function') playGamificationSound('error');
  }
}

function showGameFeedback(isCorrect, targetElement) {
  if (isCorrect) {
    const floatWrap = document.createElement('div');
    floatWrap.className = 'gamified-float-xp';
    floatWrap.innerHTML = '+10 XP';
    const rect = targetElement.getBoundingClientRect();
    floatWrap.style.left = `${rect.left + rect.width / 2}px`;
    floatWrap.style.top = `${rect.top}px`;
    document.body.appendChild(floatWrap);
    setTimeout(() => { floatWrap.remove(); }, 1500);
  }
}

function revealDeepExplanation(step, container) {
  container.dataset.locked = 'true';
  container.classList.remove('hidden');
  container.classList.add('fade-slide-up');
  
  let html = `
    <div class="explanation-card">
      <div class="explanation-header">
        <i class="fa-solid fa-check-circle success-icon"></i> 
        <span>Correct! Let's break it down.</span>
      </div>
      <div class="explanation-layers">
        <div class="exp-layer intuition">
          <div class="exp-layer-icon"><i class="fa-solid fa-lightbulb" style="color:#fbbf24;"></i></div>
          <div class="exp-layer-content">
            <strong>Intuition</strong>
            <p>${step.explanation.intuition}</p>
          </div>
        </div>
        <div class="exp-layer mechanism">
          <div class="exp-layer-icon"><i class="fa-solid fa-gear" style="color:#38bdf8;"></i></div>
          <div class="exp-layer-content">
            <strong>Mechanism</strong>
            <p>${step.explanation.mechanism}</p>
          </div>
        </div>
        <div class="exp-layer code-mapping">
          <div class="exp-layer-icon"><i class="fa-solid fa-code" style="color:#a3e635;"></i></div>
          <div class="exp-layer-content">
            <strong>Code Example</strong>
            <pre><code class="language-html">${escapeHTML(step.explanation.code)}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;
  
  if (step.visualExample) {
    html += `
      <div class="visual-example-box">
        <div class="visual-example-top">
           <div><i class="fa-solid fa-eye" style="color:#f472b6;"></i> Live Visual Render</div>
           <div class="browser-dots"><span></span><span></span><span></span></div>
        </div>
        <div class="visual-example-render" id="liveVisualRender_${currentInteractiveStep}"></div>
      </div>
    `;
  }
  
  html += `
    <div class="next-step-wrap">
      <button class="btn btn-primary btn-next-step" id="btnNextStep">
        Continue <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `;
  
  container.innerHTML = html;
  
  if (step.visualExample) {
     const renderTarget = document.getElementById(`liveVisualRender_${currentInteractiveStep}`);
     if (renderTarget) {
         const iframe = document.createElement('iframe');
         iframe.className = 'interactive-live-iframe';
         renderTarget.appendChild(iframe);
         const iframeDoc = iframe.contentWindow.document;
         iframeDoc.open();
         iframeDoc.write(`
             <style>
               body { 
                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                 color: #1e293b; 
                 background: #f8fafc; 
                 margin: 0; 
                 padding: 20px; 
               }
               h1, h2, h3 { margin-top: 0; }
             </style>
             ${step.visualExample}
         `);
         iframeDoc.close();
     }
  }
  
  if (typeof window.hljs !== 'undefined') {
    container.querySelectorAll('pre code').forEach(block => window.hljs.highlightElement(block));
  }
  
  document.getElementById('btnNextStep').onclick = goNextInteractiveStep;
  setTimeout(() => {
     container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

function goNextInteractiveStep() {
  currentInteractiveStep++;
  if (currentInteractiveStep < interactiveSteps.length) {
    updateInteractiveProgress();
    renderCurrentStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const progressBar = document.getElementById('interactiveProgressBar');
    if (progressBar) progressBar.style.width = '100%';
    finishInteractiveLesson();
  }
}

function finishInteractiveLesson() {
  const mount = document.getElementById('interactiveStepsMount');
  mount.className = 'interactive-step-container fade-slide-up';
  mount.innerHTML = `
    <div class="interactive-finish-banner">
      <div class="trophy-wrap">
        <i class="fa-solid fa-trophy"></i>
      </div>
      <h2>Concepts Mastered!</h2>
      <p>You have successfully grasped the core mechanics of this lesson using active interaction.</p>
      <div style="margin-top: 30px; display: flex; gap: 15px; justify-content: center; flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="document.getElementById('openEditorBtn').click()">
          <i class="fa-solid fa-code"></i> Try Code Challenge
        </button>
      </div>
    </div>
  `;
  const quizSection = document.getElementById('quizSection');
  if (quizSection && interactiveLessonData && interactiveLessonData.quiz && interactiveLessonData.quiz.length > 0) {
     quizSection.style.display = 'block';
     mount.appendChild(quizSection);
  }
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
}
