window.SKILL_ORBIT_CURRICULUM = [
  // --- HTML MODULE ---
  {
    "id": "html-01",
    "module": "html",
    "section": "HTML Basic",
    "title": "What is HTML?",
    "xp": 20,
    "theory": `
<h1>Lesson 1: Introduction to HTML</h1>
<p>
Welcome to your first step into the world of web development.
In this lesson, you will learn what <span class="term h-tag">HTML</span> is, why it exists,
and how websites are built using it.
</p>
<div class="callout callout-info">
  <i class="fa-solid fa-circle-info"></i>
  <div>
    <strong>Did you know?</strong> HTML is the standard markup language for documents designed to be displayed in a web browser. It was first created by Tim Berners-Lee in 1991.
  </div>
</div>
<hr>
<h2>What is HTML?</h2>
<p>
HTML stands for <b>HyperText Markup Language</b>. It is the language used to structure content on a webpage.
It tells the browser what is a heading, what is a paragraph, where images go, and more.
</p>
<hr>
<h2>Real World Example: HTML is Like a House Structure</h2>
<p>
Imagine building a house. Before decorating, you need structure (walls, rooms, roof). 
In web development, HTML is that structure. CSS is the paint and decoration, and JavaScript is the electricity and plumbing that makes things work.
</p>
<img src="assets/images/content_image/HTML/HouseAnalogy.webp" alt="House and HTML analogy" width="500">
<hr>
<h2>How HTML Works</h2>
<p>
HTML uses special words called <b>tags</b>. Tags tell the browser how to display content.
Example: <code>&lt;p&gt;This is a paragraph&lt;/p&gt;</code>.
</p>
`,
    "codeExample": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n    <p>This is my first HTML page.</p>\n  </body>\n</html>",
    "challenge": {
      "instruction": "Create a paragraph that says 'I am learning HTML!' inside the body tag.",
      "startCode": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Challenge</title>\n  </head>\n  <body>\n    <!-- Write your paragraph here -->\n  </body>\n</html>",
      "solution": "<p>I am learning HTML!</p>",
      "hint": "Use the <p> tag: <p>Your text here</p>"
    },
    "quiz": [
      {
        "question": "What does HTML stand for?",
        "options": ["HyperText Markup Language", "HyperText Making Language", "High Tech Markup Language", "HyperText Modeling Language"],
        "correct": 0
      }
    ]
  },
  {
    "id": "html-02",
    "module": "html",
    "section": "HTML Basic",
    "title": "HTML Editors",
    "xp": 15,
    "theory": `<h1>HTML Editors</h1><p>A simple text editor is all you need to learn HTML. However, professional developers use specialized <b>Code Editors</b> like VS Code, Sublime Text, or Atom.</p><p>For this course, you can use our built-in <b>Skill-Orbit Editor</b> to write and run your code instantly!</p>`
  },
  {
    "id": "html-03",
    "module": "html",
    "section": "HTML Basic",
    "title": "HTML Document Structure",
    "xp": 30,
    "theory": `
<h1>HTML Document Structure</h1>
<p>Every HTML page follows a strict, standard structure. Think of it as the <b>skeleton</b> of your website.</p>
<hr>
<h2>The Burger Analogy</h2>
<p>Just like a burger has layers, an HTML document has sections: <code>&lt;html&gt;</code> is the box, <code>&lt;head&gt;</code> is the label, and <code>&lt;body&gt;</code> is the meat!</p>
<img src="assets/images/content_image/HTML/BurgerAnalogy.png" alt="Burger Analogy - HTML Structure" width="600">
`,
    "codeExample": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Awesome Website</title>\n  </head>\n  <body>\n    <h1>Welcome to Skill-Orbit!</h1>\n    <p>This is the visible part of the page.</p>\n  </body>\n</html>",
    "challenge": {
      "instruction": "Set the document title to 'My First Page' inside the head, and add an <h1> heading with 'Hello World' inside the body.",
      "startCode": "<!DOCTYPE html>\n<html>\n  <head>\n  </head>\n  <body>\n  </body>\n</html>",
      "solution": "<title>My First Page</title>",
      "hint": "Use <title>My First Page</title> and <h1>Hello World</h1>."
    }
  },
  {
    "id": "html-04",
    "module": "html",
    "section": "HTML Basic",
    "title": "HTML Elements",
    "xp": 25,
    "theory": `<h1>HTML Elements</h1><p>An HTML element is defined by a start tag, some content, and an end tag: <code>&lt;tagname&gt; Content goes here... &lt;/tagname&gt;</code></p><p>Some elements have no content (like the <code>&lt;br&gt;</code> element). These are called empty elements.</p>`
  },
  {
    "id": "html-05",
    "module": "html",
    "section": "HTML Basic",
    "title": "HTML Attributes",
    "xp": 25,
    "theory": `<h1>HTML Attributes</h1><p>Attributes provide additional information about elements. They are always specified in the start tag and usually come in name/value pairs like: <code>name="value"</code>.</p><ul><li>The <code>href</code> attribute of <code>&lt;a&gt;</code> specifies the URL of the page the link goes to.</li><li>The <code>src</code> attribute of <code>&lt;img&gt;</code> specifies the path to the image.</li></ul>`
  },
  {
    "id": "html-06",
    "module": "html",
    "section": "HTML Basic",
    "title": "Headings & Paragraphs",
    "xp": 20,
    "theory": "<h2>Headings</h2><p>HTML has 6 levels of headings: from <h1> to <h6>.</p><h2>Paragraphs</h2><p>The <p> tag is used for blocks of text.</p>",
    "codeExample": "<h1>Main Heading</h1>\n<p>This is a paragraph.</p>"
  },
  {
    "id": "html-07",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Styles (CSS Intro)",
    "xp": 25,
    "theory": `<h1>HTML Styles</h1><p>The HTML <code>style</code> attribute is used to add styles to an element, such as color, font, size, and more.</p><p>Syntax: <code>&lt;tagname style="property:value;"&gt;</code></p>`
  },
  {
    "id": "html-08",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Formatting",
    "xp": 20,
    "theory": `<h1>HTML Formatting</h1><p>HTML contains several elements for defining text with a special meaning.</p><ul><li><code>&lt;b&gt;</code> - Bold text</li><li><code>&lt;i&gt;</code> - Italic text</li><li><code>&lt;strong&gt;</code> - Important text</li><li><code>&lt;em&gt;</code> - Emphasized text</li><li><code>&lt;mark&gt;</code> - Marked text</li><li><code>&lt;small&gt;</code> - Smaller text</li><li><code>&lt;del&gt;</code> - Deleted text</li><li><code>&lt;ins&gt;</code> - Inserted text</li><li><code>&lt;sub&gt;</code> - Subscript text</li><li><code>&lt;sup&gt;</code> - Superscript text</li></ul>`
  },
  {
    "id": "html-09",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Quotations",
    "xp": 20,
    "theory": `<h1>HTML Quotations</h1><p>Use <code>&lt;blockquote&gt;</code> for sections that are quoted from another source, and <code>&lt;q&gt;</code> for short inline quotations.</p>`
  },
  {
    "id": "html-10",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Comments",
    "xp": 10,
    "theory": `<h1>HTML Comments</h1><p>Comments are not displayed by the browser, but they can help document your HTML source code.</p><p>Syntax: <code>&lt;!-- Write your comments here --&gt;</code></p>`
  },
  {
    "id": "html-11",
    "module": "html",
    "section": "HTML Styles",
    "title": "HTML Colors",
    "xp": 20,
    "theory": `<h1>HTML Colors</h1><p>HTML colors are specified with predefined color names, or with RGB, HEX, HSL, RGBA, or HSLA values.</p>`
  },
  {
    "id": "html-12",
    "module": "html",
    "section": "HTML Media",
    "title": "HTML Links",
    "xp": 25,
    "theory": `<h1>HTML Links</h1><p>Links are found in nearly all web pages. Links allow users to click their way from page to page.</p><p>Syntax: <code>&lt;a href="url"&gt;link text&lt;/a&gt;</code></p>`
  },
  {
    "id": "html-13",
    "module": "html",
    "section": "HTML Media",
    "title": "HTML Images",
    "xp": 25,
    "theory": `<h1>HTML Images</h1><p>Images can improve the design and the appearance of a web page.</p><p>Syntax: <code>&lt;img src="url" alt="alternatetext"&gt;</code></p>`
  },
  {
    "id": "html-14",
    "module": "html",
    "section": "HTML Media",
    "title": "HTML Favicon",
    "xp": 15,
    "theory": `<h1>HTML Favicon</h1><p>A favicon is a small image displayed next to the page title in the browser tab.</p>`
  },
  {
    "id": "html-15",
    "module": "html",
    "section": "HTML Media",
    "title": "HTML Tables",
    "xp": 30,
    "theory": "<h1>HTML Tables</h1><p>HTML tables allow web developers to arrange data into rows and columns.</p>"
  },
  {
    "id": "html-16",
    "module": "html",
    "section": "HTML Media",
    "title": "HTML Lists",
    "xp": 20,
    "theory": "<h1>HTML Lists</h1><p>HTML lists allow web developers to group a set of related items in lists.</p><ul><li>Unordered list (<code>&lt;ul&gt;</code>)</li><li>Ordered list (<code>&lt;ol&gt;</code>)</li></ul>"
  },
  {
    "id": "html-17",
    "module": "html",
    "section": "HTML Layout",
    "title": "Block & Inline Elements",
    "xp": 25,
    "theory": `<h1>Block & Inline Elements</h1><p>Every HTML element has a default display value, depending on what type of element it is. The two display values are: block and inline.</p>`
  },
  {
    "id": "html-18",
    "module": "html",
    "section": "HTML Layout",
    "title": "The Div Element",
    "xp": 20,
    "theory": `<h1>The HTML &lt;div&gt; Element</h1><p>The <code>&lt;div&gt;</code> element is often used as a container for other HTML elements.</p>`
  },
  {
    "id": "html-19",
    "module": "html",
    "section": "HTML Layout",
    "title": "HTML Classes",
    "xp": 25,
    "theory": `<h1>HTML Classes</h1><p>The <code>class</code> attribute is used to specify a class for an HTML element. Multiple HTML elements can share the same class.</p>`
  },
  {
    "id": "html-20",
    "module": "html",
    "section": "HTML Layout",
    "title": "HTML Id",
    "xp": 25,
    "theory": `<h1>HTML Id</h1><p>The <code>id</code> attribute is used to specify a unique id for an HTML element. You cannot have more than one element with the same id in an HTML document.</p>`
  },
  {
    "id": "html-21",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML Iframes",
    "xp": 25,
    "theory": `<h1>HTML Iframes</h1><p>An HTML iframe is used to display a web page within a web page.</p>`
  },
  {
    "id": "html-22",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML JavaScript",
    "xp": 30,
    "theory": `<h1>HTML JavaScript</h1><p>JavaScript makes HTML pages more dynamic and interactive.</p>`
  },
  {
    "id": "html-23",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML File Paths",
    "xp": 20,
    "theory": `<h1>HTML File Paths</h1><p>A file path describes the location of a file in a website's folder structure.</p>`
  },
  {
    "id": "html-24",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML Head",
    "xp": 20,
    "theory": `<h1>HTML Head</h1><p>The <code>&lt;head&gt;</code> element is a container for metadata (data about data) and is placed between the <code>&lt;html&gt;</code> tag and the <code>&lt;body&gt;</code> tag.</p>`
  },
  {
    "id": "html-25",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML Layout Semantics",
    "xp": 30,
    "theory": `<h1>HTML Semantic Elements</h1><p>Semantic elements = elements with a meaning. A semantic element clearly describes its meaning to both the browser and the developer.</p>`
  },
  {
    "id": "html-26",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML Responsive Design",
    "xp": 35,
    "theory": `<h1>HTML Responsive Web Design</h1><p>Responsive Web Design is about creating web pages that look good on all devices!</p>`
  },
  {
    "id": "html-finish",
    "module": "html",
    "section": "HTML Advanced",
    "title": "HTML — Final Quiz",
    "xp": 100,
    "theory": "<h1>Congratulations!</h1><p>You have reached the end of the HTML module. Take the final quiz to earn your HTML Master badge!</p>"
  },

  // --- CSS MODULE ---
  {
    "id": "css-01",
    "module": "css",
    "section": "CSS Basic",
    "title": "What is CSS?",
    "xp": 20,
    "theory": "<h1>What is CSS?</h1><p>CSS stands for Cascading Style Sheets. It describes how HTML elements are to be displayed on screen, paper, or in other media.</p>"
  },
  {
    "id": "css-02",
    "module": "css",
    "section": "CSS Basic",
    "title": "CSS Syntax & Selectors",
    "xp": 25,
    "theory": "<h1>CSS Selectors</h1><p>A CSS selector selects the HTML element(s) you want to style.</p>"
  },
  {
    "id": "css-03",
    "module": "css",
    "section": "CSS Basic",
    "title": "How to Add CSS",
    "xp": 25,
    "theory": "<h1>How to Add CSS</h1><p>There are three ways of inserting a style sheet: External, Internal, and Inline.</p>"
  },
  {
    "id": "css-04",
    "module": "css",
    "section": "CSS Styling",
    "title": "CSS Colors",
    "xp": 20,
    "theory": "<h1>CSS Colors</h1><p>Colors are specified using predefined color names, or RGB, HEX, HSL, RGBA, HSLA values.</p>"
  },
  {
    "id": "css-05",
    "module": "css",
    "section": "CSS Styling",
    "title": "CSS Backgrounds",
    "xp": 25,
    "theory": "<h1>CSS Backgrounds</h1><p>The CSS background properties are used to add background effects for elements.</p>"
  },
  {
    "id": "css-06",
    "module": "css",
    "section": "CSS Styling",
    "title": "CSS Borders & Margins",
    "xp": 25,
    "theory": "<h1>CSS Borders</h1><p>The CSS border properties allow you to specify the style, width, and color of an element's border.</p>"
  },
  {
    "id": "css-07",
    "module": "css",
    "section": "CSS Box Model",
    "title": "CSS Padding",
    "xp": 20,
    "theory": "<h1>CSS Padding</h1><p>Padding is used to create space around an element's content, inside of any defined borders.</p>"
  },
  {
    "id": "css-08",
    "module": "css",
    "section": "CSS Box Model",
    "title": "Height, Width & Max-width",
    "xp": 20,
    "theory": "<h1>CSS Height and Width</h1><p>The height and width properties are used to set the height and width of an element.</p>"
  },
  {
    "id": "css-09",
    "module": "css",
    "section": "CSS Box Model",
    "title": "The Box Model",
    "xp": 35,
    "theory": "<h1>The CSS Box Model</h1><p>All HTML elements can be considered as boxes.</p>"
  },
  {
    "id": "css-10",
    "module": "css",
    "section": "CSS Advanced",
    "title": "CSS Flexbox",
    "xp": 40,
    "theory": "<h1>CSS Flexbox</h1><p>Before the Flexbox Layout module, there were four layout modes: Block, Inline, Table, Positioned.</p>"
  },
  {
    "id": "css-11",
    "module": "css",
    "section": "CSS Advanced",
    "title": "CSS Grid",
    "xp": 40,
    "theory": "<h1>CSS Grid Layout</h1><p>The CSS Grid Layout Module offers a grid-based layout system, with rows and columns.</p>"
  },
  {
    "id": "css-12",
    "module": "css",
    "section": "CSS Advanced",
    "title": "CSS — Final Quiz",
    "xp": 100,
    "theory": "<h1>CSS Final Quiz</h1><p>Test your CSS knowledge!</p>"
  }
];

