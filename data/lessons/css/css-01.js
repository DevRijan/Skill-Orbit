window.LESSON_DATA_css_01 = {
  "id": "css-01",
  "module": "css",
  "title": "What is CSS?",
  "xp": 20,
  "theory": "",
  "interactive_steps": [
    {
      "type": "interaction",
      "hook": "If HTML creates the 'skeleton' (the basic structure) of a webpage, what language do we use to add 'clothes, skin, and makeup' like colors, fonts, and layout?",
      "interactionType": "multiple-choice",
      "options": ["HTML+", "JavaScript", "CSS (Cascading Style Sheets)"],
      "correctIndex": 2,
      "explanation": {
        "intuition": "CSS transforms a boring, plain-text skeleton into a beautiful, well-designed webpage.",
        "mechanism": "CSS specifically targets HTML elements and applies visual rules to them, controlling colors, spacing, borders, and responsive layouts.",
        "code": "/* A simple CSS rule */\nh1 {\n  color: royalblue;\n  font-size: 40px;\n}"
      },
      "visualExample": "<div style='display:flex; justify-content:center; gap: 20px; align-items:center;'><div style='border: 1px solid #475569; padding: 10px;'><h1 style='color: black; font-size: 16px; margin:0;'>HTML Only</h1></div> <i class='fa-solid fa-arrow-right' style='color:#94a3b8;'></i> <div style='border: 1px solid #3b82f6; padding: 20px; background: rgba(59,130,246,0.1); border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'><h1 style='color: royalblue; font-size: 24px; margin:0; font-family: sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);'>With CSS</h1></div></div>"
    },
    {
      "type": "interaction",
      "hook": "If we want to add CSS styles to our HTML document, what is the RECOMMENDED, professional way to do it?",
      "interactionType": "multiple-choice",
      "options": ["Inline: Adding styles directly inside every single HTML tag.", "External: Writing CSS in a totally separate '.css' file and linking it to the HTML.", "Internal: Typing a giant <style> block inside the <head>."],
      "correctIndex": 1,
      "explanation": {
        "intuition": "You wouldn't store your clothes in the refrigerator! Keep HTML (structure) and CSS (styles) strictly separated in their own files for cleanliness.",
        "mechanism": "While Inline and Internal CSS work, they create massive, unreadable files. An External style sheet is linked using the `<link rel=\"stylesheet\">` tag in the `<head>`.",
        "code": "<!-- Placing this inside the <head> links the external file -->\n<link rel=\"stylesheet\" href=\"styles.css\">"
      },
      "visualExample": "<div style='font-family:sans-serif; background: #1e293b; color: #a6accd; padding: 15px; border-radius: 8px;'><span style='color: #89ddff;'>&lt;head&gt;</span><br>&nbsp;&nbsp;<span style='color: #fca7ea;'>&lt;link</span> <span style='color:#ffcb6b; font-style:italic;'>rel</span>=<span style='color:#89ddff;'>\"stylesheet\"</span> <span style='color:#ffcb6b; font-style:italic;'>href</span>=<span style='color:#89ddff;'>\"beautiful-theme.css\"</span><span style='color:#fca7ea;'>&gt;</span><br><span style='color: #89ddff;'>&lt;/head&gt;</span></div>"
    }
  ],
  "codeExample": "/* This is a CSS comment */\np {\n  color: royalblue;\n  font-size: 18px;\n  font-weight: bold;\n}\n\nh1 {\n  color: #7c3aed;\n  text-align: center;\n}",
  "challenge": {
    "instruction": "Style the paragraph to have the color 'tomato' and the heading to be centered.",
    "startCode": "<!DOCTYPE html>\n<html>\n<head><style>\n  /* Write your CSS here */\n</style></head>\n<body>\n  <h1>Skill Orbit</h1>\n  <p>Learning CSS is fun!</p>\n</body>\n</html>",
    "startCSS": "/* Add CSS in the HTML editor's <style> tag */",
    "solution": "<style>",
    "hint": "Target the <p> tag: p { color: tomato; } and h1 { text-align: center; }"
  },
  "quiz": [
    {
      "question": "What does CSS stand for?",
      "options": [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Syntax",
        "Colorful Styling System"
      ],
      "correct": 1
    },
    {
      "question": "Which is the RECOMMENDED way to add CSS?",
      "options": [
        "Inline styles",
        "Style attribute",
        "External stylesheet",
        "Script tag"
      ],
      "correct": 2
    }
  ]
};
