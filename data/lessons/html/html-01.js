window.LESSON_DATA_html_01 = {
  "id": "html-01",
  "module": "html",
  "title": "What is HTML?",
  "xp": 50,
  "theory": "",
  "interactive_steps": [
    {
      "type": "interaction",
      "hook": "Every website on the internet is built using three core technologies, similar to building a house. What do you think acts as the absolute structural foundation (the bricks and walls)?",
      "interactionType": "multiple-choice",
      "options": ["JavaScript (The Electricity)", "CSS (The Paint)", "HTML (The Bricks)"],
      "correctIndex": 2,
      "explanation": {
        "intuition": "Think of HTML as the foundation, walls, and rooms. It creates the absolute raw structure. Without it, there is no house.",
        "mechanism": "Browsers read HTML to understand what elements exist on the screen, completely separate from how they look or act.",
        "code": "<!-- Raw text without meaning -->\nHello Web World!"
      },
      "visualExample": "Hello Web World!"
    },
    {
      "type": "interaction",
      "hook": "HTML stands for HyperText Markup Language. It gives meaning to raw text using 'Tags'. Which of the following looks like a correct HTML tag?",
      "interactionType": "multiple-choice",
      "options": ["{h1}", "[h1]", "<h1>"],
      "correctIndex": 2,
      "explanation": {
        "intuition": "Tags act like a container. They wrap around your text to give it special meaning.",
        "mechanism": "The browser hides the tags from the screen and uses them purely as instructions to format the text inside them.",
        "code": "<h1>My Awesome Website</h1>"
      },
      "visualExample": "<h1>My Awesome Website</h1>"
    },
    {
      "type": "interaction",
      "hook": "If `<h1>` tells the browser where the heading starts, how do you completely stop the heading and tell the browser it is done?",
      "interactionType": "multiple-choice",
      "options": ["Type STOP", "Use a closing tag like </h1>", "Press the Enter key"],
      "correctIndex": 1,
      "explanation": {
        "intuition": "A closing tag is identical to the opening tag, but it contains a forward slash (/) immediately after the opening angle bracket.",
        "mechanism": "Without a closing tag, the browser will think your entire website is one giant, never-ending heading.",
        "code": "<h1>My awesome website</h1>\n<p>This is a normal paragraph beneath the heading.</p>"
      },
      "visualExample": "<h1>My awesome website</h1>\n<p>This is a normal paragraph beneath the heading.</p>"
    },
    {
      "type": "interaction",
      "hook": "Let's summarize. HTML's ONLY job is to define structure and meaning. Is it responsible for making things look pretty with colors?",
      "interactionType": "multiple-choice",
      "options": ["Yes, HTML handles colors", "No, CSS handles the colors"],
      "correctIndex": 1,
      "explanation": {
        "intuition": "Remember the house analogy: HTML is the bricks. CSS is the paint.",
        "mechanism": "We use a separate language (CSS) to paint the HTML elements so that they look beautiful.",
        "code": "<h1>A plain heading</h1>\n<h1 style=\"color:blue;\">A CSS-painted heading</h1>"
      },
      "visualExample": "<h1>A plain heading</h1>\n<h1 style=\"color:blue;\">A CSS-painted heading</h1>"
    }
  ],
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
    },
    {
      "question": "Which of these is the correct format for an HTML opening tag?",
      "options": [
        "{h1}",
        "(h1)",
        "<h1>",
        "[/h1]"
      ],
      "correct": 2
    },
    {
      "question": "What does the 'H' in HTML stand for?",
      "options": [
        "HyperText",
        "Home",
        "Hyper",
        "Host"
      ],
      "correct": 0
    }
  ]
};
