window.SKILL_ORBIT_CURRICULUM = [
  // --- HTML MODULE ---
  {
    "id": "html-01",
    "module": "html",
    "section": "HTML Basic",
    "title": "What is HTML?",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "Imagine a house. The wood and bricks are the structure. HTML is the 'wood and bricks' of the internet.",
        "interactionType": "multiple-choice",
        "options": ["A way to design colors", "The structure and skeleton of a website", "A type of internet speed"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "HTML doesn't care about colors or styles yet. It only cares about where things go.",
          "mechanism": "HTML uses 'tags' to label parts of a page as headers, paragraphs, or buttons.",
          "code": "<html>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>"
        },
        "visualExample": "<h1>House Structure</h1><div style='border: 2px dashed #94a3b8; padding: 20px; border-radius: 8px;'>[ Page Content Area ]</div>"
      },
      {
        "hook": "HTML stands for HyperText Markup Language. It's a way to 'mark up' plain text to give it meaning.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<h1>"},
          {"text": "My First Title"},
          {"text": "</h1>"}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Tags are like bookends. They tell the browser where content starts and where it ends.",
          "mechanism": "The content between the opening (<h1>) and closing (</h1>) tags is what represents the element.",
          "code": "<h1>This is the content</h1>"
        },
        "visualExample": "<h1>My First Title</h1>"
      },
      {
        "hook": "To tell the browser 'This is a heading', you use the <h1> tag. Try to identify the 'Type' of element below.",
        "interactionType": "live-type",
        "placeholder": "What is the acronym?",
        "acceptedAnswers": ["HTML"],
        "explanation": {
          "intuition": "Everything you see on a webpage—every button, link, and image—is represented by a specific HTML tag.",
          "mechanism": "Browsers read HTML from top to bottom, rendering the tags into the visual elements you see.",
          "code": "<!-- Browser sees this -->\n<button>Click Me</button>"
        },
        "visualExample": "<button style='padding: 10px 20px; background: #7c3aed; color: white; border: none; border-radius: 6px; cursor: pointer;'>Live Button Rendering</button>"
      }
    ],
    "challenge": {
      "instruction": "Create an <h1> element with the text 'Hello Skill-Orbit'.",
      "hint": "Start with <h1>, add your text, and close it with </h1>",
      "startingCode": "",
      "solution": "<h1>Hello Skill-Orbit</h1>",
      "tests": [
        "code.includes('<h1>')",
        "code.includes('</h1>')",
        "code.toLowerCase().includes('hello skill-orbit')"
      ]
    }
  },
  {
    "id": "html-02",
    "module": "html",
    "section": "HTML Basic",
    "title": "HTML Editors",
    "xp": 40,
    "subtitle": "Where the magic happens before the browser sees it.",
    "interactive_steps": [
      {
        "hook": "HTML is written in plan text editors. Like a Note book for code. Can you guess which of these is NOT a professional code editor?",
        "interactionType": "multiple-choice",
        "options": ["VS Code", "Sublime Text", "Microsoft Word"],
        "correctIndex": 2,
        "explanation": {
          "intuition": "Microsoft Word adds 'hidden formatting' like font data, which confuses the browser. Code editors keep it 'Pure'.",
          "mechanism": "Professional editors highlight code colors to help you spot mistakes and keep syntax clean.",
          "code": "<!-- Pure text in a code editor -->\n<h1>No extra formatting</h1>"
        },
        "visualExample": "<div style='font-family: monospace; background: #1e293b; color: #38bdf8; padding: 15px; border-radius: 8px;'><span style='color: #fbbf24;'>&lt;h1&gt;</span>Pure Code<span style='color: #fbbf24;'>&lt;/h1&gt;</span></div>"
      },
      {
        "hook": "The life cycle of a webpage is: 1. Write Code, 2. Save File (.html), 3. Open in Browser. Look at this filename. Is it ready?",
        "interactionType": "multiple-choice",
        "options": ["index.txt", "index.html", "index.docx"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "The extension '.html' tells the computer: 'Hey, use a browser to read this skeleton!'.",
          "mechanism": "Browsers ignore non-HTML files when trying to render the DOM structure.",
          "code": "File Name: index.html"
        },
        "visualExample": "<div style='padding: 10px; border: 1px solid #ddd; background: #f8fafc; border-radius: 6px; display: inline-flex; align-items: center; gap: 8px;'><i class='fa-solid fa-file-code' style='color:#f97316;'></i> <span>index.html</span></div>"
      }
    ],
    "challenge": {
      "instruction": "We will use our built-in Skill-Orbit editor. Type 'Code' between these <span> tags.",
      "hint": "Just type the word Code inside.",
      "startingCode": "<span></span>",
      "solution": "<span>Code</span>",
      "tests": [
        "code.includes('<span>')",
        "code.includes('</span>')",
        "code.includes('Code')"
      ]
    }
  },
  {
    "id": "html-03",
    "module": "html",
    "section": "HTML Basic",
    "title": "HTML Document Structure",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "An HTML document is like a 'Box inside a Box'. The first box is ALWAYS the <html> tag.",
        "interactionType": "multiple-choice",
        "options": ["The <html> tag wraps everything.", "The <head> tag wraps everything.", "The <body> tag wraps everything."],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Like a physical box labeled 'Website', the <html> tag holds all the parts in one place.",
          "mechanism": "This is called the 'Root' element. It's the parent of every other element on your page.",
          "code": "<html>\n  <!-- Everything goes here -->\n</html>"
        },
        "visualExample": "<div style='border: 4px solid #7c3aed; padding: 20px; border-radius: 12px; background: rgba(124, 58, 237, 0.05); text-align: center;'>[ I am the HTML box ]</div>"
      },
      {
        "hook": "Now, we add two boxes inside. The <head> (The Brain) and the <body> (The Physical Parts). Which one do you see on screen?",
        "interactionType": "multiple-choice",
        "options": ["<head>", "<body>", "Both are invisible"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "The head stores thoughts (metadata), while the body is the visible portion people experience.",
          "mechanism": "Only content inside the <body> tag is rendered by the browser's visual engine.",
          "code": "<html>\n  <head><!-- Invisible thoughts --></head>\n  <body><!-- Visible world --></body>\n</html>"
        },
        "visualExample": "<div style='display: flex; gap: 10px; flex-direction: column;'>\n  <div style='background: #e2e8f0; color: #64748b; padding: 10px; border-radius: 8px; border: 1px dashed #cbd5e1; text-align: center; font-size: 0.8rem;'>&lt;head&gt; (Thought Only)</div>\n  <div style='background: #fff; color: #1e293b; padding: 30px; border-radius: 8px; border: 1.5px solid #0ea5e9; text-align: center; font-weight: bold;'>&lt;body&gt; (Visual content)</div>\n</div>"
      },
      {
        "hook": "Identify the 'Brain' of the webpage correctly from the following code structure.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<html>"},
          {"text": "<head>"},
          {"text": "<body>"}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "The <head> is processed FIRST, even before the body appears. It's where the browser prepares.",
          "mechanism": "The <head> section is the sibling of <body> and the child of <html>.",
          "code": "<html>\n  <head>\n    <!-- Prepare the brain -->\n  </head>\n</html>"
        },
        "visualExample": "<div style='background: #0f172a; padding: 20px; border-radius: 12px; font-family: monospace; color: #fff;'>\n  &lt;html&gt;<br/>\n  &nbsp;&nbsp;<span style='color: #fbbf24; background: rgba(251, 191, 36, 0.1); padding: 2px 5px;'>&lt;head&gt; brain section &lt;/head&gt;</span>\n</div>"
      }
    ],
    "challenge": {
      "instruction": "Assemble the basic structure: Wrap a <body> element inside an <html> element.",
      "hint": "Start with <html>, then <body></body>, then </html>",
      "startingCode": "",
      "solution": "<html>\n  <body></body>\n</html>",
      "tests": [
        "code.includes('<html>')",
        "code.includes('<body>')",
        "code.indexOf('<html>') < code.indexOf('<body>')",
        "code.indexOf('</body>') < code.indexOf('</html>')"
      ]
    }
  },
  {
    "id": "html-04",
    "module": "html",
    "section": "HTML Basic",
    "title": "HTML Elements",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "An HTML element is the 'Whole Package'. It includes the start tag, the content, and the end tag.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<h1>"},
          {"text": "My Life"},
          {"text": "</h1>"}
        ],
        "correctIndex": 0,
        "explanation": {
          "intuition": "The 'Start Tag' is like the 'Open Bracket'. It tells the computer: 'Start making things bold/big from here!'.",
          "mechanism": "It uses angle brackets with the tag name inside. Example: <p> for Paragraph.",
          "code": "<p>Start of paragraph"
        },
        "visualExample": "<div style='font-family: monospace;'>Start Tag: <span style='color: #ef4444;'>&lt;h1&gt;</span></div>"
      },
      {
        "hook": "Now identify the 'Closing Tag' in this element structure.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<h1>"},
          {"text": "The Title"},
          {"text": "</h1>"}
        ],
        "correctIndex": 2,
        "explanation": {
          "intuition": "The 'End Tag' is identical to the Start Tag, but with a Forward Slash (/) before the name.",
          "mechanism": "The browser stops applying the behavior (like heading size) once it hits the closing tag.",
          "code": "</h1> <!-- Stop being a heading! -->"
        },
        "visualExample": "<div style='font-family: monospace;'>End Tag: <span style='color: #10b981;'>&lt;/h1&gt;</span></div>"
      },
      {
        "hook": "Some elements have 'No content' and no closing tag. These are called Empty Elements. Predict the result of <br>.",
        "interactionType": "multiple-choice",
        "options": ["Adds a new line", "Makes text bold", "Adds an image"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of <br> as a typewriter 'Return' key. It just breaks the line without needing a 'start' and 'stop'.",
          "mechanism": "Empty elements are self-closing or 'void' elements.",
          "code": "Line 1<br/>Line 2"
        },
        "visualExample": "<div>Line One<br/><span style='color:#64748b;'>[ Break ]</span><br/>Line Two</div>"
      }
    ],
    "challenge": {
      "instruction": "Create a paragraph element (<p>) with the text 'Learning is fun!'.",
      "hint": "Use <p> tags on both sides.",
      "startingCode": "",
      "solution": "<p>Learning is fun!</p>",
      "tests": [
        "code.includes('<p>')",
        "code.includes('</p>')",
        "code.toLowerCase().includes('learning is fun')"
      ]
    }
  },
  {
    "id": "html-05",
    "module": "html",
    "section": "HTML Basic",
    "title": "HTML Attributes",
    "xp": 55,
    "interactive_steps": [
      {
        "hook": "Attributes provide 'Extra Information' for an element. Imagine a character in a game—Attributes are their Level, Equipment, and Stats.",
        "interactionType": "multiple-choice",
        "options": ["Always appear in the START tag", "Always appear in the END tag", "Can be anywhere"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "You set the 'specs' of an element right at the beginning. It's like telling a robot what to do before it starts walking.",
          "mechanism": "Attributes never appear in the closing tag. They modify the element's behavior globally.",
          "code": "<a href=\"https://google.com\">Link</a>"
        },
        "visualExample": "<div>Modifier Area:<br/><span style='color:#ef4444;'>&lt;tag attribute=\"value\"&gt;</span></div>"
      },
      {
        "hook": "Identify the 'Value' of the attribute in this snippet correctly.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "class="},
          {"text": "\"bold-text\""}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "The value is 'What' you want the attribute to be. It ALWAYS goes in double quotes (\"\").",
          "mechanism": "The name=value structure is standard across almost all HTML attributes.",
          "code": "name=\"value\""
        },
        "visualExample": "<div style='font-family: monospace;'>attribute=\"<span style='color: #fbbf24;'>Value</span>\"</div>"
      },
      {
        "hook": "One of the most used attributes is 'href' for links. Predict where it takes you.",
        "interactionType": "multiple-choice",
        "options": ["Hyper Reference (Url)", "Header Reference", "Home Page"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of 'href' as the GPS coordinates for a link element. It tells the browser where to navigate.",
          "mechanism": "The 'href' stands for Hypertext Reference.",
          "code": "<a href=\"https://skillorbit.com\">Visit us</a>"
        },
        "visualExample": "<a href='#' style='color: #0ea5e9; text-decoration: underline;'>Visit Skill-Orbit (Live Link)</a>"
      }
    ],
    "challenge": {
      "instruction": "Create a link (<a>) that points to 'https://skillorbit.com' with text 'Official Website'.",
      "hint": "Use <a href='...'>Official Website</a>.",
      "startingCode": "",
      "solution": "<a href=\"https://skillorbit.com\">Official Website</a>",
      "tests": [
        "code.includes('<a')",
        "code.includes('href')",
        "code.includes('https://skillorbit.com')",
        "code.includes('</a>')"
      ]
    }
  },
  {
    "id": "html-06",
    "module": "html",
    "section": "HTML Basic",
    "title": "Headings & Paragraphs",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "Webpages use Headings for titles. There are 6 levels, from <h1> (Most Important) to <h6> (Least Important). Which is the largest?",
        "interactionType": "multiple-choice",
        "options": ["<h1>", "<h3>", "<h6>"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of a Newspaper. The 'Front Page Headline' is H1. The 'Small Sub-article Title' is H3.",
          "mechanism": "H1 results in the largest font by default, while H6 is often even smaller than regular text.",
          "code": "<h1>Giant Title</h1>\n<h6>Tiny Title</h6>"
        },
        "visualExample": "<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>"
      },
      {
        "hook": "For normal blocks of text, we use 'Paragraphs'. Identify the paragraph tag in the options.",
        "interactionType": "multiple-choice",
        "options": ["<text>", "<p>", "<para>"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "The <p> tag acts like an invisible spacer. It adds a little margin around your text so it doesn't bunch up.",
          "mechanism": "Browsers automatically add some white space (a margin) before and after each <p> element.",
          "code": "<p>This is my first paragraph.</p>"
        },
        "visualExample": "<p style='margin: 0; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px;'>I am a paragraph. Notice the space around me!</p>"
      },
      {
        "hook": "Can you 'Predict' which tag would be best for a main page title?",
        "interactionType": "multiple-choice",
        "options": ["<h1>", "<h5>", "<p>"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Always use H1 for the main topic of your page. It's not just about size; it's about telling Search Engines what the page is about.",
          "mechanism": "This is called 'Semantic SEO'. Using the right tag for the right job helps Google find your site.",
          "code": "<h1>My Amazing Website</h1>"
        },
        "visualExample": "<h1 style='color: #7c3aed; border-bottom: 2px solid #7c3aed;'>My Amazing Website</h1>"
      }
    ],
    "challenge": {
      "instruction": "Create an <h1> heading with 'My Blog' and a <p> paragraph below it with 'Welcome to my world!'.",
      "hint": "Use <h1></h1> followed by <p></p>",
      "startingCode": "",
      "solution": "<h1>My Blog</h1>\n<p>Welcome to my world!</p>",
      "tests": [
        "code.includes('<h1>')",
        "code.includes('</h1>')",
        "code.includes('<p>')",
        "code.includes('</p>')",
        "code.toLowerCase().includes('my blog')",
        "code.toLowerCase().includes('welcome to my world')"
      ]
    }
  },
  {
    "id": "html-07",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Styles (CSS Intro)",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "HTML handles the structure, but 'Styles' (CSS) handle the look. Think of it like painting the walls of your HTML house.",
        "interactionType": "multiple-choice",
        "options": ["The 'style' attribute", "The 'look' attribute", "The 'color' attribute"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "The 'style' attribute is a special modifier that lets you write mini CSS rules directly inside an HTML tag.",
          "mechanism": "It follows a 'property: value' pattern. For example, color: blue.",
          "code": "<p style=\"color:blue;\">Blue text</p>"
        },
        "visualExample": "<p style='color: #3b82f6; font-weight: bold; border-left: 4px solid #3b82f6; padding-left: 10px;'>I am styled with color: blue!</p>"
      },
      {
        "hook": "Identify the 'Property' in this style rule: style=\"background-color: red;\".",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "background-color"},
          {"text": ":"},
          {"text": "red"}
        ],
        "correctIndex": 0,
        "explanation": {
          "intuition": "The 'Property' is 'WHAT' you want to change (the background, the font, the border).",
          "mechanism": "CSS properties are separated from their values by a colon (:).",
          "code": "property: value;"
        },
        "visualExample": "<div style='background-color: #ef4444; color: white; padding: 10px; border-radius: 8px; text-align: center;'>Background: Red</div>"
      },
      {
        "hook": "You can change more than just colors. 'font-size' changes how big text is. Predict the unit used most in web design.",
        "interactionType": "multiple-choice",
        "options": ["px (Pixels)", "in (Inches)", "cm (Centimeters)"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Pixels (px) are the tiny dots on your screen. 20px means 'take up 20 dots of space'.",
          "mechanism": "Screen-based units differ from print-based units (like inches) because screens vary in density.",
          "code": "<p style=\"font-size: 20px;\">Large text</p>"
        },
        "visualExample": "<p style='font-size: 24px; margin: 0;'>24px Text</p><p style='font-size: 12px; margin: 0;'>12px Text</p>"
      }
    ],
    "challenge": {
      "instruction": "Change the color of an <h1> heading to 'red' using the style attribute.",
      "hint": "Use <h1 style='color: red;'>Title</h1>",
      "startingCode": "<h1>Red Title</h1>",
      "solution": "<h1 style=\"color: red;\">Red Title</h1>",
      "tests": [
        "code.includes('style=')",
        "code.includes('color:')",
        "code.includes('red')"
      ]
    }
  },
  {
    "id": "html-08",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Formatting",
    "xp": 45,
    "interactive_steps": [
      {
        "hook": "Ever wanted to make a word pop? We call this 'Formatting'. Identify the difference between <b> and <i> below.",
        "interactionType": "multiple-choice",
        "options": ["<b> means Bold, <i> means Italic", "<b> means Big, <i> means Intelligent", "They are the same"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Format tags are like the 'Volume' control for your text. <b> is shouting, <i> is whispering (emphasizing).",
          "mechanism": "The browser applies specific font-weight (bold) or font-style (italic) to the content inside.",
          "code": "<b>Shout!</b> <i>Whisper...</i>"
        },
        "visualExample": "<p><b>BOLD WORD</b> and <i>ITALIC WORD</i></p>"
      },
      {
        "hook": "Now choose the 'Strong' tag. It looks like bold, but it tells Search Engines: 'This is IMPORTANT!'.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<b>"},
          {"text": "<strong>"}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Imagine a screen reader for a blind person. It would read <strong> text with actual emphasis in the voice.",
          "mechanism": "Strong represents important text, whereas <b> is just stylistic.",
          "code": "<strong>This matters!</strong>"
        },
        "visualExample": "<strong>Important Content Rendered Bold</strong>"
      },
      {
        "hook": "Identify the 'Delete' tag (<del>). It shows something is removed with a line through it.",
        "interactionType": "multiple-choice",
        "options": ["<del>", "<cut>", "<stop>"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of a Price Tag. The old price is <del>crossed out</del>, the new price is <ins>inserted</ins>.",
          "mechanism": "The browser adds a 'strike-through' line automatically to <del> tags.",
          "code": "<del>$50</del> $40!"
        },
        "visualExample": "<p>Old Price: <del style='color:#ef4444;'>$50.00</del> Now: $39.99</p>"
      }
    ],
    "challenge": {
      "instruction": "Make the word 'Bold' bold and the word 'Italic' italic.",
      "hint": "Use <b>Bold</b> and <i>Italic</i>",
      "startingCode": "<p>This is Bold and this is Italic</p>",
      "solution": "<p>This is <b>Bold</b> and this is <i>Italic</i></p>",
      "tests": [
        "code.includes('<b>Bold</b>')",
        "code.includes('<i>Italic</i>')"
      ]
    }
  },
  {
    "id": "html-09",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Quotations",
    "xp": 45,
    "interactive_steps": [
      {
        "hook": "Sometimes we want to quote others. For long sections, we use 'Blockquotes'. Predict what it does to the layout.",
        "interactionType": "multiple-choice",
        "options": ["Indents the section", "Adds a giant font size", "Makes the text yellow"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "A blockquote 'blocks' the text off from the rest, giving it some breathing room (indentation) to show it's from another source.",
          "mechanism": "Browsers typically indent <blockquote> elements from both sides.",
          "code": "<blockquote>Stay hungry, stay foolish.</blockquote>"
        },
        "visualExample": "<blockquote style='border-left: 4px solid #7c3aed; padding-left: 15px; margin: 20px 0; color: #64748b;'>Stay hungry, stay foolish.</blockquote>"
      },
      {
        "hook": "For short, inline quotes, we use the <q> tag. Guess what characters the browser adds automatically.",
        "interactionType": "multiple-choice",
        "options": ["Parentheses", "Quotation Marks", "Square Brackets"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "The <q> tag is smart! It knows you're quoting, so it adds the double quotes for you.",
          "mechanism": "The <q> tag inserts quotation marks around the text automatically.",
          "code": "He said, <q>Hello!</q>"
        },
        "visualExample": "<p>Einstein said, <q>Imagination is more important than knowledge.</q></p>"
      }
    ],
    "challenge": {
      "instruction": "Wrap this text in a <blockquote>: 'The only way to do great work is to love what you do.'",
      "hint": "Use <blockquote>Text</blockquote>",
      "startingCode": "The only way to do great work is to love what you do.",
      "solution": "<blockquote>The only way to do great work is to love what you do.</blockquote>",
      "tests": [
        "code.includes('<blockquote>')",
        "code.includes('</blockquote>')"
      ]
    }
  },
  {
    "id": "html-10",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Comments",
    "xp": 35,
    "interactive_steps": [
      {
        "hook": "HTML comments are like Sticky Notes for your future self. They explain what's happening but are INVISIBLE to website visitors.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<!--"},
          {"text": "This is a comment"},
          {"text": "-->"}
        ],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Comments are skipped by the browser entirely. It sees the <html>, then sees the start of a comment, and ignores everything until the comment ends.",
          "mechanism": "The comment starts with <!-- and ends with -->. Anything in between is not rendered.",
          "code": "<!-- I won't show up! -->"
        },
        "visualExample": "<div>Visible Content<br/><span style='color:#64748b; font-size: 0.8rem;'>[ The comment exists here but is hidden ]</span></div>"
      },
      {
        "hook": "Identify the END of the comment tag correctly.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<!--"},
          {"text": "Comment Content"},
          {"text": "-->"}
        ],
        "correctIndex": 2,
        "explanation": {
          "intuition": "You MUST close your comments. If you forget the closing tag (-->), the rest of your website might turn into a giant hidden comment!",
          "mechanism": "The syntax is strict: four dashes in total.",
          "code": "-->"
        },
        "visualExample": "<div style='font-family: monospace; color: #94a3b8;'>&lt;!-- Comment --&gt;</div>"
      }
    ],
    "challenge": {
      "instruction": "Comment out this title: <h1>Main Title</h1>.",
      "hint": "Put <!-- before it and --> after it.",
      "startingCode": "<h1>Main Title</h1>",
      "solution": "<!-- <h1>Main Title</h1> -->",
      "tests": [
        "code.startsWith('<!--')",
        "code.endsWith('-->')",
        "code.includes('<h1>')"
      ]
    }
  },
  {
    "id": "html-11",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Colors",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "Colors can be added with names (like 'tomato') or Codes. Can you guess which code below represents Pure Black?",
        "interactionType": "multiple-choice",
        "options": ["#ffffff", "#000000", "#ff0000"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Think of #000000 as 'Zero Color'. No red, no green, no blue. That results in total darkness (Black).",
          "mechanism": "Hex codes start with # and use 6 characters. The first two are Red, middle two Green, last two Blue.",
          "code": "color: #000000;"
        },
        "visualExample": "<div style='display: flex; gap: 10px;'>\n  <div style='width: 30px; height: 30px; background: #000; border-radius: 50%;'></div>\n  <div style='width: 30px; height: 30px; background: #fff; border: 1px solid #ddd; border-radius: 50%;'></div>\n  <div style='width: 30px; height: 30px; background: #ff0000; border-radius: 50%;'></div>\n</div>"
      },
      {
        "hook": "You can use fancy names too! Look at this code. Is it a valid way to set color?",
        "interactionType": "multiple-choice",
        "options": ["Yes, 'tomato' is valid", "No, only hex codes work"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Browsers know about 140 standard color names. You can just say 'orange', 'gold', or even 'hotpink'!",
          "mechanism": "Colors are set via the 'color' (for text) or 'background-color' CSS properties.",
          "code": "style=\"color: tomato;\""
        },
        "visualExample": "<div style='color: tomato; font-weight: bold; border: 1px solid tomato; padding: 10px; border-radius: 8px;'>I am color: tomato!</div>"
      }
    ],
    "challenge": {
      "instruction": "Set the background color of a <div> to 'dodgerblue'.",
      "hint": "Use <div style='background-color: dodgerblue;'></div>",
      "startingCode": "<div>Sky Blue</div>",
      "solution": "<div style=\"background-color: dodgerblue;\">Sky Blue</div>",
      "tests": [
        "code.includes('background-color')",
        "code.includes('dodgerblue')"
      ]
    }
  },
  {
    "id": "html-12",
    "module": "html",
    "section": "HTML Media",
    "title": "HTML Links",
    "xp": 55,
    "interactive_steps": [
      {
        "hook": "HTML Links are like Portals. They connect one page to another. We use the 'Anchor' tag <a> for this.",
        "interactionType": "multiple-choice",
        "options": ["<a> for Anchor", "<L> for Link", "<gh> for Go Here"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of an Anchor ⚓. It 'anchors' your current position to a new location on the web.",
          "mechanism": "The <a> tag defines a hyperlink, which is used to link from one page to another.",
          "code": "<a>Link Text</a>"
        },
        "visualExample": "<div style='padding: 10px; border: 1px dashed #7c3aed; border-radius: 8px;'>[ Anchor Area ]</div>"
      },
      {
        "hook": "The portal needs a destination. We use the 'href' (Hypertext Reference) attribute. Look at this code. Is it going to work?",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<a"},
          {"text": " target=\"https://google.com\""},
          {"text": ">"}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Ah! Common mistake. 'target' is for *how* it opens. 'href' is for *where* it goes.",
          "mechanism": "An <a> tag WITHOUT an 'href' attribute is not a link—it's just a placeholder.",
          "code": "<a href=\"https://google.com\">Click Me</a>"
        },
        "visualExample": "<a href='#' style='color: #0ea5e9; text-decoration: underline;'>I am a real link (Clicking works)</a>"
      },
      {
        "hook": "What if you want the portal to open in a NEW tab? You use the target=\"_blank\" attribute. Predict the result.",
        "interactionType": "multiple-choice",
        "options": ["Opens in new tab", "Opens in same tab", "Closes the browser"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of '_blank' as 'start with a blank page'. It leaves your current site open and opens the new one beside it.",
          "mechanism": "The target attribute specifies where to open the linked document.",
          "code": "<a href=\"...\" target=\"_blank\">Open New Tab</a>"
        },
        "visualExample": "<div>[ Existing Tab ] -> [ New Tab + ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Create a link that opens 'https://google.com' in a NEW tab.",
      "hint": "Use href='...' and target='_blank'.",
      "startingCode": "<a>Google</a>",
      "solution": "<a href=\"https://google.com\" target=\"_blank\">Google</a>",
      "tests": [
        "code.includes('href')",
        "code.includes('target')",
        "code.includes('_blank')",
        "code.includes('https://google.com')"
      ]
    }
  },
  {
    "id": "html-13",
    "module": "html",
    "section": "HTML Media",
    "title": "HTML Images",
    "xp": 55,
    "interactive_steps": [
      {
        "hook": "Images add life to your page. Unlike paragraphs, the <img> tag is 'self-closing'. It doesn't wrap text.",
        "interactionType": "multiple-choice",
        "options": ["Always needs </img>", "Has no closing tag", "Uses only capital letters"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "An image is an 'Empty' element. It doesn't contain text—it just 'is' an image. So there's nothing to close!",
          "mechanism": "Empty elements like <img> do not have a separate closing tag.",
          "code": "<img src=\"logo.png\">"
        },
        "visualExample": "<div style='border: 1px dashed #7c3aed; padding: 20px; text-align: center;'>[ Image Placeholder ]</div>"
      },
      {
        "hook": "The 'src' attribute points to the image file. If the file is missing, the browser uses the 'alt' text. Predict when 'alt' is shown.",
        "interactionType": "multiple-choice",
        "options": ["When the image loads perfectly", "When the image file is broken", "Only on mobile"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Alt stands for 'Alternative'. It's the 'backup plan' for your image. It also helps blind users understand what's there.",
          "mechanism": "Screen readers read the alt text out loud to users who cannot see the screen.",
          "code": "<img src=\"broken.jpg\" alt=\"A beautiful sunset\">"
        },
        "visualExample": "<div>Broken Link:<br/><img src='404.jpg' alt='Backup Text' style='border: 1px solid #ddd; padding: 5px;' /></div>"
      },
      {
        "hook": "Identify the 'Source' attribute in this code snippet correctly.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "img"},
          {"text": "src="},
          {"text": "\"photo.jpg\""}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Think of 'src' as the 'Source Code' or 'Path' to the treasure map. Without it, the browser doesn't know what to show.",
          "mechanism": "The src attribute is required for every <img> element.",
          "code": "src=\"path/to/image.png\""
        },
        "visualExample": "<div style='font-family: monospace;'>src=\"<span style='color: #0ea5e9;'>photo.jpg</span>\"</div>"
      }
    ],
    "challenge": {
      "instruction": "Add an image with src='https://placehold.co/100' and alt='Placeholder'.",
      "hint": "Use <img src='...' alt='...'>",
      "startingCode": "",
      "solution": "<img src=\"https://placehold.co/100\" alt=\"Placeholder\">",
      "tests": [
        "code.includes('src')",
        "code.includes('alt')",
        "code.includes('https://placehold.co/100')"
      ]
    }
  },
  {
    "id": "html-14",
    "module": "html",
    "section": "HTML Media",
    "title": "HTML Favicon",
    "xp": 35,
    "interactive_steps": [
      {
        "hook": "A Favicon is the tiny icon in your browser's tab. It's like the 'Avatar' of your website. Where does it belong?",
        "interactionType": "multiple-choice",
        "options": ["Inside <body>", "Inside <head>", "Inside <title>"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Favorite Icons are part of the page's 'Metadata' (the brain). Since the browser needs to load it before the page content, it stays in the <head> section.",
          "mechanism": "It uses the <link> element with rel=\"icon\".",
          "code": "<head>\n  <link rel=\"icon\" href=\"favicon.ico\">\n</head>"
        },
        "visualExample": "<div style='display: flex; align-items: center; gap: 8px; background: #fff; padding: 10px; border: 1px solid #ddd; border-top-left-radius: 8px; border-top-right-radius: 8px;'>\n  <img src='https://www.google.com/favicon.ico' style='width: 16px; height: 16px;' />\n  <span style='font-size: 0.8rem; color: #475569;'>Skill-Orbit Tab</span>\n</div>"
      }
    ],
    "challenge": {
      "instruction": "Add a favicon link with rel='icon' and href='favicon.ico' inside the <head>.",
      "hint": "Use <link rel='icon' href='favicon.ico'>",
      "startingCode": "<head>\n  \n</head>",
      "solution": "<head>\n  <link rel=\"icon\" href=\"favicon.ico\">\n</head>",
      "tests": [
        "code.includes('<link')",
        "code.includes('rel=\"icon\"')",
        "code.includes('href=\"favicon.ico\"')"
      ]
    }
  },
  {
    "id": "html-15",
    "module": "html",
    "section": "HTML Media",
    "title": "HTML Page Title",
    "xp": 30,
    "interactive_steps": [
      {
        "hook": "Every page needs a name! The <title> element gives the page its identity. Where does it show up?",
        "interactionType": "multiple-choice",
        "options": ["On the browser tab", "In the main body", "At the bottom"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "It's the 'Label' of the tab. It helps people find your page when they have 50 tabs open (don't we all?).",
          "mechanism": "The <title> must be inside the <head> element. It's for the browser and Google, not just visitors.",
          "code": "<head>\n  <title>My Cool Site</title>\n</head>"
        },
        "visualExample": "<div style='display: flex; align-items: center; background: #fff; padding: 5px 15px; border: 1px solid #ddd; border-top-left-radius: 8px; border-top-right-radius: 8px;'>\n  <span style='font-size: 0.8rem; font-weight: bold; color: #1e293b;'>My Cool Site</span>\n</div>"
      }
    ],
    "challenge": {
      "instruction": "Set the page title to 'Skill-Orbit' inside the <head>.",
      "hint": "Use <title>Skill-Orbit</title>.",
      "startingCode": "<head>\n  \n</head>",
      "solution": "<head>\n  <title>Skill-Orbit</title>\n</head>",
      "tests": [
        "code.includes('<title>')",
        "code.includes('Skill-Orbit')",
        "code.includes('</title>')"
      ]
    }
  },
  {
    "id": "html-16",
    "module": "html",
    "section": "HTML Tables",
    "title": "HTML Tables",
    "xp": 65,
    "interactive_steps": [
      {
        "hook": "Tables are like Egg Cartons or Excel sheets. They hold data in rows and columns. What tag starts the table?",
        "interactionType": "multiple-choice",
        "options": ["<grid>", "<table>", "<box>"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "The <table> tag acts as the 'Container' for your data grid. Everything inside follows a strict grid rule.",
          "mechanism": "Inside a <table>, you must have Rows (<tr>) and Data Cells (<td>).",
          "code": "<table>\n  <tr>\n    <td>Cell 1</td>\n  </tr>\n</table>"
        },
        "visualExample": "<table style='border-collapse: collapse; border: 2px solid #7c3aed;'><tr><td style='border: 1px solid #7c3aed; padding: 10px;'>Sample Cell</td></tr></table>"
      },
      {
        "hook": "TR stands for 'Table Row'. TD stands for 'Table Data' (the cells). Identify the row tag correctly.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<tr>"},
          {"text": "<td>"}
        ],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Imagine drawing a table. First you draw a horizontal line (a Row), then you fill it with vertical slots (the Data).",
          "mechanism": "Table data (<td>) elements are the data containers of the table. They can contain all sorts of HTML elements.",
          "code": "<tr>\n <td>Slot 1</td>\n <td>Slot 2</td>\n</tr>"
        },
        "visualExample": "<div>[ Row Start ] -> [ Data 1 ] | [ Data 2 ] -> [ Row End ]</div>"
      },
      {
        "hook": "What if you want a Bold Header at the top? We use 'Table Header' tags. What is the tag name?",
        "interactionType": "multiple-choice",
        "options": ["<thead>", "<th>", "<header>"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Standard cells are for data. <th> tags are for the labels at the top of a column.",
          "mechanism": "By default, browsers render <th> as bold and centered.",
          "code": "<th>Name</th>"
        },
        "visualExample": "<table style='width: 100%; border-collapse: collapse;'><tr style='background: #f1f5f9;'><th style='border: 1px solid #ddd; padding: 8px;'>Header</th></tr></table>"
      }
    ],
    "challenge": {
      "instruction": "Create a table with one row (<tr>) containing two cells (<td>).",
      "hint": "Use <table> <tr> <td></td> <td></td> </tr> </table>",
      "startingCode": "<table>\n\n</table>",
      "solution": "<table>\n  <tr>\n    <td>A</td>\n    <td>B</td>\n  </tr>\n</table>",
      "tests": [
        "code.includes('<tr>')",
        "code.split('<td>').length - 1 === 2",
        "code.includes('</table>')"
      ]
    }
  },
  {
    "id": "html-17",
    "module": "html",
    "section": "HTML Lists",
    "title": "HTML Lists",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "Lists are for groups of items. There are two main types: Ordered (1, 2, 3) and Unordered (Bullets). Which tag is for Bullets?",
        "interactionType": "multiple-choice",
        "options": ["<ol>", "<ul>", "<li>"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "UL stands for 'Unordered List'. Think of the 'U' as 'Uniform'—every bullet point looks the same.",
          "mechanism": "UL uses circular bullet points by default.",
          "code": "<ul>\n  <li>Apples</li>\n</ul>"
        },
        "visualExample": "<ul><li>Bullet 1</li><li>Bullet 2</li></ul>"
      },
      {
        "hook": "Predict what 'OL' stands for in HTML.",
        "interactionType": "multiple-choice",
        "options": ["Only List", "Ordered List", "Output List"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "OL is for things where the order MATTERS (like a recipe). Step 1, then Step 2.",
          "mechanism": "The browser automatically numbers each item (1, 2, 3...) inside an <ol> tag.",
          "code": "<ol>\n  <li>First step</li>\n  <li>Second step</li>\n</ol>"
        },
        "visualExample": "<ol><li>Item One</li><li>Item Two</li></ol>"
      },
      {
        "hook": "Every item inside a list—whether UL or OL—must be wrapped in this tag. Identify it.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<ul>"},
          {"text": "<li>"},
          {"text": "Coffee"},
          {"text": "</li>"}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "LI stands for 'List Item'. You can't just put text inside UL/OL; you need to put it inside the LI 'slot'.",
          "mechanism": "<li> tags are list items and must have a parent of <ul> or <ol>.",
          "code": "<li>My Item</li>"
        },
        "visualExample": "<div>[ Parent UL ]<br/>&nbsp;&nbsp;[ LI Slot 1 ]<br/>&nbsp;&nbsp;[ LI Slot 2 ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Create an unordered list with two items: 'HTML' and 'CSS'.",
      "hint": "Use <ul> with <li> inside.",
      "startingCode": "",
      "solution": "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>",
      "tests": [
        "code.includes('<ul>')",
        "code.includes('<li>')",
        "code.split('<li>').length - 1 === 2"
      ]
    }
  },
  {
    "id": "html-18",
    "module": "html",
    "section": "HTML Layout",
    "title": "Block & Inline Elements",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "Every element has a 'Display Rule'. Block elements are like selfish wall-builders—they take up the FULL width allowed.",
        "interactionType": "multiple-choice",
        "options": ["Take the whole width", "Stay as small as their text", "Disappear after 1 second"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Imagine a <h1> or a <p>. They start on a new line and push everything else below them. They want the whole street to themselves!",
          "mechanism": "Block-level elements always start on a new line and take up the full width available.",
          "code": "<div style=\"border: 1px solid red;\">Whole street!</div>"
        },
        "visualExample": "<div style='border: 2px solid #7c3aed; padding: 5px; margin-bottom: 5px;'>Block (Takes whole width)</div><div style='border: 2px solid #0ea5e9; padding: 5px;'>Block (Pushed to new line)</div>"
      },
      {
        "hook": "Inline elements are more friendly. They only take as much space as they NEED. Predict what happens to them.",
        "interactionType": "multiple-choice",
        "options": ["They start on a new line", "They stay on the same line", "They are always invisible"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Think of a <span> or an <a>. They fit inside a paragraph without breaking it apart. Like people sitting together on a bench.",
          "mechanism": "Inline elements do not start on a new line and only take up as much width as necessary.",
          "code": "<span>Item A</span> <span>Item B</span>"
        },
        "visualExample": "<span style='border: 2px solid #10b981; padding: 5px;'>Inline A</span> <span style='border: 2px solid #f59e0b; padding: 5px;'>Inline B</span> (Look, they're neighbors!)"
      },
      {
        "hook": "Identify the 'Block' element in this list of tags.",
        "interactionType": "multiple-choice",
        "options": ["<span>", "<a>", "<div>"],
        "correctIndex": 2,
        "explanation": {
          "intuition": "The <div> is the king of block elements. It's a general-purpose container that forces a new line.",
          "mechanism": "Common block elements: <div>, <h1>-<h6>, <p>, <ul>, <ol>, <li>, <footer>, <header>.",
          "code": "<div>Block Level</div>"
        },
        "visualExample": "<div style='background: #e2e8f0; padding: 10px; border-radius: 6px;'>[ Block Content ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Wrap two <span> elements inside a <div>.",
      "hint": "Use <div> <span></span> <span></span> </div>",
      "startingCode": "",
      "solution": "<div>\n  <span>One</span>\n  <span>Two</span>\n</div>",
      "tests": [
        "code.includes('<div>')",
        "code.includes('</div>')",
        "code.split('<span>').length - 1 === 2"
      ]
    }
  },
  {
    "id": "html-19",
    "module": "html",
    "section": "HTML Layout",
    "title": "HTML Classes",
    "xp": 55,
    "interactive_steps": [
      {
        "hook": "Imagine a school. All students in 'Class A' wear the same Red uniform. That's exactly how HTML classes work!",
        "interactionType": "multiple-choice",
        "options": ["One element only", "Multiple elements at once", "Only the <body> tag"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "A class is a 'Label' you can stick on as many elements as you want. Any style you give to that class will apply to ALL of them simultaneously.",
          "mechanism": "The 'class' attribute is used to specify a class for an HTML element.",
          "code": "<p class=\"red-text\">Text 1</p>\n<p class=\"red-text\">Text 2</p>"
        },
        "visualExample": "<div>\n  <div style='color: #ef4444; border: 1px solid #ef4444; margin-bottom: 5px; padding: 5px;'>Member of .red-text</div>\n  <div style='color: #ef4444; border: 1px solid #ef4444; padding: 5px;'>Member of .red-text</div>\n</div>"
      },
      {
        "hook": "Indentify the attribute name used to 'Group' these elements together.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<div"},
          {"text": " class="},
          {"text": "\"menu-item\""}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "The 'class' attribute is the most common way to style groups of elements in web development.",
          "mechanism": "While many elements share a class, each element can also have multiple classes separated by spaces.",
          "code": "<div class=\"btn primary large\">Button</div>"
        },
        "visualExample": "<div style='font-family: monospace;'><span style='color: #7c3aed;'>class</span>=\"menu-item\"</div>"
      }
    ],
    "challenge": {
      "instruction": "Give this <h1> element a class named 'main-title'.",
      "hint": "Use <h1 class=\"main-title\">",
      "startingCode": "<h1>My Website</h1>",
      "solution": "<h1 class=\"main-title\">My Website</h1>",
      "tests": [
        "code.includes('class=')",
        "code.includes('main-title')"
      ]
    }
  },
  {
    "id": "html-20",
    "module": "html",
    "section": "HTML Layout",
    "title": "HTML Id",
    "xp": 55,
    "interactive_steps": [
      {
        "hook": "While many students have the same name, they each have a unique 'Roll Number'. In HTML, this is the 'id'.",
        "interactionType": "multiple-choice",
        "options": ["Can be used by many elements", "Must be UNIQUE to one element", "Only for headings"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Think of an 'id' as a direct phone number. If you dial it, only ONE person answers. It's the most specific way to find an element.",
          "mechanism": "The id attribute specifies a unique id for an HTML element. The value of the id attribute must be unique within the HTML document.",
          "code": "<div id=\"unique-header\">Header</div>"
        },
        "visualExample": "<div>\n  <div style='border: 2px solid #7c3aed; padding: 10px; border-radius: 8px;'>[ ID: #special-one ] (Only one exists)</div>\n</div>"
      },
      {
        "hook": "Identify the 'id' value in this snippet correctly.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "id="},
          {"text": "\"user-profile\""}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Just like a class, the id value is what you use to find it later in CSS or JavaScript.",
          "mechanism": "Ids are case sensitive and must contain at least one character, and must not contain any space characters.",
          "code": "id=\"my-id\""
        },
        "visualExample": "<div style='font-family: monospace;'>id=\"<span style='color: #0ea5e9;'>user-profile</span>\"</div>"
      }
    ],
    "challenge": {
      "instruction": "Assign the id 'submit-btn' to this <button>.",
      "hint": "Use <button id=\"submit-btn\">",
      "startingCode": "<button>Submit</button>",
      "solution": "<button id=\"submit-btn\">Submit</button>",
      "tests": [
        "code.includes('id=')",
        "code.includes('submit-btn')"
      ]
    }
  },
  {
    "id": "html-21",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML Iframes",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "An iframe is like a 'TV Screen' on your website. It allows you to display a completely DIFFERENT website inside your own.",
        "interactionType": "multiple-choice",
        "options": ["Displays a picture", "Displays another website", "Displays a video game controller"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Think of it as a 'Window' to the outside world. Your page stays the same, but the window shows something else entirely.",
          "mechanism": "The <iframe> tag is used to embed another document within the current HTML document.",
          "code": "<iframe src=\"https://example.com\"></iframe>"
        },
        "visualExample": "<div style='border: 4px solid #1e293b; border-radius: 8px; width: 150px; height: 100px; padding: 10px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;'>[ Embedded Site ]</div>"
      },
      {
        "hook": "Identify the 'Source' of the iframe in this snippet.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<iframe"},
          {"text": " src="},
          {"text": "\"map.html\""}
        ],
        "correctIndex": 2,
        "explanation": {
          "intuition": "Just like an image (<img>), an iframe needs a source (src) to know what to display inside its frame.",
          "mechanism": "The src attribute specifies the URL of the page to embed.",
          "code": "src=\"mysite.com\""
        },
        "visualExample": "<div style='font-family: monospace;'>src=\"<span style='color: #fbbf24;'>map.html</span>\"</div>"
      }
    ],
    "challenge": {
      "instruction": "Add an iframe with src='https://skillorbit.com' and a width of '300'.",
      "hint": "Use <iframe src='...' width='300'></iframe>",
      "startingCode": "",
      "solution": "<iframe src=\"https://skillorbit.com\" width=\"300\"></iframe>",
      "tests": [
        "code.includes('<iframe')",
        "code.includes('src')",
        "code.includes('width=\"300\"')"
      ]
    }
  },
  {
    "id": "html-22",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML JavaScript",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "HTML is the Skeleton. CSS is the Skin. JavaScript (JS) is the 'Muscle' that makes things MOVE.",
        "interactionType": "multiple-choice",
        "options": ["Makes the page static", "Makes the page interactive", "Deletes the website"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Without JS, your website is like a poster on a wall. With JS, it's like a video game. It reacts when you click, type, or scroll.",
          "mechanism": "The <script> tag is used to embed JavaScript into an HTML document.",
          "code": "<script>\n  alert('Hello World');\n</script>"
        },
        "visualExample": "<button onclick='alert(\"Action!\")' style='padding: 10px 20px; background: #7c3aed; color: white; border: none; border-radius: 8px; cursor: pointer;'>Click to trigger JS Action</button>"
      },
      {
        "hook": "JavaScript can change HTML content. Identify the tag where JavaScript 'Lives'.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<html>"},
          {"text": "<script>"},
          {"text": "<body>"}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Just like style lived in <style>, script lives in <script>. It's the designated 'Work Area' for your JS code.",
          "mechanism": "Scripts can be placed in the <body> and in the <head> section of an HTML page.",
          "code": "<script>console.log('Active!');</script>"
        },
        "visualExample": "<div style='font-family: monospace; color: #fbbf24;'>&lt;script&gt; // Muscle Logic &lt;/script&gt;</div>"
      }
    ],
    "challenge": {
      "instruction": "Create a <script> element with the text 'console.log('Hi');' inside.",
      "hint": "Use <script>...</script>",
      "startingCode": "",
      "solution": "<script>\n  console.log('Hi');\n</script>",
      "tests": [
        "code.includes('<script>')",
        "code.includes('console.log')",
        "code.includes('Hi')"
      ]
    }
  },
  {
    "id": "html-23",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML File Paths",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "A file path is like an 'Address' for your files. Without it, the browser gets lost. What does the dot (./) mean?",
        "interactionType": "multiple-choice",
        "options": ["The Current Folder", "The Home Page", "The Trash Can"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of the dot as 'Right Here'. It tells the browser: 'Look for this file in the exact same folder I'm in right now!'.",
          "mechanism": ".",
          "code": "./image.jpg"
        },
        "visualExample": "<div>[ Folder A ] -> (You are here) -> [ image.jpg ]</div>"
      },
      {
        "hook": "What if the file is inside a Folder called 'Assets'? Pick the correct path.",
        "interactionType": "multiple-choice",
        "options": ["/assets.img", "assets/image.jpg", ".../image"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Think of the slash (/) as 'Go Into'. So assets/ says 'Go into the assets folder and find...' .",
          "mechanism": "Folder paths are separated by slashes in almost all web technology.",
          "code": "assets/photo.png"
        },
        "visualExample": "<div>[ Folder A ] -> [ assets ] -> [ photo.png ]</div>"
      },
      {
        "hook": "How do you tell the browser to 'Go Back' one level? We use the double-dot (..). Identify it.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "./"},
          {"text": "../"},
          {"text": "../../"}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Think of .. as the 'Undo' or 'Exit' button for your folder navigation.",
          "mechanism": "The double dot is used to reference the parent directory relative to the current file.",
          "code": "../index.html"
        },
        "visualExample": "<div>[ Parent Folder ] <- [ Current Folder ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Set an image src to 'images/logo.png'.",
      "hint": "Use <img src='...'>",
      "startingCode": "",
      "solution": "<img src=\"images/logo.png\" alt=\"Logo\">",
      "tests": [
        "code.includes('src=\"images/logo.png\"')"
      ]
    }
  },
  {
    "id": "html-24",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML Head",
    "xp": 40,
    "interactive_steps": [
      {
        "hook": "The <head> is the brain of your page. It's where the browser stores important 'Information about Information'. Where do visitors see this content?",
        "interactionType": "multiple-choice",
        "options": ["On the screen", "They DON'T see it (mostly)", "In the Footer"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Metadata is for the computer and for Google—not for human eyes. It's the 'Behind the Scenes' work that makes the magic happen.",
          "mechanism": "The <head> element is a container for metadata and is placed between the <html> tag and the <body> tag.",
          "code": "<head>\n  <!-- Brain content -->\n</head>"
        },
        "visualExample": "<div>[ Hidden Master Brain ]</div>"
      },
      {
        "hook": "Identify the tag that describes the 'Character Encoding' (how text is handled) for your page.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<meta"},
          {"text": " charset="},
          {"text": "\"UTF-8\""}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "UTF-8 is like the 'Global Alphabet'! It tells the browser how to read every language from English to Emoji correctly.",
          "mechanism": "The charset attribute covers almost all characters and symbols in the world.",
          "code": "<meta charset=\"UTF-8\">"
        },
        "visualExample": "<div style='font-family: serif;'>Characters: A B C ✨ 🌍</div>"
      }
    ],
    "challenge": {
      "instruction": "Add a <meta charset=\"UTF-8\"> tag inside the <head>.",
      "hint": "Use <head> <meta charset=\"UTF-8\"> </head>",
      "startingCode": "<head>\n\n</head>",
      "solution": "<head>\n  <meta charset=\"UTF-8\">\n</head>",
      "tests": [
        "code.includes('<meta')",
        "code.includes('charset=\"UTF-8\"')"
      ]
    }
  },
  {
    "id": "html-25",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML Layout Semantics",
    "xp": 65,
    "interactive_steps": [
      {
        "hook": "Semantic elements are 'Meaningful'. Instead of just saying 'A Box' (div), you say 'The Header'. Predict why this is useful.",
        "interactionType": "multiple-choice",
        "options": ["Better for Search Engines & Accessibility", "Makes the text bigger", "Changes the background to gold"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of a Map. Without labels, towns are just circles. With labels, you know where to go! Semantic tags help Screen Readers and Google understand your page layout.",
          "mechanism": "A semantic element clearly describes its meaning to both the browser and the developer.",
          "code": "<header>\n  <h1>Page Title</h1>\n</header>"
        },
        "visualExample": "<div style='display: grid; gap: 5px;'>\n  <div style='background: #f1f5f9; padding: 10px; border: 1px solid #7c3aed; text-align: center;'>[ Header ]</div>\n  <div style='background: #fff; padding: 25px; border: 1px solid #ddd; text-align: center;'>[ Main Content ]</div>\n  <div style='background: #f8fafc; padding: 10px; border: 1px solid #64748b; text-align: center;'>[ Footer ]</div>\n</div>"
      },
      {
        "hook": "Identify the tag used for 'The main navigation links' of a website.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "<section>"},
          {"text": "<nav>"},
          {"text": "<aside>"}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Nav is for Navigation! It flags the list of links so Google knows: 'Here is the menu for this site'.",
          "mechanism": "The <nav> element is intended for major blocks of navigation links.",
          "code": "<nav>\n  <a href=\"/home\">Home</a>\n</nav>"
        },
        "visualExample": "<div>[ Home ] [ About ] [ Services ]</div>"
      },
      {
        "hook": "Where do you put the copyright notice and contact info? Usually at the VERY bottom.",
        "interactionType": "multiple-choice",
        "options": ["<footer>", "<bottom>", "<end>"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Footer stays at the Foot! It's the closing section of your page where the technical details live.",
          "mechanism": "The <footer> element typically contains the author, copyright, and contact info.",
          "code": "<footer>© 2024 Skill-Orbit</footer>"
        },
        "visualExample": "<div style='background: #1e293b; color: #fff; padding: 10px; text-align: center; border-radius: 4px;'>© FOOTER CONTENT</div>"
      }
    ],
    "challenge": {
      "instruction": "Create a <nav> element with a link (<a>) inside it.",
      "hint": "Use <nav> <a href='#'>Home</a> </nav>",
      "startingCode": "",
      "solution": "<nav>\n  <a href=\"#\">Home</a>\n</nav>",
      "tests": [
        "code.includes('<nav>')",
        "code.includes('<a>')",
        "code.includes('</a>')",
        "code.includes('</nav>')"
      ]
    }
  },
  {
    "id": "html-26",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML Responsive Design",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "Ever noticed how websites look different on your phone vs your laptop? That's called 'Response Design'. Predict the goal.",
        "interactionType": "multiple-choice",
        "options": ["To make the site look good on all screen sizes", "To make the site only for mobile", "To make the site only for large monitors"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Like a liquid that takes the shape of its container, a responsive website 'Flows' to fit the screen, whether it's a 4K TV or a tiny iPhone.",
          "mechanism": "Responsive Web Design is about creating web pages that look good on all devices!",
          "code": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        },
        "visualExample": "<div>[ Tablet Size ] <-> [ Phone Size ]</div>"
      },
      {
        "hook": "The most important tag for this is the Viewport Meta tag. Identify the 'content' attribute value that sets the initial zoom.",
        "interactionType": "code-spotlight",
        "codeParts": [
          {"text": "width=device-width,"},
          {"text": " initial-scale=1.0"}
        ],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Initial-scale 1.0 tells the browser: 'Dont zoom out like a crazy person. Keep everything at its normal 100% size!'",
          "mechanism": "This prevents mobile browsers from rendering the page as a tiny desktop site.",
          "code": "initial-scale=1.0"
        },
        "visualExample": "<div style='font-family: monospace;'>initial-scale=<span style='color: #0ea5e9;'>1.0</span></div>"
      }
    ],
    "challenge": {
      "instruction": "Add the viewport meta tag inside the <head>.",
      "hint": "Use <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "startingCode": "<head>\n\n</head>",
      "solution": "<head>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n</head>",
      "tests": [
        "code.includes('viewport')",
        "code.includes('device-width')",
        "code.includes('initial-scale=1.0')"
      ]
    }
  },
  {
    "id": "html-finish",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML — Final Quiz",
    "xp": 100,
    "interactive_steps": [
      {
        "hook": "Congratulations! You've mastered the Skeleton of the Web. Let's do a quick final check. Which tag is the 'Brain' of the page?",
        "interactionType": "multiple-choice",
        "options": ["<body>", "<html>", "<head>"],
        "correctIndex": 2,
        "explanation": {
          "intuition": "Bingo! The <head> handles the 'Brain' work (metadata), while the <body> handles the 'Visible' parts.",
          "mechanism": ".",
          "code": "<head>\n  <title>Master!</title>\n</head>"
        },
        "visualExample": "<div>🎓 Graduation: HTML Mastered</div>"
      }
    ],
    "challenge": {
      "instruction": "Create a full HTML structure with <html>, <head>, and <body> tags.",
      "hint": "Put <html> as the parent.",
      "startingCode": "",
      "solution": "<html>\n  <head></head>\n  <body></body>\n</html>",
      "tests": [
        "code.includes('<html>')",
        "code.includes('<head>')",
        "code.includes('<body>')"
      ]
    }
  },

  // --- CSS MODULE ---
  // --- CSS MODULE (1/2: Basics & Layout) ---
  {
    "id": "css-01",
    "module": "css",
    "section": "CSS Fundamentals",
    "title": "What is CSS?",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "Goal: Understand the 'Separation of Concerns'. CSS handles the LOOKS, while HTML handles the BONES.",
        "interactionType": "multiple-choice",
        "options": ["Style", "Structure", "Logic"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "HTML is the skeleton. CSS is the skin and clothes. They work together, but have different jobs.",
          "mechanism": ".",
          "code": "/* CSS handles the style */"
        },
        "visualExample": "<div style='display: flex; gap: 10px;'><div style='padding: 5px; border: 1px solid #ddd;'>HTML Only</div><div style='padding: 5px; background: #7c3aed; color: white; border-radius: 4px;'>HTML + CSS</div></div>"
      }
    ],
    "challenge": {
      "instruction": "Just click check—we're just getting started with the concept!",
      "hint": "CSS = Styling.",
      "startingCode": "/* CSS is a Style Sheet Language */",
      "solution": "/* CSS is a Style Sheet Language */",
      "tests": ["true"]
    }
  },
  {
    "id": "css-02",
    "module": "css",
    "section": "CSS Fundamentals",
    "title": "CSS Syntax",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "👉 Mental Model: Selector { Property: Value; }",
        "interactionType": "multiple-choice",
        "options": ["Selector", "Property", "Value"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "The Selector is the 'Target'. It tells the browser WHERE to apply the style.",
          "mechanism": "syntax: selector { property: value; }",
          "code": "h1 { color: red; }"
        },
        "visualExample": "<div style='font-family: monospace;'>[ h1 ] { color: red; }</div>"
      }
    ],
    "challenge": {
      "instruction": "Complete the rule to make 'p' tags 'blue'.",
      "hint": "p { color: blue; }",
      "startingCode": "p {\n  color: ;\n}",
      "solution": "p {\n  color: blue;\n}",
      "tests": ["code.includes('blue')", "code.includes('color')"]
    }
  },
  {
    "id": "css-03",
    "module": "css",
    "section": "CSS Fundamentals",
    "title": "Applying CSS",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "There are 3 ways: Inline, Internal, or External. Which is best for large websites?",
        "interactionType": "multiple-choice",
        "options": ["Inline", "Internal", "External (External Link)"],
        "correctIndex": 2,
        "explanation": {
          "intuition": "External CSS lets you style 1,000 pages with 1 file. It's the standard for professionals.",
          "mechanism": ".",
          "code": "<link rel='stylesheet' href='styles.css'>"
        },
        "visualExample": "<div>[ HTML File ] <--- link ---> [ CSS File ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Link an external sheet named 'main.css'.",
      "hint": "<link rel='stylesheet' href='main.css'>",
      "startingCode": "",
      "solution": "<link rel='stylesheet' href='main.css'>",
      "tests": ["code.includes('main.css')", "code.includes('stylesheet')"]
    }
  },
  {
    "id": "css-04",
    "module": "css",
    "section": "CSS Fundamentals",
    "title": "CSS Comments",
    "xp": 40,
    "interactive_steps": [
      {
        "hook": "Comments help humans read code. The browser ignores them completely.",
        "interactionType": "multiple-choice",
        "options": ["// Comment", "/* Comment */", "<!-- Comment -->"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "CSS uses the slash-star syntax. It can span multiple lines!",
          "mechanism": ".",
          "code": "/* This is a comment */"
        },
        "visualExample": "<div style='color: #64748b; font-style: italic;'>/* Browser can't see me! */</div>"
      }
    ],
    "challenge": {
      "instruction": "Add a comment: /* Header styles */",
      "hint": "Use /* and */",
      "startingCode": "",
      "solution": "/* Header styles */",
      "tests": ["code.includes('/*')", "code.includes('*/')", "code.includes('Header')"]
    }
  },
  {
    "id": "css-05",
    "module": "css",
    "section": "Selectors",
    "title": "Element & Grouping",
    "xp": 55,
    "interactive_steps": [
      {
        "hook": "Grouping lets you apply the same style to many elements at once.",
        "interactionType": "multiple-choice",
        "options": ["h1 h2", "h1, h2", "h1 + h2"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Use a comma to say 'AND'. Targeted: h1 AND h2.",
          "mechanism": ".",
          "code": "h1, h2, p { color: grey; }"
        },
        "visualExample": "<h1>Header</h1><h2>Subheader</h2> (Both styled together)"
      }
    ],
    "challenge": {
      "instruction": "Target 'h1' and 'p' together and set color to 'red'.",
      "hint": "h1, p { color: red; }",
      "startingCode": "",
      "solution": "h1, p {\n  color: red;\n}",
      "tests": ["code.includes(',')", "code.includes('red')", "code.includes('h1')", "code.includes('p')"]
    }
  },
  {
    "id": "css-06",
    "module": "css",
    "section": "Selectors",
    "title": "Class & ID",
    "xp": 65,
    "interactive_steps": [
      {
        "hook": "Classes are like labels (many items). IDs are like Passports (one item).",
        "interactionType": "multiple-choice",
        "options": [".class and #id", "#class and .id", "@class and %id"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Dot for Class, Hash for ID. Always prefer classes for styling!",
          "mechanism": ".",
          "code": ".btn { ... } #header { ... }"
        },
        "visualExample": "<div style='border: 1px solid #ddd; padding: 5px;'>.item .item [ #unique-id ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Target an element with the ID 'main' and set its width to '500px'.",
      "hint": "Use #main { width: 500px; }",
      "startingCode": "",
      "solution": "#main {\n  width: 500px;\n}",
      "tests": ["code.includes('#main')", "code.includes('500px')"]
    }
  },
  {
    "id": "css-07",
    "module": "css",
    "section": "Selectors",
    "title": "Descendant Selectors",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "Goal: Target elements INSIDE other elements. 👉 Precision styling.",
        "interactionType": "multiple-choice",
        "options": ["div, p", "div p", "div > p"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "A space means 'inside'. 'div p' targets paragraphs only if they are inside a div.",
          "mechanism": ".",
          "code": "nav a { color: white; }"
        },
        "visualExample": "<div><p>Targeted</p></div> <p>Not Targeted</p>"
      }
    ],
    "challenge": {
      "instruction": "Target all 'span' tags inside 'p' tags and set color to 'green'.",
      "hint": "Use p span { color: green; }",
      "startingCode": "",
      "solution": "p span {\n  color: green;\n}",
      "tests": ["code.includes('p span')", "code.includes('green')"]
    }
  },
  {
    "id": "css-08",
    "module": "css",
    "section": "Selectors",
    "title": "Pseudo-classes",
    "xp": 70,
    "interactive_steps": [
      {
        "hook": "Pseudo-classes target an element in a specific STATE. Like when a user HOVERS.",
        "interactionType": "multiple-choice",
        "options": [":hover", ":click", ":touch"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "It's like a 'temporary' style that only appears when an action happens.",
          "mechanism": ".",
          "code": "button:hover { background: gold; }"
        },
        "visualExample": "<button style='padding:10px; background:#7c3aed; color:white; border-radius:6px;'>Hover over me in your mind!</button>"
      }
    ],
    "challenge": {
      "instruction": "Make 'a' tags turn 'red' when hovered.",
      "hint": "a:hover { color: red; }",
      "startingCode": "",
      "solution": "a:hover {\n  color: red;\n}",
      "tests": ["code.includes('a:hover')", "code.includes('red')"]
    }
  },
  {
    "id": "css-09",
    "module": "css",
    "section": "Selectors",
    "title": "Pseudo-elements",
    "xp": 75,
    "interactive_steps": [
      {
        "hook": "Pseudo-elements create GHOST elements like ::before and ::after.",
        "interactionType": "multiple-choice",
        "options": ["::before", ":before", "@before"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "They add decorative content without changing the HTML structure. Use double colons (::) for modern CSS.",
          "mechanism": ".",
          "code": "h1::after { content: ' 🔥'; }"
        },
        "visualExample": "<h1>Title ::after [ 🔥 ]</h1>"
      }
    ],
    "challenge": {
      "instruction": "Add the content '→' AFTER every 'a' tag using a pseudo-element.",
      "hint": "a::after { content: '→'; }",
      "startingCode": "",
      "solution": "a::after {\n  content: '→';\n}",
      "tests": ["code.includes('a::after')", "code.includes('content')", "code.includes('→')"]
    }
  },
  {
    "id": "css-10",
    "module": "css",
    "section": "Colors & Units",
    "title": "Working with Colors",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "RGBA adds an 'A' for Alpha (transparency). 0 is invisible, 1 is solid.",
        "interactionType": "multiple-choice",
        "options": ["rgba(0,0,0,0.5)", "rgba(0,0,0)", "rgba(50%)"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "This is how you get those cool glassmorphic effects on modern sites.",
          "mechanism": ".",
          "code": "background: rgba(255, 255, 255, 0.2);"
        },
        "visualExample": "<div style='background: rgba(124, 58, 237, 0.3); padding: 10px;'>50% Transparent Purple</div>"
      }
    ],
    "challenge": {
      "instruction": "Set background-color to a semi-transparent black (alpha 0.5).",
      "hint": "rgba(0, 0, 0, 0.5)",
      "startingCode": "div {\n  background-color: ;\n}",
      "solution": "div {\n  background-color: rgba(0, 0, 0, 0.5);\n}",
      "tests": ["code.includes('rgba')", "code.includes('0.5')"]
    }
  },
  {
    "id": "css-11",
    "module": "css",
    "section": "Colors & Units",
    "title": "The 'rem' Standard",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "👉 Deep Insight: 'px' is fixed. 'rem' is relative to the User's settings.",
        "interactionType": "multiple-choice",
        "options": ["rem", "px", "em"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "If a user has poor vision and sets their font to 'Large' in the browser, 'rem' scales with them. 'px' stays small and breaks accessibility.",
          "mechanism": ".",
          "code": "font-size: 1.5rem;"
        },
        "visualExample": "<div>[ Text @ 1rem ] vs [ Text @ 2rem ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Set the font-size of 'body' to '1.2rem'.",
      "hint": "body { font-size: 1.2rem; }",
      "startingCode": "",
      "solution": "body {\n  font-size: 1.2rem;\n}",
      "tests": ["code.includes('1.2rem')"]
    }
  },
  {
    "id": "css-12",
    "module": "css",
    "section": "Colors & Units",
    "title": "Relative & Viewport Units",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "vh/vw standing for Viewport Height and Viewport Width. 100vh = full screen height.",
        "interactionType": "multiple-choice",
        "options": ["100vh", "100%", "100px"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Perfect for hero sections that should always fill the user's screen exactly.",
          "mechanism": ".",
          "code": "height: 100vh;"
        },
        "visualExample": "<div>[ Full Screen Height ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Set the height of a '.hero' section to '100% of the viewport height'.",
      "hint": "height: 100vh;",
      "startingCode": ".hero {\n\n}",
      "solution": ".hero {\n  height: 100vh;\n}",
      "tests": ["code.includes('100vh')"]
    }
  },
  {
    "id": "css-13",
    "module": "css",
    "section": "Layout Physics",
    "title": "Box Model Layers",
    "xp": 80,
    "interactive_steps": [
      {
        "hook": "Mental Model: Content > Padding > Border > Margin. Which one is INSIDE the border?",
        "interactionType": "multiple-choice",
        "options": ["Padding", "Margin", "Ghost"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Padding is the 'air' inside the room. Margin is the 'fence' separating you from neighbors.",
          "mechanism": ".",
          "code": "padding: 20px; border: 1px solid; margin: 10px;"
        },
        "visualExample": "<div style='border: 1px solid #7c3aed; padding: 10px; margin: 10px; background: #e2e8f0;'>[ Content Area ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Add 20px of padding and 50px of margin to all 'div' tags.",
      "hint": "padding: 20px; margin: 50px;",
      "startingCode": "",
      "solution": "div {\n  padding: 20px;\n  margin: 50px;\n}",
      "tests": ["code.includes('padding: 20px')", "code.includes('margin: 50px')"]
    }
  },
  {
    "id": "css-14",
    "module": "css",
    "section": "Layout Physics",
    "title": "Box Sizing",
    "xp": 85,
    "interactive_steps": [
      {
        "hook": "👉 CRITICAL: By default, padding makes boxes BIGGER than their width. How do we fix this?",
        "interactionType": "multiple-choice",
        "options": ["box-sizing: border-box", "box-sizing: content-box", "display: flow"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Border-box forces the box to include padding/border inside the width you set. No more 101% width bugs!",
          "mechanism": ".",
          "code": "* { box-sizing: border-box; }"
        },
        "visualExample": "<div>[ Precise 300px width with padding ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Apply the professional reset: Set all elements (*) to 'border-box'.",
      "hint": "* { box-sizing: border-box; }",
      "startingCode": "* {\n\n}",
      "solution": "* {\n  box-sizing: border-box;\n}",
      "tests": ["code.includes('*')", "code.includes('border-box')"]
    }
  },
  {
    "id": "css-15",
    "module": "css",
    "section": "Layout Physics",
    "title": "Margin Collapsing",
    "xp": 70,
    "interactive_steps": [
      {
        "hook": "Weird Fact: Vertical margins 'merge' (collapse) into the largest one. Horizontal ones DON'T.",
        "interactionType": "multiple-choice",
        "options": ["They add up", "They merge", "They disappear"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "If Item A has 20px bottom margin and Item B has 30px top margin, the gap is 30px, NOT 50px.",
          "mechanism": ".",
          "code": "/* Only vertical margins collapse */"
        },
        "visualExample": "<div>[ Item A ]</div> 30px Gap <div>[ Item B ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Set margin-bottom to '30px' for 'h1' tags.",
      "hint": "margin-bottom: 30px;",
      "startingCode": "",
      "solution": "h1 {\n  margin-bottom: 30px;\n}",
      "tests": ["code.includes('margin-bottom')", "code.includes('30px')"]
    }
  },
  {
    "id": "css-16",
    "module": "css",
    "section": "Typography",
    "title": "Font Styling",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "Goal: Make content readable. 👉 font-family is your primary design choice.",
        "interactionType": "multiple-choice",
        "options": ["font-family", "text-family", "font-style"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of it as the 'Handwriting' of your website. Professional sites often use 'sans-serif' for clarity.",
          "mechanism": ".",
          "code": "font-family: 'Inter', sans-serif;"
        },
        "visualExample": "<div style='font-family: serif;'>Serif Text</div> <div style='font-family: sans-serif;'>Sans-Serif Text</div>"
      }
    ],
    "challenge": {
      "instruction": "Set the font-family of 'body' to 'Arial'.",
      "hint": "font-family: Arial;",
      "startingCode": "",
      "solution": "body {\n  font-family: Arial;\n}",
      "tests": ["code.includes('font-family')", "code.includes('Arial')"]
    }
  },
  {
    "id": "css-17",
    "module": "css",
    "section": "Typography",
    "title": "Line-height & Spacing",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "Line-height is the 'Breathing Room' between sentences. 👉 Vital for readability.",
        "interactionType": "multiple-choice",
        "options": ["1.2", "1.6", "0.8"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "A line-height of 1.5 or 1.6 is the 'Sweet Spot' for web reading. It prevents lines from looking cramped.",
          "mechanism": ".",
          "code": "line-height: 1.6;"
        },
        "visualExample": "<p style='line-height: 1.6;'>This text is easy to read because it has space to breathe.</p>"
      }
    ],
    "challenge": {
      "instruction": "Set line-height to '1.5' for all 'p' tags.",
      "hint": "line-height: 1.5;",
      "startingCode": "",
      "solution": "p {\n  line-height: 1.5;\n}",
      "tests": ["code.includes('line-height')", "code.includes('1.5')"]
    }
  },
  {
    "id": "css-18",
    "module": "css",
    "section": "Typography",
    "title": "Text Decoration & Transforms",
    "xp": 40,
    "interactive_steps": [
      {
        "hook": "Use text-transform to force text to be UPPERCASE without changing the HTML.",
        "interactionType": "multiple-choice",
        "options": ["uppercase", "capitalize", "lowercase"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Great for headers and buttons where you want a consistent look regardless of how the data was typed.",
          "mechanism": ".",
          "code": "text-transform: uppercase;"
        },
        "visualExample": "<div style='text-transform: uppercase;'>i was lowercase</div>"
      }
    ],
    "challenge": {
      "instruction": "Set 'h2' tags to 'uppercase' and 'underline' them using text-decoration.",
      "hint": "text-transform: uppercase; text-decoration: underline;",
      "startingCode": "",
      "solution": "h2 {\n  text-transform: uppercase;\n  text-decoration: underline;\n}",
      "tests": ["code.includes('uppercase')", "code.includes('underline')"]
    }
  },
  {
    "id": "css-19",
    "module": "css",
    "section": "Visual Styling",
    "title": "Professional Borders",
    "xp": 55,
    "interactive_steps": [
      {
        "hook": "Borders don't just have to be black lines. Border-radius creates those 'App-like' rounded corners.",
        "interactionType": "multiple-choice",
        "options": ["border-radius: 8px", "border-round: 8px", "corner-radius: 8px"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Rounded corners make a UI feel friendly and modern. 50% radius creates a perfect circle!",
          "mechanism": ".",
          "code": "border-radius: 50%;"
        },
        "visualExample": "<div style='width:40px;height:40px;background:#7c3aed;border-radius:50%;'></div>"
      }
    ],
    "challenge": {
      "instruction": "Create a '2px solid black' border with a '12px' radius for '.card'.",
      "hint": "border: 2px solid black; border-radius: 12px;",
      "startingCode": ".card {\n\n}",
      "solution": ".card {\n  border: 2px solid black;\n  border-radius: 12px;\n}",
      "tests": ["code.includes('solid')", "code.includes('12px')"]
    }
  },
  {
    "id": "css-20",
    "module": "css",
    "section": "Visual Styling",
    "title": "Background Mastery",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "👉 Mental Model: background-size: cover ensures your image fills the box without stretching.",
        "interactionType": "multiple-choice",
        "options": ["cover", "contain", "fill"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Cover 'crops' the image to fit. Contain 'shrinks' the image to fit entirely inside. 90% of the time, you want 'Cover'.",
          "mechanism": ".",
          "code": "background-size: cover;"
        },
        "visualExample": "<div style='background: linear-gradient(to right, #4facfe, #00f2fe); height: 40px; border-radius: 8px;'></div>"
      }
    ],
    "challenge": {
      "instruction": "Set a linear gradient background from 'blue' to 'purple' for 'body'.",
      "hint": "background: linear-gradient(blue, purple);",
      "startingCode": "",
      "solution": "body {\n  background: linear-gradient(blue, purple);\n}",
      "tests": ["code.includes('linear-gradient')", "code.includes('blue')"]
    }
  },
  {
    "id": "css-21",
    "module": "css",
    "section": "Layout Behavior",
    "title": "Block vs Inline",
    "xp": 65,
    "interactive_steps": [
      {
        "hook": "Block elements (div) start on a new line. Inline (span) sit next to each other. Which is a link (<a>)?",
        "interactionType": "multiple-choice",
        "options": ["Inline", "Block", "Hidden"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Links flow with text (inline). Sections stack on top of each other (block).",
          "mechanism": ".",
          "code": "display: inline-block; /* The hybrid */"
        },
        "visualExample": "<div>Block</div> <span>Inline</span> <span>Inline</span>"
      }
    ],
    "challenge": {
      "instruction": "Set '.box' to display as 'inline-block' so it can have width but stay on the same line.",
      "hint": "display: inline-block;",
      "startingCode": ".box {\n\n}",
      "solution": ".box {\n  display: inline-block;\n}",
      "tests": ["code.includes('inline-block')"]
    }
  },
  {
    "id": "css-22",
    "module": "css",
    "section": "Layout Behavior",
    "title": "Visibility Control",
    "xp": 50,
    "interactive_steps": [
      {
        "hook": "👉 Difference: display: none deletes the item. visibility: hidden keeps the space but hides the item.",
        "interactionType": "multiple-choice",
        "options": ["display: none", "visibility: hidden"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Use display: none to completely remove an element from the layout (like a closed mobile menu).",
          "mechanism": ".",
          "code": "display: none;"
        },
        "visualExample": "<div>Item A</div> [Hidden Item] <div>Item B</div>"
      }
    ],
    "challenge": {
      "instruction": "Hide an element with class 'popup' using the method that RELEASES its layout space.",
      "hint": "Use display: none;",
      "startingCode": ".popup {\n\n}",
      "solution": ".popup {\n  display: none;\n}",
      "tests": ["code.includes('display: none')"]
    }
  },
  {
    "id": "css-23",
    "module": "css",
    "section": "Placement",
    "title": "Relative & Absolute",
    "xp": 80,
    "interactive_steps": [
      {
        "hook": "👉 Mental Model: Parent = Relative (Anchor), Child = Absolute (Teleport).",
        "interactionType": "multiple-choice",
        "options": ["Relative", "Absolute", "Static"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Absolute elements 'teleport' to the nearest parent that has position: relative. Perfect for badges on icons.",
          "mechanism": ".",
          "code": "position: absolute; top: 0; right: 0;"
        },
        "visualExample": "<div style='position:relative; width:60px; height:60px; background:#ddd;'><div style='position:absolute; top:-5px; right:-5px; background:red; color:white; width:20px; height:20px; border-radius:50%; text-align:center;'>1</div></div>"
      }
    ],
    "challenge": {
      "instruction": "Set '.parent' to 'relative' and '.child' to 'absolute' at the 'top: 10px'.",
      "hint": "position: relative and position: absolute.",
      "startingCode": ".parent {\n\n}\n.child {\n\n}",
      "solution": ".parent {\n  position: relative;\n}\n.child {\n  position: absolute;\n  top: 10px;\n}",
      "tests": ["code.includes('relative')", "code.includes('absolute')", "code.includes('10px')"]
    }
  },
  {
    "id": "css-24",
    "module": "css",
    "section": "Placement",
    "title": "Fixed & Sticky",
    "xp": 75,
    "interactive_steps": [
      {
        "hook": "Fixed stays at the screen position forever. Sticky stays until its parent scrolls away.",
        "interactionType": "multiple-choice",
        "options": ["position: sticky", "position: fixed", "position: static"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Sticky is great for table headers or sidebars that should 'follow' you as you read a section.",
          "mechanism": ".",
          "code": "position: sticky; top: 0;"
        },
        "visualExample": "<div>[ Navbar Header ] (stuck to top)</div>"
      }
    ],
    "challenge": {
      "instruction": "Make the header with ID 'navbar' stay at the top of the screen even as you scroll.",
      "hint": "position: fixed; top: 0;",
      "startingCode": "#navbar {\n\n}",
      "solution": "#navbar {\n  position: fixed;\n  top: 0;\n  width: 100%;\n}",
      "tests": ["code.includes('fixed')", "code.includes('top: 0')"]
    }
  },
  {
    "id": "css-25",
    "module": "css",
    "section": "Placement",
    "title": "Z-Index Mastering",
    "xp": 70,
    "interactive_steps": [
      {
        "hook": "👉 Rule: Z-Index ONLY works on positioned elements (Relative, Absolute, Fixed).",
        "interactionType": "multiple-choice",
        "options": ["Positioned", "Static", "All elements"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Think of it as 'Layers' on a sandwich. Higher Z-Index = Closer to your face.",
          "mechanism": ".",
          "code": "z-index: 999; /* Top layer */"
        },
        "visualExample": "<div>[ Bottom ] [ Top ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Bring class '.modal' to the very front using z-index.",
      "hint": "z-index: 100; (ensure it's positioned!)",
      "startingCode": ".modal {\n  position: fixed;\n}",
      "solution": ".modal {\n  position: fixed;\n  z-index: 100;\n}",
      "tests": ["code.includes('z-index')", "code.includes('100')"]
    }
  },
  {
    "id": "css-26",
    "module": "css",
    "section": "Alignment Engine",
    "title": "Flexbox Basics",
    "xp": 80,
    "interactive_steps": [
      {
        "hook": "👉 Deep Insight: Flexbox = alignment engine. As soon as you say display: flex, your items become 'Masters of the Line'.",
        "interactionType": "multiple-choice",
        "options": ["display: flex", "display: grid", "display: flow"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Flexbox is 1-dimensional. It handles items in a row or a column. Perfect for navbars and simple grids.",
          "mechanism": ".",
          "code": "display: flex;"
        },
        "visualExample": "<div style='display: flex; gap: 5px; background: #f1f5f9; padding: 5px;'><div style='width: 20px; height: 20px; background: #7c3aed;'></div><div style='width: 20px; height: 20px; background: #7c3aed;'></div></div>"
      }
    ],
    "challenge": {
      "instruction": "Turn the '.container' into a flex container.",
      "hint": "display: flex;",
      "startingCode": ".container {\n\n}",
      "solution": ".container {\n  display: flex;\n}",
      "tests": ["code.includes('display: flex')"]
    }
  },
  {
    "id": "css-27",
    "module": "css",
    "section": "Alignment Engine",
    "title": "Flex Justify",
    "xp": 70,
    "interactive_steps": [
      {
        "hook": "justify-content aligns items along the MAIN axis (left to right by default).",
        "interactionType": "multiple-choice",
        "options": ["center", "space-between", "space-around"],
        "correctIndex": 1,
        "explanation": {
          "intuition": "Space-between pushes items to the edges (like a navbar with a logo on the left and links on the right).",
          "mechanism": ".",
          "code": "justify-content: space-between;"
        },
        "visualExample": "<div style='display: flex; justify-content: space-between; background: #f1f5f9; padding: 5px;'><div style='width: 15px; height: 15px; background: #7c3aed;'></div><div style='width: 15px; height: 15px; background: #7c3aed;'></div></div>"
      }
    ],
    "challenge": {
      "instruction": "Center all items horizontally in a flex container.",
      "hint": "justify-content: center;",
      "startingCode": ".container {\n  display: flex;\n}",
      "solution": ".container {\n  display: flex;\n  justify-content: center;\n}",
      "tests": ["code.includes('justify-content: center')"]
    }
  },
  {
    "id": "css-28",
    "module": "css",
    "section": "Alignment Engine",
    "title": "Flex Align",
    "xp": 70,
    "interactive_steps": [
      {
        "hook": "align-items aligns items along the CROSS axis (top to bottom by default).",
        "interactionType": "multiple-choice",
        "options": ["align-items", "justify-items", "content-align"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Combining justify-content: center and align-items: center is the #1 way to perfectly center anything in CSS.",
          "mechanism": ".",
          "code": "align-items: center;"
        },
        "visualExample": "<div style='display: flex; align-items: center; height: 40px; background: #f1f5f9; padding: 5px;'><div style='width: 15px; height: 15px; background: #7c3aed;'></div></div>"
      }
    ],
    "challenge": {
      "instruction": "Perfectly center an item inside a 200px container.",
      "hint": "display: flex; justify-content: center; align-items: center;",
      "startingCode": ".container {\n  height: 200px;\n}",
      "solution": ".container {\n  height: 200px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
      "tests": ["code.includes('flex')", "code.includes('center')"]
    }
  },
  {
    "id": "css-29",
    "module": "css",
    "section": "Alignment Engine",
    "title": "Flex Wrapping",
    "xp": 60,
    "interactive_steps": [
      {
        "hook": "By default, flex items try to fit on ONE line. flex-wrap lets them jump to the next row.",
        "interactionType": "multiple-choice",
        "options": ["wrap", "nowrap", "flow"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Essential for responsive galleries or tags that shouldn't overflow the screen.",
          "mechanism": ".",
          "code": "flex-wrap: wrap;"
        },
        "visualExample": "<div style='display: flex; flex-wrap: wrap; gap: 5px; width: 50px;'><div style='width: 20px; height: 20px; background: #7c3aed;'></div><div style='width: 20px; height: 20px; background: #7c3aed;'></div></div>"
      }
    ],
    "challenge": {
      "instruction": "Allow flex items to wrap to a new line.",
      "hint": "flex-wrap: wrap;",
      "startingCode": ".tags {\n  display: flex;\n}",
      "solution": ".tags {\n  display: flex;\n  flex-wrap: wrap;\n}",
      "tests": ["code.includes('wrap')"]
    }
  },
  {
    "id": "css-30",
    "module": "css",
    "section": "2D Architect",
    "title": "Grid Structure",
    "xp": 90,
    "interactive_steps": [
      {
        "hook": "👉 Flexbox = 1D | Grid = 2D. Grid is for the WHOLE page layout.",
        "interactionType": "multiple-choice",
        "options": ["display: grid", "display: flex", "display: table"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "fr stands for 'Fraction'. '1fr 2fr' means: 'One part to the left, two parts to the right'.",
          "mechanism": ".",
          "code": "grid-template-columns: 1fr 2fr;"
        },
        "visualExample": "<div style='display: grid; grid-template-columns: 1fr 2fr; gap: 5px;'><div style='background: #7c3aed; height: 15px;'></div><div style='background: #a78bfa; height: 15px;'></div></div>"
      }
    ],
    "challenge": {
      "instruction": "Create a 3-column grid where each column is the same size.",
      "hint": "grid-template-columns: 1fr 1fr 1fr;",
      "startingCode": ".grid {\n  display: grid;\n}",
      "solution": ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}",
      "tests": ["code.includes('1fr 1fr 1fr')"]
    }
  },
  {
    "id": "css-31",
    "module": "css",
    "section": "2D Architect",
    "title": "Grid Gaps & Areas",
    "xp": 80,
    "interactive_steps": [
      {
        "hook": "grid-gap (or simply gap) is the easiest way to space items without messy margins.",
        "interactionType": "multiple-choice",
        "options": ["gap", "spacing", "padding"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "It sets the 'gutter' between items. It only applies BETWEEN items, not on the edges.",
          "mechanism": ".",
          "code": "gap: 20px;"
        },
        "visualExample": "<div style='display: grid; grid-template-columns: 1fr 1fr; gap: 15px;'><div style='background: #7c3aed; height: 15px;'></div><div style='background: #7c3aed; height: 15px;'></div></div>"
      }
    ],
    "challenge": {
      "instruction": "Set a '10px' gap between grid items.",
      "hint": "gap: 10px;",
      "startingCode": ".grid {\n  display: grid;\n}",
      "solution": ".grid {\n  display: grid;\n  gap: 10px;\n}",
      "tests": ["code.includes('gap: 10px')"]
    }
  },
  {
    "id": "css-32",
    "module": "css",
    "section": "2D Architect",
    "title": "Grid Spanning",
    "xp": 85,
    "interactive_steps": [
      {
        "hook": "You can make an item span multiple columns using grid-column.",
        "interactionType": "multiple-choice",
        "options": ["span 2", "col-2", "wide"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "Perfect for a header that needs to stretch across the full width of your grid.",
          "mechanism": ".",
          "code": "grid-column: span 2;"
        },
        "visualExample": "<div style='display: grid; grid-template-columns: 1fr 1fr; gap: 5px;'><div style='grid-column: span 2; background: #7c3aed; height: 10px;'></div><div style='background: #a78bfa; height: 10px;'></div><div style='background: #a78bfa; height: 10px;'></div></div>"
      }
    ],
    "challenge": {
      "instruction": "Make the '.featured' item span '3 columns'.",
      "hint": "grid-column: span 3;",
      "startingCode": ".featured {\n\n}",
      "solution": ".featured {\n  grid-column: span 3;\n}",
      "tests": ["code.includes('span 3')"]
    }
  },
  {
    "id": "css-33",
    "module": "css",
    "section": "Final Master",
    "title": "Media Queries",
    "xp": 90,
    "interactive_steps": [
      {
        "hook": "Media queries are the secret to Responsive Design. They say: 'Apply these styles ONLY if...'",
        "interactionType": "multiple-choice",
        "options": ["@media", "@screen", "@if"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "It's like a 'Condition' for your styles. If the screen is small, use different colors or layouts.",
          "mechanism": ".",
          "code": "@media (max-width: 600px) { ... }"
        },
        "visualExample": "<div>[ Mobile ] <--- @media ---> [ Desktop ]</div>"
      }
    ],
    "challenge": {
      "instruction": "Start a media query for screens smaller than '768px'.",
      "hint": "@media (max-width: 768px) { ... }",
      "startingCode": "",
      "solution": "@media (max-width: 768px) {\n\n}",
      "tests": ["code.includes('@media')", "code.includes('768px')"]
    }
  },
  {
    "id": "css-34",
    "module": "css",
    "section": "Final Master",
    "title": "Breakpoints & Mobile-first",
    "xp": 90,
    "interactive_steps": [
      {
        "hook": "Professional Tip: Build for MOBILE first, then add layers for Desktop.",
        "interactionType": "multiple-choice",
        "options": ["Mobile-first", "Desktop-first", "Chaos-first"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "It's easier to expand a simple layout than to squeeze a complex one.",
          "mechanism": ".",
          "code": "/* Default = mobile style. @media = desktop override. */"
        },
        "visualExample": "<div>🚀 Mobile 1st -> 📱 Tablet -> 💻 Desktop</div>"
      }
    ],
    "challenge": {
      "instruction": "Just click check—this is a professional philosophy!",
      "hint": "Mobile-first is industry standard.",
      "startingCode": "/* I will always design mobile-first! */",
      "solution": "/* I will always design mobile-first! */",
      "tests": ["true"]
    }
  },
  {
    "id": "css-35",
    "module": "css",
    "section": "Final Master",
    "title": "Final CSS Mastery Challenge",
    "xp": 150,
    "interactive_steps": [
      {
        "hook": "You have reached the peak of the CSS Orbit. Are you ready for the final project?",
        "interactionType": "multiple-choice",
        "options": ["YES", "I need more practice", "Maybe"],
        "correctIndex": 0,
        "explanation": {
          "intuition": "You've mastered Selectors, Box Model, Flexbox, Grid, and Responsiveness.",
          "mechanism": ".",
          "code": "/* Level 100 CSS Architect */"
        },
        "visualExample": "<div style='font-size: 2rem; text-align: center;'>🏆</div>"
      }
    ],
    "challenge": {
      "instruction": "Create a 'flex' container, with '1rem' gap, centered items, and a '5px' rounded border.",
      "hint": "display: flex; gap: 1rem; justify-content: center; align-items: center; border: 1px solid; border-radius: 5px;",
      "startingCode": ".master-container {\n\n}",
      "solution": ".master-container {\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  align-items: center;\n  border: 1px solid black;\n  border-radius: 5px;\n}",
      "tests": ["code.includes('flex')", "code.includes('1rem')", "code.includes('center')", "code.includes('5px')"]
    }
  }
];

