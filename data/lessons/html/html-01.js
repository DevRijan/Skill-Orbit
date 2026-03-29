window.LESSON_DATA_html_01 = {
  "id": "html-01",
  "module": "html",
  "title": "What is HTML?",
  "xp": 50,
  "theory": `
    <div class="theory-hero">
      <i class="fa-solid fa-code theory-hero-icon" style="color: #e34c26;"></i>
      <h2>Welcome to the World of Web Development</h2>
      <p>If you have ever stared at a beautiful website and wondered, <em>"How did they do that?"</em>, you are in exactly the right place. Today, you take your first and most important step to becoming a creator of the internet.</p>
    </div>

    <div class="callout callout-info" style="margin-top: 30px;">
      <i class="fa-solid fa-hand-wave"></i>
      <div>
        <strong>Take a deep breath!</strong> You do not need to be a math genius or a computer scientist to learn web development. If you can read and type, you can build websites. We are going to build your knowledge from absolute zero.
      </div>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">What Exactly is HTML?</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      HTML stands for <strong>HyperText Markup Language</strong>. Do not let that scary-sounding name intimidate you. HTML is actually not a "programming language" like Python or C++. Instead, it is a <em>markup language</em>. Let's break down exactly what that means word-by-word so you truly understand it:
    </p>

    <table style="width: 100%; border-collapse: collapse; margin: 30px 0; background: rgba(0,0,0,0.2); border-radius: 12px; overflow: hidden;">
      <thead>
        <tr style="background: rgba(255,255,255,0.05);">
          <th style="padding: 15px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1);">The Word</th>
          <th style="padding: 15px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1);">What It Actually Means</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fbbf24; font-weight: bold;">HyperText</td>
          <td style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); line-height: 1.6;">"HyperText" simply means text that contains <strong>links</strong> to other text. When you click a blue underlined word and it takes you to a different webpage, that is HyperText in action! It's how the entire "Web" is connected together.</td>
        </tr>
        <tr>
          <td style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #38bdf8; font-weight: bold;">Markup</td>
          <td style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); line-height: 1.6;">"Markup" refers to marking up raw text to give it meaning. Imagine taking a plain paper document and using a red pen to circle a sentence and write "Make this a big heading." HTML does exactly this, but using special computer codes called <em>tags</em>.</td>
        </tr>
        <tr>
          <td style="padding: 15px; color: #a3e635; font-weight: bold;">Language</td>
          <td style="padding: 15px; line-height: 1.6;">Because it has specific rules, grammar, and vocabulary that web browsers understand, it's considered a strict language.</td>
        </tr>
      </tbody>
    </table>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">The Ultimate Analogy: Building a House</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
      Every website on the internet is built using three core technologies. To understand where HTML fits in, you need to understand the relationship between HTML, CSS, and JavaScript. The best way to visualize this is by comparing a website to building a house.
    </p>

    <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 25px; margin: 30px 0;">
      <div style="display: flex; gap: 30px; align-items: center; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <h3 style="color: #fbbf24; margin-top: 0; font-size: 1.4rem;">
            <i class="fa-solid fa-trowel-bricks" style="margin-right: 10px;"></i>
            HTML is the Structure (The Bricks)
          </h3>
          <p style="margin-bottom: 25px; line-height: 1.7; color: #cbd5e1;">
            HTML is the foundation, walls, doors, and rooms of your house. It tells the browser, "This is a wall," or "This over here is a doorway." It creates the absolute raw structure of your webpage. Without HTML, there is no website.
          </p>
          
          <h3 style="color: #38bdf8; margin-top: 0; font-size: 1.4rem;">
            <i class="fa-solid fa-paint-roller" style="margin-right: 10px;"></i>
            CSS is the Presentation (The Paint)
          </h3>
          <p style="margin-bottom: 25px; line-height: 1.7; color: #cbd5e1;">
            If we only had HTML, our house would just be ugly gray concrete walls. <strong>CSS</strong> (Cascading Style Sheets) steps in to add beautiful colors, wallpapers, customized layouts, and fancy fonts. CSS makes the house visually stunning.
          </p>

          <h3 style="color: #facc15; margin-top: 0; font-size: 1.4rem;">
            <i class="fa-solid fa-bolt" style="margin-right: 10px;"></i>
            JavaScript is the Behavior (The Electricity)
          </h3>
          <p style="margin-bottom: 0; line-height: 1.7; color: #cbd5e1;">
            A beautiful house is useless if the lights don't turn on when you flick a switch. <strong>JavaScript</strong> provides the plumbing, electricity, and interactivity—making elements clickable, fetching live data, and handling user inputs.
          </p>
        </div>
      </div>
    </div>

    <div class="callout callout-warning" style="margin: 30px 0;">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <strong>Crucial Takeaway:</strong> HTML's <em>only</em> job is to define structure and meaning. It is not responsible for making things look pretty! We will learn how to make websites look beautiful later using CSS. For now, focus entirely on structure.
      </div>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">How Do We Write HTML? (Meet the Tags)</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      HTML works by using things called <strong>Tags</strong>. A tag acts like a container that wraps around your text to give it special meaning.
    </p>

    <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
      If you want the browser to display a big bold heading, you don't just type the text. You have to "wrap" the text inside an HTML <code>&lt;h1&gt;</code> tag (which stands for Heading Level 1).
    </p>

    <div style="background: #1e1e2e; border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05);">
      <h3 style="color: #a6accd; font-size: 1.2rem; margin-top: 0; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 2px;">The Anatomy of an HTML Tag</h3>
      
      <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 15px; font-family: 'Fira Code', monospace; font-size: 1.8rem;">
        <span style="color: #fca7ea; background: rgba(252, 167, 234, 0.1); padding: 5px 15px; border-radius: 8px; border: 1px solid rgba(252, 167, 234, 0.3);">&lt;h1&gt;</span>
        <span style="color: #c3e88d; font-weight: bold;">My Awesome Website</span>
        <span style="color: #fca7ea; background: rgba(252, 167, 234, 0.1); padding: 5px 15px; border-radius: 8px; border: 1px solid rgba(252, 167, 234, 0.3);">&lt;/h1&gt;</span>
      </div>
      
      <div style="display: flex; justify-content: center; gap: 30px; margin-top: 25px; text-align: center;">
        <div style="width: 150px;">
          <div style="color: #89ddff; font-size: 1.5rem; margin-bottom: 10px;">↑</div>
          <strong style="color: #89ddff; display: block; font-size: 1.1rem;">Opening Tag</strong>
          <span style="color: #676e95; font-size: 0.85rem; display: block; margin-top: 8px; line-height: 1.4;">Tells the browser: "The heading starts precisely here."</span>
        </div>
        
        <div style="width: 150px;">
          <div style="color: #c3e88d; font-size: 1.5rem; margin-bottom: 10px;">↑</div>
          <strong style="color: #c3e88d; display: block; font-size: 1.1rem;">The Content</strong>
          <span style="color: #676e95; font-size: 0.85rem; display: block; margin-top: 8px; line-height: 1.4;">The actual visible text your visitors will read on the screen.</span>
        </div>
        
        <div style="width: 150px;">
          <div style="color: #f07178; font-size: 1.5rem; margin-bottom: 10px;">↑</div>
          <strong style="color: #f07178; display: block; font-size: 1.1rem;">Closing Tag</strong>
          <span style="color: #676e95; font-size: 0.85rem; display: block; margin-top: 8px; line-height: 1.4;">Has a forward slash <b>/</b>. Tells the browser: "The heading is over now."</span>
        </div>
      </div>
    </div>

    <p style="font-size: 1.1rem; line-height: 1.8;">
      Notice the forward slash ( <code>/</code> ) in the closing tag? That is incredibly important! It is the only visual difference between opening and closing tags. If you forget the forward slash, the browser will think your entire website is one giant, never-ending heading.
    </p>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">What Happens Behind the Scenes?</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      Browsers like Google Chrome, Safari, and Firefox are essentially translators. Their sole purpose in life is to read HTML documents and translate them into visual interfaces that humans can interact with. 
    </p>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      When you open a website, your browser secretly reads all of the invisible HTML tags behind the scenes. It completely hides the <code>&lt;h1&gt;</code> tags from your screen and uses them purely as instructions to format the text inside them. 
    </p>

    <div class="callout callout-tip" style="margin-top: 30px;">
      <i class="fa-solid fa-lightbulb"></i>
      <div>
        <strong>You can peek behind the curtain!</strong> Want proof? Go to any website (like Google or YouTube), right-click anywhere on the blank background, and click <strong>"View Page Source"</strong>. You will see thousands of lines of raw HTML code that builds that very page! Every website works exactly the same way.
      </div>
    </div>
  `,
  "codeExample": "<!-- This is a very simple HTML document -->\n<!-- Click 'Try it' to see how the browser renders it! -->\n\n<h1>Welcome to my amazing website!</h1>\n\n<p>This is my very first paragraph. HTML is actually quite simple once you get the hang of opening and closing tags.</p>\n\n<p>Notice how the browser automatically adds space between paragraphs? That is the magic of HTML building our structure automatically.</p>",
  "challenge": {
    "instruction": "Your turn! Write an opening <p> tag, type the exact phrase 'I am learning to speak to computers!', and then close it with a </p> tag.",
    "startCode": "<!-- Write your paragraph below this line! -->\n",
    "solution": "<p>I am learning to speak to computers!</p>",
    "hint": "Remember the anatomy: <p> goes first, then the text 'I am learning to speak to computers!', then the closing </p>. Don't forget the forward slash in the closing tag!"
  },
  "quiz": [
    {
      "question": "If web development is like building a house, what does HTML represent?",
      "options": [
        "The interior paint and decorations (CSS)",
        "The electricity and plumbing (JavaScript)",
        "The raw structural bricks, walls, and foundation",
        "The land the house is built on"
      ],
      "correct": 2
    },
    {
      "question": "What is the crucial difference between an Opening Tag and a Closing Tag?",
      "options": [
        "Closing tags must be written in ALL CAPS.",
        "Closing tags contain a forward slash (/) immediately after the opening angle bracket.",
        "Opening tags are blue, but closing tags are red.",
        "Only closing tags use angle brackets (< and >)."
      ],
      "correct": 1
    },
    {
      "question": "What does a Web Browser (like Chrome or Firefox) actually do with HTML tags?",
      "options": [
        "It hides the tags from the user and uses them as invisible instructions to format the webpage.",
        "It prints the exact tags out on the screen for the user to read.",
        "It deletes all the tags completely to save memory.",
        "It converts the HTML tags into secure passwords."
      ],
      "correct": 0
    }
  ]
};
