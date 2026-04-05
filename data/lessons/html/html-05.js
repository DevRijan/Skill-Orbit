window.LESSON_DATA_html_05 = {
  "id": "html-05",
  "module": "html",
  "title": "HTML Attributes",
  "xp": 45,
  "theory": "",
  "interactive_steps": [
    {
      "type": "interaction",
      "hook": "Imagine telling a robot to 'Buy a car.' It needs details like what color or model. If we want to add an attribute to an HTML tag, where MUST we place it?",
      "interactionType": "multiple-choice",
      "options": ["Inside the End Tag (e.g., </p class=\"red\">).", "Strictly inside the Start Tag (e.g., <p class=\"red\">).", "It doesn't matter."],
      "correctIndex": 1,
      "explanation": {
        "intuition": "You must give the browser instructions right when it opens the box, not when it closes the box.",
        "mechanism": "Attributes always follow a strict `name=\"value\"` pair, wrapped in double quotes, completely inside the opening tag.",
        "code": "<!-- CORRECT -->\n<p class=\"warning\">Watch out!</p>\n\n<!-- WRONG: Attribute in closing tag -->\n<p>Watch out!</p class=\"warning\">"
      },
      "visualExample": "<div style='font-family:sans-serif;'><p style='color:#facc15; background: #422006; display:inline-block; padding: 5px; border-radius: 4px; margin:0;'>Watch out!</p></div>"
    },
    {
      "type": "interaction",
      "hook": "The `<a>` (Anchor) tag turns text into a link. But how does the browser know where to send you when you click it? Which attribute does it require?",
      "interactionType": "multiple-choice",
      "options": ["src", "url", "href"],
      "correctIndex": 2,
      "explanation": {
        "intuition": "It needs a Hypertext Reference (`href`) to link the Anchor to a destination mapping.",
        "mechanism": "Without the `href` attribute, an `<a>` tag is technically just boring text. The `href` injects the clicking behavior and destination URL.",
        "code": "<!-- A working link -->\n<a href=\"https://www.google.com\">Click to Search Google</a>"
      },
      "visualExample": "<div style='font-family:sans-serif;'><a href='#' style='color: #3b82f6; text-decoration: underline;'>Click to Search Google</a></div>"
    },
    {
      "type": "interaction",
      "hook": "The `<img>` tag uses the `src` attribute to find a picture. If we also want to set the width and add alternative text (`alt`), can we put multiple attributes in the same tag?",
      "interactionType": "multiple-choice",
      "options": ["Yes, just separate them entirely by spaces.", "Yes, but you must use commas between them.", "No, you can only have one attribute per tag."],
      "correctIndex": 0,
      "explanation": {
        "intuition": "You can hand a tag as many instructions as it needs, as long as you separate them with a physical space so the browser doesn't get confused.",
        "mechanism": "The order of attributes doesn't matter. The `alt` text is critical: if the image link breaks, the `alt` text appears instead so the user knows what was supposed to be there.",
        "code": "<!-- Stacking 3 attributes! -->\n<img src=\"cat.jpg\" alt=\"An orange cat\" width=\"300\">"
      },
      "visualExample": "<div style='font-family:sans-serif; display:flex; align-items:center; gap: 10px;'><div style='width: 100px; height: 100px; background: #e2e8f0; display:flex; justify-content:center; align-items:center; border: 1px dashed #94a3b8;'><i class='fa-solid fa-image' style='color:#cbd5e1; font-size:2rem;'></i></div><span style='color: #64748b; font-style:italic;'>An orange cat</span></div>"
    }
  ],
  "codeExample": "<!DOCTYPE html>\n<html>\n  <body>\n    <h2>Let's build some powerful elements!</h2>\n    \n    <p>\n      To understand links, check out the famous \n      <a href=\"https://www.google.com\">Google Search Engine</a>.\n    </p>\n\n    <p>\n      Here is an image tag perfectly loaded with three stacked attributes! Since the image URL is fake, the <b>alt</b> text will instantly appear instead.\n    </p>\n\n    <img src=\"broken-fake-image.jpg\" alt=\"A fake image placeholder\" width=\"300\">\n\n  </body>\n</html>",
  "challenge": {
    "instruction": "Transform the text 'Click here' into a working link that points to perfectly valid website format. Wrap the text in an <a> tag and use the href attribute to point to 'https://skill-orbit.com'!",
    "startCode": "<!DOCTYPE html>\n<html>\n  <body>\n    <!-- Write your Anchor (link) tag below: -->\n\n\n  </body>\n</html>",
    "solution": "<a href=\"https://skill-orbit.com\">Click here</a>",
    "hint": "Check the theory example! Use <a href=\"https://skill-orbit.com\">Click here</a>. Always wrap the URL perfectly in double quotes!"
  },
  "quiz": [
    {
      "question": "Exactly where do you define an attribute (like href or src)?",
      "options": [
        "Inside the End Tag (e.g., </a href='url'>).",
        "It doesn't matter, anywhere on the line.",
        "Strictly inside the Start Tag (e.g., <a href='url'>).",
        "At the very top of the document underneath <!DOCTYPE html>."
      ],
      "correct": 2
    },
    {
      "question": "Why is the `alt` (Alternative Text) attribute critical for an <img> element?",
      "options": [
        "It applies a beautiful Instagram color filter to the image.",
        "If the image totally fails to load, it displays that exact text instead. It is also read by screen readers for the visually impaired.",
        "It makes the image jump and animate when you hover over it.",
        "It compresses the file size so the page loads faster."
      ],
      "correct": 1
    },
    {
      "question": "What is the proper syntax for assigning a value to an attribute in HTML5?",
      "options": [
        "name=value",
        "name: 'value'",
        "name->\"value\"",
        "name=\"value\""
      ],
      "correct": 3
    },
    {
      "question": "What specific attribute does an <a> anchor tag require to know where to navigate?",
      "options": [
        "src",
        "url",
        "link",
        "href"
      ],
      "correct": 3
    },
    {
      "question": "Can you stack multiple attributes in a single opening tag?",
      "options": [
        "Yes, separated entirely by spaces.",
        "Yes, but you must use commas.",
        "No, you can only have one attribute per tag.",
        "No, additional attributes must go in the closing tag."
      ],
      "correct": 0
    }
  ]
};
