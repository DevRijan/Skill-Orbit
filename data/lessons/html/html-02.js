window.LESSON_DATA_html_02 = {
  "id": "html-02",
  "module": "html",
  "title": "HTML Code Editors",
  "xp": 45,
  "theory": `
    <div class="theory-hero">
      <i class="fa-solid fa-laptop-code theory-hero-icon" style="color: #60a5fa;"></i>
      <h2>Where Do We Actually Type The Code?</h2>
      <p>Now that you know what HTML is, the most logical next question is: <em>"Where do I actually type these tags?"</em> In this lesson, we will explore the software required to write code and the secret superpowers professional developers use.</p>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">The Surprising Truth About Writing HTML</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      Here is an industry secret that surprises most beginners: <strong>You do not need to buy any special software to write HTML.</strong> HTML code is nothing more than pure, unformatted text.
    </p>

    <div class="callout callout-info" style="margin: 30px 0;">
      <i class="fa-solid fa-file-lines"></i>
      <div>
        <strong>Did You Know?</strong> You could write an award-winning website using the free "Notepad" app on Windows, or the free "TextEdit" app on a Mac. Literally any program that lets you type letters can create a webpage!
      </div>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">Why Can't I Just Use Microsoft Word?</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      If you can use any typing program, why don't developers just use Microsoft Word or Google Docs? Because those programs are <strong>Word Processors</strong>, not Text Editors.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin: 30px 0; background: rgba(0,0,0,0.2); border-radius: 12px; overflow: hidden;">
      <thead>
        <tr style="background: rgba(255,255,255,0.05);">
          <th style="padding: 15px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1); width: 50%;">Word Processors (Like MS Word)</th>
          <th style="padding: 15px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1); width: 50%;">Text Editors (Like Notepad)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); border-right: 1px solid rgba(255,255,255,0.1); vertical-align: top;">
            <p style="margin: 0 0 10px 0;">They secretly save massive amounts of invisible "formatting code" behind your text (font sizes, bolding formatting, margin data).</p>
            <p style="margin: 0; color: #f87171;"><strong>Web browsers cannot read this hidden formatting data!</strong> They strictly expect raw text.</p>
          </td>
          <td style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: top;">
            <p style="margin: 0 0 10px 0;">They save <em>only</em> the pure characters you type on the keyboard without adding any hidden styling data.</p>
            <p style="margin: 0; color: #4ade80;"><strong>This creates a perfectly pure .txt or .html file</strong> that the browser can seamlessly understand.</p>
          </td>
        </tr>
      </tbody>
    </table>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">Enter the Professional "Code Editors"</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      While you <em>could</em> use a basic Text Editor, doing so would be like a professional carpenter trying to build a skyscraper with a pocket knife. Instead, developers use specialized text editors explicitly designed for programming, known as <strong>Code Editors</strong> or IDEs (Integrated Development Environments).
    </p>

    <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
      The most popular free code editor in the world right now is <strong>Visual Studio Code (VS Code)</strong> by Microsoft. Code Editors give developers vital "superpowers" to write code faster and stop them from making silly mistakes. 
    </p>

    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 30px 0;">
      <div style="flex: 1; min-width: 250px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 20px;">
        <h4 style="color: #38bdf8; margin-top: 0; font-size: 1.2rem;"><i class="fa-solid fa-palette"></i> Syntax Highlighting</h4>
        <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 0;">Instead of displaying boring black and white text, the editor paints your HTML tags neon pink, your text yellow, and your links green. This makes spotting errors incredibly easy on the eyes.</p>
      </div>
      
      <div style="flex: 1; min-width: 250px; background: rgba(163, 230, 53, 0.1); border: 1px solid rgba(163, 230, 53, 0.3); border-radius: 12px; padding: 20px;">
        <h4 style="color: #a3e635; margin-top: 0; font-size: 1.2rem;"><i class="fa-solid fa-wand-magic-sparkles"></i> Auto-Completion</h4>
        <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 0;">When you type the opening <code>&lt;h1&gt;</code> bracket, a smart editor will instantly inject the closing <code>&lt;/h1&gt;</code> tag for you automatically before you even press a key, saving you millions of keystrokes!</p>
      </div>
      
      <div style="flex: 1; min-width: 250px; background: rgba(251, 146, 60, 0.1); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 12px; padding: 20px;">
        <h4 style="color: #fb923c; margin-top: 0; font-size: 1.2rem;"><i class="fa-solid fa-bug"></i> Error Detection</h4>
        <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 0;">Did you accidentally forget the slash in a closing tag? The editor will instantly underline your mistake in a squiggly red line, exactly like the spellcheck in MS Word.</p>
      </div>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">The Skill-Orbit Code Space</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      To save you from having to download and set up complex software right now, we have embedded a professional-grade Code Editor directly into your browser! The editor panel waiting for you in the Challenge section below has Syntax Highlighting and Auto-Completion already activated. 
    </p>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      Whenever you are ready to experiment on your own computer, we highly recommend downloading <strong>Visual Studio Code</strong> for free on your PC or Mac!
    </p>

    <div class="callout callout-warning" style="margin-top: 30px;">
      <i class="fa-solid fa-shield-halved"></i>
      <div>
        <strong>The Golden Rule of Saving Files:</strong> When saving an HTML file on your own computer, you must forcefully end the file name with the extension <code>.html</code> (for example: <em>index.html</em>). If you save it as a <em>.txt</em> file, your computer will just open it as boring text instead of opening it with your web browser. This <em>.html</em> extension is what signals your computer to render the website!
      </div>
    </div>
  `,
  "codeExample": "<!-- This snippet demonstrates what code highlighting looks like! -->\n<html>\n  <head>\n    <!-- Headings give metadata, not shown on the page -->\n  </head>\n  <body>\n    <!-- Notice how different colors are assigned to tags vs raw text -->\n    <h1>The power of colors!</h1>\n    <p>Writing code is significantly easier when the code editor highlights different parts of your markup with distinct neon colors.</p>\n  </body>\n</html>",
  "challenge": {
    "instruction": "Let's explore the Editor! In the box below, type an opening <p> tag. Notice how the editor colors it differently.",
    "startCode": "<!-- Below this comment, type a <p> tag and write 'I love Code Editors!' -->\n",
    "solution": "<p>I love Code Editors!</p>",
    "hint": "Just like the last lesson, use <p>I love Code Editors!</p>. The focus here is to observe how the editor's text changes color when you type correctly formed HTML."
  },
  "quiz": [
    {
      "question": "Why is it a terrible idea to use Microsoft Word or Google Docs to write HTML?",
      "options": [
        "Because they cost money, while code editors are free.",
        "Because they secretly embed hidden formatting data which crashes web browsers expecting pure text.",
        "Because Microsoft Word does not support the '<' and '>' characters on the keyboard.",
        "Because they automatically translate English into Spanish."
      ],
      "correct": 1
    },
    {
      "question": "What is the crucial file extension requirement when saving an HTML file on your computer?",
      "options": [
        "It must be saved as a .pdf so it cannot be edited by hackers.",
        "It must be saved as a .vbs file to run security checks.",
        "It must be saved with the .html extension (e.g., website.html) so the computer knows to open it with a web browser.",
        "It must end in .txt so it saves as pure text."
      ],
      "correct": 2
    },
    {
      "question": "Which of the following is considered a 'superpower' feature of modern Code Editors?",
      "options": [
        "They automatically design the website graphics for you.",
        "They will write all of your JavaScript logic if you ask nicely.",
        "They provide 'Syntax Highlighting', painting tags vs text in different colors for easy readability.",
        "They instantly publish your code to Google."
      ],
      "correct": 2
    }
  ]
};
