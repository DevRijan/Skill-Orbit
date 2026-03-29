window.LESSON_DATA_html_02 = {
  "id": "html-02",
  "module": "html",
  "title": "HTML Document Structure",
  "xp": 20,
  "theory": "<h2>HTML Document Structure</h2><p>Every HTML page follows a standard structure. Understanding this structure is essential before writing any HTML.</p><h2>The Key Parts</h2><p><code>&lt;!DOCTYPE html&gt;</code> — Tells the browser this is an HTML5 document.</p><p><code>&lt;html&gt;</code> — The root element that wraps all content.</p><p><code>&lt;head&gt;</code> — Contains meta information (title, links to CSS, etc.) not shown on the page.</p><p><code>&lt;title&gt;</code> — Sets the browser tab title.</p><p><code>&lt;body&gt;</code> — Contains all visible content displayed in the browser.</p>",
  "codeExample": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Page Title</title>\n  </head>\n  <body>\n    <h1>Welcome to my page!</h1>\n  </body>\n</html>",
  "challenge": {
    "instruction": "Write a complete HTML document with a title tag set to 'My Portfolio' and an h1 heading that says 'Hello, I am a developer!'",
    "startCode": "<!DOCTYPE html>\n<html>\n  <head>\n    <!-- Add your title here -->\n  </head>\n  <body>\n    <!-- Add your heading here -->\n  </body>\n</html>",
    "startCSS": "",
    "solution": "<title>My Portfolio</title>",
    "hint": "Use <title>My Portfolio</title> inside <head>, and <h1>Hello, I am a developer!</h1> inside <body>."
  },
  "quiz": [
    {
      "question": "Where should the <title> tag be placed?",
      "options": ["Inside <body>", "Inside <head>", "Inside <html>", "Inside <p>"],
      "correct": 1
    },
    {
      "question": "What does <!DOCTYPE html> do?",
      "options": [
        "Applies CSS styling",
        "Declares the document as HTML5",
        "Creates a paragraph",
        "Links to a stylesheet"
      ],
      "correct": 1
    }
  ]
};
