window.LESSON_DATA_html_03 = {
  "id": "html-03",
  "module": "html",
  "title": "HTML Document Structure",
  "xp": 55,
  "theory": `
    <div class="theory-hero">
      <i class="fa-solid fa-layer-group theory-hero-icon" style="color: #c084fc;"></i>
      <h2>The Mandatory Blueprint of Every Webpage</h2>
      <p>Imagine trying to build a car by randomly attaching wheels to a steering wheel, tossing in an engine, and hoping it drives. It would fail instantly. Just like a car needs a specific chassis to hold everything together, an HTML document follows a strict, mandatory "parent-child" structure. If you miss one crucial part of this blueprint, the browser will be completely confused.</p>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">The Unbreakable Foundation</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      Before you can type a single visible word on your website, you are legally required (by the browser codes) to build out the foundational "Skeleton". Every professional HTML file on earth starts with these exact four key blocks. Memorize them, write them down, dream about them!
    </p>

    <div style="background: rgba(15, 23, 42, 0.6); border-radius: 16px; margin: 30px 0; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
      <div style="padding: 20px; font-family: monospace; font-size: 1.2rem; background: #1e1e2e; color: #a6accd; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <span style="color: #f07178;">&lt;!DOCTYPE html&gt;</span><br>
        <span style="color: #89ddff;">&lt;html&gt;</span><br>
        &nbsp;&nbsp;<span style="color: #c3e88d;">&lt;head&gt;</span><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;My Site TITLE&lt;/title&gt;<br>
        &nbsp;&nbsp;<span style="color: #c3e88d;">&lt;/head&gt;</span><br>
        &nbsp;&nbsp;<span style="color: #fca7ea;">&lt;body&gt;</span><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;My Visible TEXT&lt;/h1&gt;<br>
        &nbsp;&nbsp;<span style="color: #fca7ea;">&lt;/body&gt;</span><br>
        <span style="color: #89ddff;">&lt;/html&gt;</span>
      </div>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <div class="analogy-box" style="background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 12px; padding: 30px; margin: 40px 0;">
      <div class="analogy-header" style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
        <i class="fa-solid fa-burger" style="font-size: 2rem; color: #fbbf24;"></i>
        <h3 style="margin: 0; color: #fbbf24; font-size: 1.8rem; text-transform: uppercase; letter-spacing: 1px;">The Gourmet Burger Analogy</h3>
      </div>
      <p style="font-size: 1.1rem; line-height: 1.8;">Think of an HTML document exactly like building a massive, delicious <strong>Gourmet Burger</strong>:</p>
      
      <div style="margin-top: 25px;">
        <div style="display: flex; gap: 20px; margin-bottom: 20px; align-items: flex-start;">
          <div style="font-size: 2rem; color: #fb923c;"><i class="fa-solid fa-bread-slice"></i></div>
          <div>
            <h4 style="margin: 0 0 5px 0; color: #fb923c; font-size: 1.3rem;">1. <code>&lt;html&gt;</code> (The Buns)</h4>
            <p style="margin: 0; line-height: 1.6; color: #cbd5e1;">It wraps everything together. The <code>&lt;html&gt;</code> tag is the top bun, and <code>&lt;/html&gt;</code> is the bottom bun. If anything falls out of the buns, it isn't part of the burger. This is called the <strong>Root Element</strong>, and 100% of your website must go between these two buns.</p>
          </div>
        </div>

        <div style="display: flex; gap: 20px; margin-bottom: 20px; align-items: flex-start;">
          <div style="font-size: 2rem; color: #a3e635;"><i class="fa-solid fa-brain"></i></div>
          <div>
            <h4 style="margin: 0 0 5px 0; color: #a3e635; font-size: 1.3rem;">2. <code>&lt;head&gt;</code> (The Brain & Secret Recipe)</h4>
            <p style="margin: 0; line-height: 1.6; color: #cbd5e1;">You don't "see" the Head inside the burger, but it contains all the vital instructions. The Head holds things that are completely <strong>Invisible</strong> to the user on the page—like the page <code>&lt;title&gt;</code> that shows up in the browser tab, secret SEO keywords for Google to read, and links to your CSS paint cans.</p>
          </div>
        </div>

        <div style="display: flex; gap: 20px; align-items: flex-start;">
          <div style="font-size: 2rem; color: #f87171;"><i class="fa-solid fa-drumstick-bite"></i></div>
          <div>
            <h4 style="margin: 0 0 5px 0; color: #f87171; font-size: 1.3rem;">3. <code>&lt;body&gt;</code> (The Meat & Fillings)</h4>
            <p style="margin: 0; line-height: 1.6; color: #cbd5e1;">This is the part you actually see, bite into, and interact with! <strong>100% of the visible web page lives inside the Body.</strong> If you want a user to read a sentence, click a button, or look at a picture, it MUST go between the <code>&lt;body&gt;</code> and <code>&lt;/body&gt;</code> tags.</p>
          </div>
        </div>
      </div>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">What on Earth is <code>&lt;!DOCTYPE html&gt;</code>?</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      You may have noticed that very weird line at the very top of our code example: <code>&lt;!DOCTYPE html&gt;</code>. 
    </p>

    <div class="callout callout-info" style="margin: 25px 0;">
      <i class="fa-solid fa-bullhorn"></i>
      <div>
        <strong>It is NOT a tag!</strong> It doesn't have a closing tag. It is practically screaming an announcement to the browser. It translates to: <em>"Hey Browser! I am not an ancient text file from 1999! I am a modern HTML5 document. Please prepare to render my awesome new code rules!"</em>
      </div>
    </div>

    <p style="font-size: 1.1rem; line-height: 1.8;">
      Without this tiny, one-line declaration on line #1, some strict browsers might enter "Quirks Mode" and render your beautiful website like a broken geocities page from twenty years ago. Always include it!
    </p>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <div class="callout callout-warning" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-left: 5px solid #ef4444; margin: 40px 0;">
      <i class="fa-solid fa-skull-crossbones" style="color: #ef4444; font-size: 1.5rem;"></i>
      <div>
        <strong style="color: #fca5a5; font-size: 1.2rem; display: block; margin-bottom: 8px;">The Ultimate Rookie Mistake</strong>
        <p style="margin: 0; line-height: 1.6; color: rgba(255,255,255,0.9);">Never, ever, EVER place visible tags like <code>&lt;h1&gt;</code> headings or <code>&lt;img&gt;</code> images inside the <code>&lt;head&gt;</code>. They explicitly belong inside the <code>&lt;body&gt;</code>! If you mix up the brain and the meat, your browser will try to forcefully fix it or your website layout will violently break.</p>
      </div>
    </div>
  `,
  "codeExample": "<!-- Line 1: The Declaration! -->\n<!DOCTYPE html>\n\n<!-- The Top Bun! -->\n<html>\n\n  <!-- The Brain! -->\n  <head>\n    <!-- The title below shows up in the browser tab! -->\n    <title>My Cool Page Title</title>\n  </head>\n\n  <!-- The Meat! (Everything we actually see onscreen) -->\n  <body>\n    <h1>Welcome to the Body Zone!</h1>\n    <p>Everything in here is visible to the user.</p>\n  </body>\n\n<!-- The Bottom Bun! -->\n</html>",
  "challenge": {
    "instruction": "I have provided the DOCTYPE and the <html> buns. You need to structure the inside! Create the <head> tags and inside them put a <title> tag with the text 'My First Blueprint'. Below the head, create the <body> tags and inside them put an <h1> that says 'Structure Completed!'.",
    "startCode": "<!DOCTYPE html>\n<html>\n  <!-- Build the Brain (head) here -->\n\n  \n  <!-- Build the Meat (body) here -->\n\n\n</html>",
    "startCSS": "body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; background: #0f172a; color: white; font-family: system-ui; } h1 { font-size: 3rem; background: linear-gradient(90deg, #c084fc, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }",
    "solution": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Blueprint</title>\n  </head>\n  <body>\n    <h1>Structure Completed!</h1>\n  </body>\n</html>",
    "hint": "Check the theory example! <head> title goes inside </head>. Then <body> h1 goes inside </body>."
  },
  "quiz": [
    {
      "question": "Which tag acts like the 'Buns' of the burger, wrapping around every single piece of content on the page?",
      "options": [
        "<head>",
        "<body>",
        "<html>",
        "<!DOCTYPE>"
      ],
      "correct": 2
    },
    {
      "question": "Where do you put information that is strictly invisible on the webpage itself (like the Document Title for the browser tab)?",
      "options": [
        "In the <body> tag",
        "In the <head> tag",
        "Inside a hidden <h1> tag",
        "At the very bottom below </html>"
      ],
      "correct": 1
    },
    {
      "question": "What is the primary purpose of the <!DOCTYPE html> declaration at the very top of line 1?",
      "options": [
        "It generates a document title automatically.",
        "It acts as a secure password to edit the code.",
        "It loudly tells the browser: 'Prepare yourself, this is a modern HTML5 document!'",
        "It closes all open tags."
      ],
      "correct": 2
    },
    {
      "question": "According to the lesson, what happens if you place visible tags like <h1> inside the <head>?",
      "options": [
        "It acts as a secret title.",
        "The browser ignores it completely.",
        "The text becomes bold automatically.",
        "The browser gets confused and the website layout may break."
      ],
      "correct": 3
    },
    {
      "question": "What is the 'Root Element' that acts as the top and bottom buns wrapping the entire blueprint?",
      "options": [
        "<body>",
        "<head>",
        "<html>",
        "<!DOCTYPE>"
      ],
      "correct": 2
    }
  ]
};
