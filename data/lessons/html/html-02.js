window.LESSON_DATA_html_02 = {
  "id": "html-02",
  "module": "html",
  "title": "HTML Code Editors",
  "xp": 45,
  "theory": "",
  "interactive_steps": [
    {
      "type": "interaction",
      "hook": "Before we write more HTML, what special software do you think is absolutely required to buy to build a website?",
      "interactionType": "multiple-choice",
      "options": ["An expensive programming license", "Microsoft Word", "None! Any basic app like 'Notepad' works"],
      "correctIndex": 2,
      "explanation": {
        "intuition": "You don't need any special software! HTML is nothing more than pure, unformatted text. If a program lets you type letters, you can build a webpage.",
        "mechanism": "A web browser natively understands plain text files. It doesn't care what app you used to type the text.",
        "code": "<!-- Written in a basic free Notepad app! -->\n<h1>No fancy software required</h1>"
      },
      "visualExample": "<h1>No fancy software required</h1>"
    },
    {
      "type": "interaction",
      "hook": "If we can use any typing program, why can't we just use Microsoft Word or Google Docs to type our HTML?",
      "interactionType": "multiple-choice",
      "options": ["They secretly embed invisible formatting codes that break web browsers.", "They do not allow you to type '<' and '>' characters properly."],
      "correctIndex": 0,
      "explanation": {
        "intuition": "Word processors are designed to print beautiful pages. They secretly save margin sizes, font choices, and bold styles behind your text.",
        "mechanism": "Browsers expect 100% pure text. When they encounter Microsoft Word's hidden formatting data, they fail to read your HTML tags properly.",
        "code": "<!-- What a Word Processor actually saves behind the scenes (simplified) -->\n{\\rtf1\\ansi\\ansicpg1252\\deff0{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}}\n<h1>My Website</h1>}"
      },
      "visualExample": "<div style='color:red; font-family:monospace; padding:10px; border:1px solid red; background:#ffebeb;'>ERROR: Unrecognized file formatting data detected by browser!</div>"
    },
    {
      "type": "interaction",
      "hook": "Instead of Notepad, professional developers use specialized 'Code Editors' (like VS Code). Why?",
      "interactionType": "multiple-choice",
      "options": ["They automatically write websites for you using AI.", "They provide 'Syntax Highlighting' and 'Auto-Completion' to code faster with fewer typos."],
      "correctIndex": 1,
      "explanation": {
        "intuition": "It's like giving a carpenter an electric saw instead of a pocket knife. They give developers superpowers to stop silly typos.",
        "mechanism": "A Code Editor actively analyzes your file. It paints tags neon pink and text white (Syntax Highlighting), and automatically injects closing tags the moment you type an opening tag.",
        "code": "<!-- In an editor, tags are vividly colored so you spot missing slashes immediately -->\n<h1 style=\"color: #f472b6;\">Hello from a Code Editor!</h1>"
      },
      "visualExample": "<h1 style=\"color: #f472b6; text-shadow: 0 0 10px rgba(244,114,182,0.5);\">Hello from a Code Editor!</h1>"
    },
    {
      "type": "interaction",
      "hook": "The Golden Rule: When saving your plain text file on your computer, what MUST you name the file so it actually opens as a website?",
      "interactionType": "multiple-choice",
      "options": ["website.vbs", "my_website.txt", "my_website.html"],
      "correctIndex": 2,
      "explanation": {
        "intuition": "The file extension is a direct signal to your computer system about what the file is supposed to do.",
        "mechanism": "Saving as '.txt' tells your computer to open a boring text reader. Saving forcefully with the '.html' extension signals the Operating System to boot up the Chrome/Safari browser to render it.",
        "code": "<!-- Correct File Name: index.html -->\n<h1>My First Real Website</h1>"
      },
      "visualExample": "<h1>My First Real Website <i class=\"fa-brands fa-html5\" style=\"color:#e34c26;\"></i></h1>"
    }
  ],
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
    },
    {
      "question": "What is VS Code?",
      "options": [
        "A popular web browser",
        "A popular free code editor built by Microsoft",
        "A premium word processor",
        "A programming language"
      ],
      "correct": 1
    },
    {
      "question": "Can you write HTML using the default Notepad application on Windows?",
      "options": [
        "Yes, any plain text editor can write HTML.",
        "No, HTML requires a paid license.",
        "Yes, but the browser will break it.",
        "No, Notepad cannot save text files."
      ],
      "correct": 0
    }
  ]
};
