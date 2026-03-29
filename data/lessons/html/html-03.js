window.LESSON_DATA_html_03 = {
  "id": "html-03",
  "module": "html",
  "title": "HTML Document Structure",
  "xp": 150,
  "theory": `
    <style>
      .html-interactive-lesson { font-family: 'Inter', sans-serif; color: #e2e8f0; }
      .html-interactive-lesson h2 { font-size: 2rem; color: #f8fafc; margin-bottom: 0.5rem; }
      .html-interactive-lesson p { font-size: 1.1rem; line-height: 1.7; color: #cbd5e1; margin-bottom: 2rem; }
      
      .ib-block { background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 2rem; margin-bottom: 3rem; }
      .ib-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
      .ib-badge { background: #3b82f6; color: white; padding: 0.3rem 0.8rem; border-radius: 99px; font-weight: 600; font-size: 0.9rem; }
      .ib-title { font-size: 1.5rem; font-weight: 700; color: #f1f5f9; margin: 0; }
      
      .ib-workspace { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; }
      @media (max-width: 768px) { .ib-workspace { grid-template-columns: 1fr; } }
      .ib-panel { background: #1e293b; border-radius: 12px; padding: 1.5rem; border: 1px solid #334155; }
      .ib-panel h3 { font-size: 1rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem; }
      
      /* Specific block styling */
      .canvas-editor textarea { width: 100%; height: 100px; background: #0f172a; color: #f8fafc; border: 1px solid #475569; padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 1.2rem; resize: none; margin-bottom: 1rem; }
      .canvas-render { background: white; color: black; padding: 1rem; min-height: 100px; border-radius: 8px; font-family: sans-serif; position: relative; overflow: hidden; }
      
      .brain-scanner { position: absolute; top:0; left:0; width: 100%; height: 5px; background: rgba(239, 68, 68, 0.5); animation: scan 2s linear infinite; display: none; }
      @keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
      
      .ib-btn { background: #3b82f6; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: 0.2s; font-size: 1rem; }
      .ib-btn:hover { background: #2563eb; }
      .ib-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      .ib-feedback { margin-top: 1.5rem; padding: 1rem; background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; border-radius: 4px; display: none; }
      
      .html-wrap-box { border: 2px dashed #475569; padding: 2rem; text-align: center; border-radius: 12px; transition: 0.3s; }
      .html-wrap-box.active { border: 2px solid #22c55e; background: rgba(34, 197, 94, 0.1); }
      
      .split-zones { display: flex; flex-direction: column; gap: 1rem; }
      .zone { border: 2px dashed #475569; padding: 1rem; text-align: center; border-radius: 8px; cursor: pointer; transition: 0.3s; }
      .zone:hover { border-color: #64748b; }
      .zone.head { background: #0f172a; color: #94a3b8; }
      .zone.body { background: #e2e8f0; color: #0f172a; font-weight: bold; }
      
      .mock-browser { background: #0f172a; border-radius: 8px; border: 1px solid #334155; overflow: hidden; }
      .mock-tab-bar { background: #1e293b; padding: 0.5rem 1rem; display: flex; gap: 0.5rem; border-bottom: 1px solid #334155; }
      .mock-tab { background: #334155; padding: 0.3rem 1rem; border-radius: 6px 6px 0 0; font-size: 0.8rem; color: white; min-width: 100px; }
      .mock-viewport { background: white; padding: 1rem; min-height: 150px; color: black; }
      
      .doctype-switch { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
      .switch { position: relative; display: inline-block; width: 60px; height: 34px; }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px; }
      .slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
      input:checked + .slider { background-color: #3b82f6; }
      input:checked + .slider:before { transform: translateX(26px); }
      
      .dom-tree { font-family: monospace; font-size: 1.1rem; }
      .dom-node { margin-left: 1.5rem; cursor: pointer; transition: 0.2s; padding: 0.2rem 0.5rem; border-radius: 4px; }
      .dom-node:hover, .dom-node.active { background: rgba(59, 130, 246, 0.2); }
      
      .puzzle-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
      .p-tag { background: #475569; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; user-select: none; }
      .p-tag.active { background: #3b82f6; }
      
      .error-line { border-bottom: 2px wavy #ef4444; color: #f87171; cursor: pointer; padding-bottom: 2px; }
    </style>

    <div class="theory-hero text-center mb-5">
      <i class="fa-solid fa-code theory-hero-icon" style="color: #3b82f6;"></i>
      <h2 style="font-size: 2.5rem; font-weight: 800;">HTML Document Structure</h2>
      <p style="font-size: 1.2rem;">Learn the invisible blueprint of the web through hands-on interaction. <strong>Do not just read. Interact!</strong></p>
    </div>

    <div class="html-interactive-lesson">

      <!-- BLOCK 1: Raw Canvas -->
      <section class="ib-block" id="block-1">
        <div class="ib-header"><h3 class="ib-title">The Raw Canvas</h3></div>
        <p>What happens when you type text without HTML? Try typing <strong>"Hello Web!"</strong> below and hit Render.</p>
        <div class="ib-workspace">
          <div class="ib-panel">
            <h3>Text Input</h3>
            <div class="canvas-editor"><textarea id="b1-input" placeholder="Type text here..."></textarea></div>
            <button class="ib-btn" id="b1-btn">Render</button>
          </div>
          <div class="ib-panel">
            <h3>Browser View</h3>
            <div class="canvas-render" id="b1-render">
              <div class="brain-scanner" id="b1-scanner"></div>
              <span id="b1-output" style="color:#aaa;">Nothing yet...</span>
            </div>
          </div>
        </div>
        <div class="ib-feedback" id="b1-feedback">
          <strong>Explanation:</strong> The browser shows your text, but it's completely confused! Notice the scanning brain? Without HTML tags, it doesn't know if this is a title, a paragraph, or a button. It needs structure!
        </div>
      </section>

      <!-- BLOCK 2: HTML Wrapper -->
      <section class="ib-block" id="block-2">
        <div class="ib-header"><h3 class="ib-title">The Universal Wrapper</h3></div>
        <p>You must wrap everything inside an <code>&lt;html&gt;</code> container so the browser stops panicking. Click the 'Wrap Document' button.</p>
        <div class="ib-workspace">
          <div class="ib-panel" style="display:flex; align-items:center; justify-content:center;">
             <button class="ib-btn" id="b2-btn"><i class="fa-solid fa-box"></i> Wrap Document</button>
          </div>
          <div class="ib-panel">
            <h3>Structure</h3>
            <div class="html-wrap-box" id="b2-box">
              Hello Web!
            </div>
          </div>
        </div>
        <div class="ib-feedback" id="b2-feedback" style="border-left-color: #22c55e;">
          <strong>Explanation:</strong> Boom! You just told the browser: <em>"Everything inside here is web code."</em> The <code>&lt;html&gt;</code> tag is the master container. Nothing is allowed to live outside of it!
        </div>
      </section>

      <!-- BLOCK 3: Head vs Body -->
      <section class="ib-block" id="block-3">
        <div class="ib-header"><h3 class="ib-title">The Brain vs The Brawn</h3></div>
        <p>Every HTML document must be split into two pieces: The <strong>Head</strong> (Invisible Brain) and the <strong>Body</strong> (Visible Canvas). Click a zone below to send a "Visible Image" into it.</p>
        <div class="ib-workspace">
          <div class="ib-panel split-zones">
            <div class="zone head" id="b3-head-zone">&lt;head&gt; (Invisible Brain)</div>
            <div class="zone body" id="b3-body-zone">&lt;body&gt; (Visible Canvas)</div>
          </div>
          <div class="ib-panel">
            <h3>Result</h3>
            <div class="mock-browser">
              <div class="mock-tab-bar"><div class="mock-tab">Browser Tab</div></div>
              <div class="mock-viewport" id="b3-viewport" style="display:flex; justify-content:center; align-items:center;">
                <span style="color:#aaa;">Blank Page</span>
              </div>
            </div>
          </div>
        </div>
        <div class="ib-feedback" id="b3-feedback">
          <!-- Dynamically populated -->
        </div>
      </section>

      <!-- BLOCK 4: Title -->
      <section class="ib-block" id="block-4">
        <div class="ib-header"><h3 class="ib-title">Identity Crisis (The Title)</h3></div>
        <p>If the Head is invisible, what goes inside it? Hidden data! Type a title into the <code>&lt;title&gt;</code> tag and watch where it appears.</p>
        <div class="ib-workspace">
          <div class="ib-panel">
            <h3>Head Editor</h3>
            <code>
              &lt;head&gt;<br>
              &nbsp;&nbsp;&lt;title&gt;<input type="text" id="b4-input" style="background:#0f172a; color:#f8fafc; border:1px solid #475569; padding:0.2rem; width:150px;">&lt;/title&gt;<br>
              &lt;/head&gt;
            </code>
          </div>
          <div class="ib-panel">
            <h3>Browser</h3>
            <div class="mock-browser">
              <div class="mock-tab-bar"><div class="mock-tab" id="b4-tab" style="transition:0.3s;">Untilted</div></div>
              <div class="mock-viewport"></div>
            </div>
          </div>
        </div>
        <div class="ib-feedback" id="b4-feedback">
          <strong>Explanation:</strong> See that? The title never appeared on the white page. It appeared in the Browser Tab! The <code>&lt;head&gt;</code> holds Meta-Data (data about data), like SEO keywords and tab titles.
        </div>
      </section>

      <!-- BLOCK 5: DOCTYPE -->
      <section class="ib-block" id="block-5">
        <div class="ib-header"><h3 class="ib-title">Speaking the Language</h3></div>
        <p>Browsers are old. Unless you tell them you are using modern HTML, they will run in "Old Quirks Mode" and destroy your layout. Toggle the DOCTYPE pass!</p>
        <div class="ib-workspace">
          <div class="ib-panel">
            <h3>Line 1: DOCTYPE Pass</h3>
            <div class="doctype-switch">
              <label class="switch"><input type="checkbox" id="b5-toggle"><span class="slider"></span></label>
              <strong id="b5-status" style="color:#f87171;">MISSING</strong>
            </div>
            <code style="color:#aaa;">&lt;html&gt;...</code>
          </div>
          <div class="ib-panel">
            <h3>Website Layout</h3>
            <div class="mock-browser">
              <div class="mock-viewport" id="b5-viewport" style="font-family:'Times New Roman'; background:#fef3c7; border: 5px outset #d97706; padding:0.5rem;">
                <h1 style="text-align:right; font-size:1rem; margin:0;">Welcome</h1>
                <p>To my completely broken 1999 layout.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="ib-feedback" id="b5-feedback">
          <strong>Explanation:</strong> <code>&lt;!DOCTYPE html&gt;</code> isn't an HTML tag, it's an announcement! Always place it at the absolute top of the file to force the browser into Modern HTML5 Standard Mode.
        </div>
      </section>

      <!-- BLOCK 6: DOM Tree -->
      <section class="ib-block" id="block-6">
        <div class="ib-header"><h3 class="ib-title">The DOM Family Tree</h3></div></div>
        <p>Because tags wrap inside each other, they create a Family Tree (Document Object Model). Hover over the tags in the code to see their structural relationship!</p>
        <div class="ib-workspace">
          <div class="ib-panel">
            <h3>Code</h3>
            <code style="font-size: 1.1rem; line-height:1.5;">
              <span class="dom-code" data-target="html">&lt;html&gt;</span><br>
              <span class="dom-code" data-target="head">&nbsp;&nbsp;&lt;head&gt;</span><br>
              <span class="dom-code" data-target="title">&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;Page&lt;/title&gt;</span><br>
              <span class="dom-code" data-target="head">&nbsp;&nbsp;&lt;/head&gt;</span><br>
              <span class="dom-code" data-target="body">&nbsp;&nbsp;&lt;body&gt;</span><br>
              <span class="dom-code" data-target="h1">&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Hi&lt;/h1&gt;</span><br>
              <span class="dom-code" data-target="body">&nbsp;&nbsp;&lt;/body&gt;</span><br>
              <span class="dom-code" data-target="html">&lt;/html&gt;</span>
            </code>
          </div>
          <div class="ib-panel">
            <h3>DOM Tree</h3>
             <div class="dom-tree">
               <div class="dom-node" id="node-html">📁 html (Parent)
                 <div class="dom-node" id="node-head">📁 head (Child)
                   <div class="dom-node" id="node-title">📄 title (Grandchild)</div>
                 </div>
                 <div class="dom-node" id="node-body">📁 body (Child)
                   <div class="dom-node" id="node-h1">📄 h1 (Grandchild)</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
        <div class="ib-feedback" id="b6-feedback" style="display:block;">
          <strong>Concept:</strong> <code>html</code> is the ultimate parent. <code>head</code> and <code>body</code> are siblings! CSS and Javascript use this tree to style and animate specific elements.
        </div>
      </section>

      <!-- BLOCK 7: The Puzzle -->
      <section class="ib-block" id="block-7">
        <div class="ib-header"><h3 class="ib-title">The Interlocking Puzzle</h3></div>
        <p>Because HTML is a tree, you must close tags in the reverse order you opened them. Build this exact sentence by clicking the blocks in order: <strong>"&lt;p&gt;&lt;strong&gt;Bold&lt;/strong&gt;&lt;/p&gt;"</strong></p>
        <div class="ib-workspace">
          <div class="ib-panel">
            <h3>Tag Blocks</h3>
            <div class="puzzle-tags">
              <div class="p-tag" data-tag="&lt;p&gt;">&lt;p&gt;</div>
              <div class="p-tag" data-tag="&lt;strong&gt;">&lt;strong&gt;</div>
              <div class="p-tag" data-tag="Bold Text">Bold Text</div>
              <div class="p-tag" data-tag="&lt;/p&gt;">&lt;/p&gt;</div>
              <div class="p-tag" data-tag="&lt;/strong&gt;">&lt;/strong&gt;</div>
            </div>
            <button class="ib-btn btn-outline btn-sm mt-3" id="b7-reset">Reset</button>
          </div>
          <div class="ib-panel">
             <h3>Your Assembly:</h3>
             <div id="b7-assembly" style="background:#0f172a; padding:1rem; border-radius:8px; min-height:50px; font-family:monospace; font-size:1.2rem; color:#c3e88d;"></div>
          </div>
        </div>
        <div class="ib-feedback" id="b7-feedback">
          <!-- populated dynamically -->
        </div>
      </section>

      </section>

    </div>
  `,
  "codeExample": "", // We don't need code example wrapper as we have a full builder challenge next
  "challenge": {
    "instruction": "The Master Architect Challenge: Build the exact 4-part skeleton from scratch. 1. DOCTYPE, 2. html, 3. head, 4. body.",
    "startCode": "<!-- Build your structural skeleton below -->\n\n",
    "solution": "<!DOCTYPE html>\n<html>\n  <head>\n  </head>\n  <body>\n  </body>\n</html>",
    "hint": "Remember the order: First the DOCTYPE declaration. Then the <html> buns. Inside the buns, put the <head> brain first, and the <body> meat below it."
  },
  "quiz": [
    {
      "question": "Which tag acts like the 'Buns' wrapping around every single piece of content on the page?",
      "options": ["<head>", "<body>", "<html>", "<!DOCTYPE>"],
      "correct": 2
    },
    {
      "question": "Where does invisible meta-data (like the browser tab <title>) go?",
      "options": ["In the <body> tag", "In the <head> tag", "Inside a hidden <h1> tag", "Below </html>"],
      "correct": 1
    },
    {
      "question": "What is the primary purpose of <!DOCTYPE html>?",
      "options": ["It generates a website title.", "It acts as a secure password.", "It forces the browser to run in modern HTML5 standard mode.", "It closes open tags."],
      "correct": 2
    },
    {
      "question": "True or False: The <body> tag is a child of the <html> tag.",
      "options": ["True", "False"],
      "correct": 0
    }
  ],
  "onRender": function() {
    // --- Block 1 ---
    const btn1 = document.getElementById('b1-btn');
    btn1.onclick = () => {
      const val = document.getElementById('b1-input').value;
      if (!val) return;
      document.getElementById('b1-output').textContent = val;
      document.getElementById('b1-scanner').style.display = 'block';
      document.getElementById('b1-feedback').style.display = 'block';
    };

    // --- Block 2 ---
    const btn2 = document.getElementById('b2-btn');
    btn2.onclick = () => {
      const box = document.getElementById('b2-box');
      box.classList.add('active');
      box.innerHTML = `<strong>&lt;html&gt;</strong><br><br>Hello Web!<br><br><strong>&lt;/html&gt;</strong>`;
      document.getElementById('b2-feedback').style.display = 'block';
      btn2.disabled = true;
      btn2.innerHTML = '<i class="fa-solid fa-check"></i> Wrapped';
    };

    // --- Block 3 ---
    document.getElementById('b3-head-zone').onclick = () => {
      document.getElementById('b3-feedback').innerHTML = '<strong style="color:#ef4444;">Error:</strong> Visible elements DO NOT belong in the Brain! The layout breaks!';
      document.getElementById('b3-feedback').style.display = 'block';
      document.getElementById('b3-feedback').style.borderLeftColor = '#ef4444';
      document.getElementById('b3-viewport').innerHTML = '<span style="color:red; font-size:2rem;">💥 GLITCH</span>';
    };
    document.getElementById('b3-body-zone').onclick = () => {
      document.getElementById('b3-feedback').innerHTML = '<strong>Correct!</strong> The text goes in the body, and it appears safely on the screen.';
      document.getElementById('b3-feedback').style.display = 'block';
      document.getElementById('b3-feedback').style.borderLeftColor = '#22c55e';
      document.getElementById('b3-viewport').innerHTML = '<h2>Visible Image!</h2>';
    };

    // --- Block 4 ---
    const b4Input = document.getElementById('b4-input');
    b4Input.oninput = (e) => {
      document.getElementById('b4-tab').textContent = e.target.value || 'Untilted';
      if (e.target.value.length > 3) {
        document.getElementById('b4-feedback').style.display = 'block';
        document.getElementById('b4-tab').style.background = '#3b82f6';
      }
    };

    // --- Block 5 ---
    document.getElementById('b5-toggle').onchange = (e) => {
      const vp = document.getElementById('b5-viewport');
      const st = document.getElementById('b5-status');
      if (e.target.checked) {
        vp.style.fontFamily = 'Inter, sans-serif';
        vp.style.background = 'white';
        vp.style.border = '1px solid #e2e8f0';
        vp.innerHTML = '<h1 style="color:#333;">Welcome</h1><p style="color:#666;">To my perfectly clean modern layout.</p>';
        st.textContent = 'PRESENT';
        st.style.color = '#22c55e';
        document.getElementById('b5-feedback').style.display = 'block';
      } else {
        vp.style.fontFamily = "'Times New Roman'";
        vp.style.background = '#fef3c7';
        vp.style.border = '5px outset #d97706';
        vp.innerHTML = '<h1 style="text-align:right; font-size:1rem; margin:0;">Welcome</h1><p>To my completely broken 1999 layout.</p>';
        st.textContent = 'MISSING';
        st.style.color = '#f87171';
      }
    };

    // --- Block 6 ---
    document.querySelectorAll('.dom-code').forEach(el => {
      el.onmouseenter = () => {
        document.querySelectorAll('.dom-node').forEach(n => n.classList.remove('active'));
        const target = document.getElementById('node-' + el.dataset.target);
        if (target) {
          target.classList.add('active');
          if (el.dataset.target === 'html') {
             document.getElementById('node-head').classList.add('active');
             document.getElementById('node-body').classList.add('active');
          }
        }
      };
      el.onmouseleave = () => {
        document.querySelectorAll('.dom-node').forEach(n => n.classList.remove('active'));
      };
    });

    // --- Block 7 ---
    let b7Str = [];
    const b7Tgt = "<code>&lt;p&gt;</code><code>&lt;strong&gt;</code><code>Bold Text</code><code>&lt;/strong&gt;</code><code>&lt;/p&gt;</code>";
    const updateB7 = () => {
      const out = b7Str.map(s => `<code>${s.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`).join('');
      document.getElementById('b7-assembly').innerHTML = out;
      if (out === b7Tgt) {
        document.getElementById('b7-feedback').innerHTML = '<strong>Perfect Nesting!</strong> You closed the innermost tag before closing the parent tag.';
        document.getElementById('b7-feedback').style.display = 'block';
        document.getElementById('b7-feedback').style.borderLeftColor = '#22c55e';
      } else if (b7Str.length === 5) {
        document.getElementById('b7-feedback').innerHTML = '<strong style="color:#ef4444;">Invalid Nesting!</strong> Tags crossed over each other. Reset and try again! (Rule: First in, Last out)';
        document.getElementById('b7-feedback').style.display = 'block';
        document.getElementById('b7-feedback').style.borderLeftColor = '#ef4444';
      }
    };
    document.querySelectorAll('.p-tag').forEach(tag => {
      tag.onclick = (e) => {
        if (e.target.classList.contains('active')) return;
        b7Str.push(e.target.dataset.tag);
        e.target.classList.add('active');
        updateB7();
      }
    });
    document.getElementById('b7-reset').onclick = () => {
      b7Str = [];
      document.querySelectorAll('.p-tag').forEach(t => t.classList.remove('active'));
      document.getElementById('b7-feedback').style.display = 'none';
      updateB7();
    };
  }
};
