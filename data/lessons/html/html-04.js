window.LESSON_DATA_html_04 = {
  "id": "html-04",
  "module": "html",
  "title": "HTML Elements",
  "xp": 40,
  "theory": "",
  "interactive_steps": [
    {
      "type": "interaction",
      "hook": "Many beginners confuse 'Tags' and 'Elements'. If `<h1>` is just a 'Start Tag', which of the following is considered a fully complete HTML Element?",
      "interactionType": "multiple-choice",
      "options": ["</h1>", "<h1>Welcome!</h1>", "Welcome!"],
      "correctIndex": 1,
      "explanation": {
        "intuition": "An HTML Element is the entire package from the Start Tag to the End Tag, including everything physically inside it.",
        "mechanism": "The browser reads the Start Tag, the content, and the End Tag together as a single structural component (Element) on the screen.",
        "code": "<!-- Start Tag => Content => End Tag -->\n<button>Click Me</button>"
      },
      "visualExample": "<button style='padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;'>Click Me</button>"
    },
    {
      "type": "interaction",
      "hook": "HTML elements almost always contain other elements inside them, like Russian dolls. What is the golden 'First In, Last Out' rule for nesting?",
      "interactionType": "multiple-choice",
      "options": ["The most recently opened tag MUST be closed first.", "Close them in random order.", "Close the outermost tag first."],
      "correctIndex": 0,
      "explanation": {
        "intuition": "Imagine nesting physical boxes. You must close the inner box before you can close the outer box.",
        "mechanism": "If you open a `<p>` and then an `<u>` (underline), the browser creates a strict parent-child tree. You must close `</u>` before `</p>` to prevent tag criss-crossing.",
        "code": "<!-- Correct Nesting -->\n<p>This is <u>underlined</u> text.</p>\n\n<!-- Wrong Nesting (Chaos) -->\n<p>This is <u>underlined</p> text.</u>"
      },
      "visualExample": "<p style='margin:0; font-family: sans-serif;'>This is <u style='text-decoration: underline; text-decoration-color: #3b82f6; text-decoration-thickness: 2px;'>underlined</u> text.</p>"
    },
    {
      "type": "interaction",
      "hook": "There is a weird exception in HTML: 'Empty Elements'. These don't wrap around text, so they don't have a closing tag. Which of these is an empty element?",
      "interactionType": "multiple-choice",
      "options": ["<p> (Paragraph)", "<hr> (Horizontal Line)", "<html> (The Document)"],
      "correctIndex": 1,
      "explanation": {
        "intuition": "Some elements just drop a physical object on the screen rather than wrapping around text. A Horizontal Rule is just a line across the screen.",
        "mechanism": "Because `<hr>` (Horizontal Rule) or `<br>` (Line Break) have no content to wrap, the browser doesn't need a closing tag to know when they end.",
        "code": "<p>Section 1 text here...</p>\n<!-- Drops a line completely across the screen -->\n<hr>\n<p>Section 2 text here...</p>"
      },
      "visualExample": "<div style='font-family:sans-serif; width: 100%; border: 1px dashed #cbd5e1; padding: 10px;'><p style='margin:0;'>Section 1 text here...</p><hr style='border:none; border-top: 2px solid #3b82f6; margin: 10px 0;'><p style='margin:0;'>Section 2 text here...</p></div>"
    },
    {
      "type": "interaction",
      "hook": "Is HTML strictly case-sensitive? Will your site crash if you write `<P>` instead of `<p>`?",
      "interactionType": "multiple-choice",
      "options": ["Yes, it will instantly crash.", "No, but lowercase is highly recommended.", "Yes, uppercase tags generate formatting errors."],
      "correctIndex": 1,
      "explanation": {
        "intuition": "HTML is surprisingly forgiving and doesn't explicitly care, but the global community of developers (W3C) agreed to use all lowercase.",
        "mechanism": "Browsers automatically normalize tags internally, but adhering to lowercase prevents messy codebases and confusing syntax highlighting.",
        "code": "<!-- Both work, but the lowercase version is the professional standard -->\n<P>Uppercase</P>\n<p>Lowercase Standard</p>"
      },
      "visualExample": "<div style='font-family:sans-serif;'><div style='color:#ef4444; border-bottom:1px solid #ef4444; margin-bottom:5px;'>Uppercase</div><div style='color:#10b981; border-bottom:1px solid #10b981;'>Lowercase Standard</div></div>"
    }
  ],
  "codeExample": "<!DOCTYPE html>\n<html>\n  <body>\n    <!-- Standard complete elements -->\n    <h1>The Importance of Elements</h1>\n    \n    <p>\n      This paragraph contains a <b>bolded</b> word to demonstrate what nesting looks like! \n      The <b> tags are fully enclosed.\n    </p>\n\n    <!-- An Empty Element standalone! -->\n    <hr>\n\n    <p>\n      This line ends abruptly.<br>\n      And this continues on the line below thanks to the break tag!\n    </p>\n  </body>\n</html>",
  "challenge": {
    "instruction": "Create an h2 element with the text 'My Daily Plan'. Below it, drop a horizontal rule <hr>. Below the rule, write a paragraph: 'Wake up.<br>Write Code.' Use the <br> tag exactly in the middle of those two sentences to force a new line!",
    "startCode": "<!DOCTYPE html>\n<html>\n  <body>\n    <!-- Write your code below! -->\n\n\n  </body>\n</html>",
    "solution": "<h2>My Daily Plan</h2>\n<hr>\n<p>Wake up.<br>Write Code.</p>",
    "hint": "Check the theory example! Create the <h2>, then drop an <hr> alone on the next line. Finally make a <p> that has a <br> right in the middle: <p>Wake up.<br>Write Code.</p>"
  },
  "quiz": [
    {
      "question": "What specifically is meant by 'Nesting' in HTML?",
      "options": [
        "Placing an HTML element entirely inside of another HTML element.",
        "Putting birds on a webpage.",
        "Using spaces to indent your code on the left side.",
        "Combining HTML, CSS, and JavaScript into a single massive file."
      ],
      "correct": 0
    },
    {
      "question": "Which of the following is considered an 'Empty Element' that does NOT wrap text and does NOT have a closing tag?",
      "options": [
        "<p> (Paragraph)",
        "<html> (The Buns)",
        "<hr> (Horizontal Rule)",
        "<b> (Bold)"
      ],
      "correct": 2
    },
    {
      "question": "What is the proper method for closing nested tags (The First In, Last Out rule)?",
      "options": [
        "You never have to close nested elements if they are inside a paragraph.",
        "The most recently opened nested element MUST be closed first.",
        "Always close the outermost element before you close the inner ones.",
        "You close all nested tags with a single </all> tag."
      ],
      "correct": 1
    },
    {
      "question": "Why must you include a forward slash in a closing tag?",
      "options": [
        "To make the text bold.",
        "To tell the browser the element has ended.",
        "To link to another page.",
        "To tell the browser the element is empty."
      ],
      "correct": 1
    },
    {
      "question": "Is HTML explicitly case-sensitive (e.g., does it strictly break if you use <P> instead of <p>)?",
      "options": [
        "Yes, it will instantly crash.",
        "No, but lowercase is highly recommended by web standards.",
        "Yes, uppercase tags generate errors.",
        "No, uppercase is actually the recommended standard."
      ],
      "correct": 1
    }
  ]
};
