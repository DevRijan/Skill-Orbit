window.LESSON_DATA_html_03 = {
  "id": "html-03",
  "module": "html",
  "title": "HTML Document Structure",
  "xp": 150,
  "theory": "",
  "interactive_steps": [
    {
      "type": "interaction",
      "hook": "What happens if you type text into a browser without any HTML tags around it?",
      "interactionType": "multiple-choice",
      "options": ["The browser crashes permanently.", "The browser shows the text but has no idea what it is (no structure).", "It automatically adds tags for you."],
      "correctIndex": 1,
      "explanation": {
        "intuition": "Without HTML, the browser is confused. It needs a 'Universal Wrapper' to know it's reading web code.",
        "mechanism": "The `<html>` tag acts as the master container. Everything you build must be inside this tag. Nothing is allowed outside of it!",
        "code": "<html>\n  Hello Web!\n</html>"
      },
      "visualExample": "<html>Hello Web!</html>"
    },
    {
      "type": "interaction",
      "hook": "Every HTML document is split into two main sections: The 'Brain' and the 'Canvas'. Which tag represents the visible Canvas?",
      "interactionType": "multiple-choice",
      "options": ["<canvas>", "<body>", "<head>"],
      "correctIndex": 1,
      "explanation": {
        "intuition": "The `<head>` is the invisible brain behind the scenes. The `<body>` is the meat. Anything you want the user to actively see MUST go in the `<body>`.",
        "mechanism": "The browser renders content placed in the `<body>` into the main viewport. Content in the `<head>` is strictly hidden metadata.",
        "code": "<html>\n  <head>\n    <!-- Invisible data goes here -->\n  </head>\n  <body>\n    <h1>This heading is visible!</h1>\n  </body>\n</html>"
      },
      "visualExample": "<div style='border: 2px dashed #475569; padding: 1rem; border-radius: 8px; font-family: sans-serif;'><h1>This heading is visible!</h1></div>"
    },
    {
      "type": "interaction",
      "hook": "If the `<head>` is completely invisible to the user, what actually goes inside of it?",
      "interactionType": "multiple-choice",
      "options": ["Images and Videos", "Hidden Meta-Data (Like the text on the Browser Tab)", "Secret passwords"],
      "correctIndex": 1,
      "explanation": {
        "intuition": "Think of the `<head>` as settings for the document. One crucial setting is the `<title>`.",
        "mechanism": "The `<title>` tag does NOT appear on the white page. Instead, the browser reads it and places the text up in the Browser Application Tab.",
        "code": "<head>\n  <title>My Awesome Website</title>\n</head>"
      },
      "visualExample": "<div style='font-family: sans-serif;'><div style='background:#1e293b; padding:8px 12px; color:white; border-radius:8px 8px 0 0; width:max-content; font-size:12px; display:flex; align-items:center; gap:8px;'><i class='fa-solid fa-globe'></i> My Awesome Website &times;</div><div style='background:#f8fafc; height:60px; border:1px solid #e2e8f0; border-top:none; border-radius: 0 0 8px 8px; padding: 10px; color: #94a3b8; font-size: 0.9rem;'>Invisible document body</div></div>"
    },
    {
      "type": "interaction",
      "hook": "Browsers are old. Unless you tell them you are using modern HTML5, they will run in 'Old Quirks Mode' and ruin your design. How do we announce this?",
      "interactionType": "multiple-choice",
      "options": ["<use-html5>", "<!DOCTYPE html>", "<?xml version='1.0'?>"],
      "correctIndex": 1,
      "explanation": {
        "intuition": "It functions like an announcement megaphone at the very top of your file to warn the browser.",
        "mechanism": "`<!DOCTYPE html>` isn't actually an HTML tag! It's a declaration. You place it at the absolute top of the file (Line 1) to force the browser into standard mode.",
        "code": "<!DOCTYPE html>\n<html>\n  <head></head>\n  <body></body>\n</html>"
      },
      "visualExample": "<div style='font-family:sans-serif; padding:15px; border-left: 4px solid #10b981; background: #ecfdf5;'>Browser mode loaded: <strong style='color:#047857;'>Modern HTML5 Standard</strong></div>"
    },
    {
      "type": "interaction",
      "hook": "Because tags wrap inside each other, they create a 'Family Tree'. What is the golden rule for closing nested tags?",
      "interactionType": "multiple-choice",
      "options": ["Close them in random order.", "First in, First out.", "Close the innermost tag first, working your way outwards."],
      "correctIndex": 2,
      "explanation": {
        "intuition": "Think of Russian nesting dolls. You must close the inner doll before you can close the outer doll.",
        "mechanism": "If you open `<p>` and then open `<strong>`, the browser creates a parent-child relationship. You MUST close `</strong>` before you close `</p>` so the tags do not cross over.",
        "code": "<!-- CORRECT: Innermost is closed first -->\n<p>This is <strong>bold</strong> text.</p>\n\n<!-- WRONG: Tags cross over each other -->\n<p>This is <strong>bold</p> text.</strong>"
      },
      "visualExample": "<p style='margin:0; font-family: sans-serif; font-size: 1.1rem;'>This is <strong style='color:#e34c26;'>bold</strong> text.</p>"
    }
  ],
};
