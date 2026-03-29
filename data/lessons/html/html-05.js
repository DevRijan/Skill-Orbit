window.LESSON_DATA_html_05 = {
  "id": "html-05",
  "module": "html",
  "title": "HTML Attributes",
  "xp": 45,
  "theory": `
    <div class="theory-hero">
      <i class="fa-solid fa-tags theory-hero-icon" style="color: #10b981;"></i>
      <h2>Elements With Superpowers</h2>
      <p>Imagine telling someone to <em>"Buy a car."</em> They wouldn't know what kind of car, what color, or what model. To be useful, you need to add details: <em>"Buy a red Ferrari."</em> In HTML, raw tags are often too generic to be useful on their own. We use <strong>Attributes</strong> to give our HTML tags necessary details and instructions.</p>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">What Exactly is an Attribute?</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      An <strong>Attribute</strong> provides additional information or settings for an HTML element. They modify the element's default behavior or appearance.
    </p>

    <div style="background: rgba(16, 185, 129, 0.05); border-left: 4px solid #10b981; padding: 25px; margin: 30px 0; border-radius: 0 12px 12px 0;">
      <h3 style="color: #10b981; margin-top: 0; font-size: 1.3rem;">The Golden Rules of Attributes:</h3>
      <ol style="margin: 15px 0 0 0; padding-left: 20px; line-height: 1.8; color: rgba(255,255,255,0.9);">
        <li><strong style="color: #6ee7b7;">Placement:</strong> Attributes are <em>always</em> completely defined inside the <strong>Start Tag</strong>. Never place an attribute inside an end tag!</li>
        <li><strong style="color: #6ee7b7;">Pairs:</strong> Attributes almost always come in an exact pair representing a name and a value: <code>name="value"</code></li>
        <li><strong style="color: #6ee7b7;">Quotes:</strong> The actual value is strictly wrapped in double quotation marks (<code>"value"</code>).</li>
      </ol>
    </div>

    <p style="font-size: 1.1rem; line-height: 1.8;">
      Let's look at the absolute most common and famous attributes you will use constantly in web development.
    </p>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">1. The <code>href</code> Attribute (Creating Links)</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      The "HyperText" part of HTML relies entirely on links! The Anchor tag (<code>&lt;a&gt;</code>) tells the browser, "This text forms a link." But without an attribute, how does the browser know <em>where</em> to send the user when they click it? It uses the <code>href</code> (Hypertext Reference) attribute!
    </p>

    <div style="background: rgba(15, 23, 42, 0.6); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
      <div style="font-family: 'Fira Code', monospace; font-size: 1.3rem; display: inline-block; text-align: left; background: #1e1e2e; padding: 20px; border-radius: 8px;">
        <span style="color: #fca7ea;">&lt;a</span> 
        <span style="color: #ffcb6b; font-style: italic;">href</span><span style="color: #89ddff;">="https://www.google.com"</span><span style="color: #fca7ea;">&gt;</span>
        <span style="color: #ffffff; text-decoration: underline;">Click Here to Search!</span>
        <span style="color: #fca7ea;">&lt;/a&gt;</span>
      </div>
      
      <p style="margin: 20px 0 0 0; color: #a6accd; font-size: 0.95rem;">Translation: Create a link, and specifically route everyone who clicks "Click Here" straight to Google.</p>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">2. The <code>src</code> Attribute (Displaying Images)</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      The Image tag (<code>&lt;img&gt;</code>) tells the browser to place a picture on the screen. But exactly like links, how does it know <em>which</em> picture to grab? It uses the <code>src</code> (Source) attribute to pull the image file.
    </p>

    <div class="callout callout-info" style="margin: 25px 0;">
      <i class="fa-solid fa-image"></i>
      <div>
        <strong>Remember Empty Elements?</strong> The <code>&lt;img&gt;</code> tag has no content to wrap, so it has absolutely no closing tag. The entire element is just the start tag filled with attributes!
      </div>
    </div>

    <div style="background: rgba(15, 23, 42, 0.6); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
      <div style="font-family: 'Fira Code', monospace; font-size: 1.3rem; display: inline-block; text-align: left; background: #1e1e2e; padding: 20px; border-radius: 8px;">
        <span style="color: #fca7ea;">&lt;img</span> 
        <span style="color: #ffcb6b; font-style: italic;">src</span><span style="color: #89ddff;">="cat-picture.jpg"</span><span style="color: #fca7ea;">&gt;</span>
      </div>
    </div>

    <p style="font-size: 1.1rem; line-height: 1.8;">
      Images usually require <em>multiple</em> attributes to function safely. If the cat picture fails to load because of a broken internet connection, the browser would normally show an ugly ripped icon. To prevent this, we stack another attribute inside the same tag called <code>alt</code> (Alternative Text).
    </p>

    <div style="background: rgba(15, 23, 42, 0.6); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
      <h3 style="color: #cbd5e1; margin-top: 0; font-size: 1.1rem; text-transform: uppercase;">Stacking Attributes</h3>
      <div style="font-family: 'Fira Code', monospace; font-size: 1.3rem; display: inline-block; text-align: left; background: #1e1e2e; padding: 20px; border-radius: 8px;">
        <span style="color: #fca7ea;">&lt;img</span> 
        <span style="color: #ffcb6b; font-style: italic;">src</span><span style="color: #89ddff;">="cat.jpg"</span> 
        <span style="color: #ffcb6b; font-style: italic;">alt</span><span style="color: #89ddff;">="A fluffy orange cat"</span>
        <span style="color: #ffcb6b; font-style: italic;">width</span><span style="color: #89ddff;">="500"</span><span style="color: #fca7ea;">&gt;</span>
      </div>
      <p style="margin: 20px 0 0 0; color: #a6accd; font-size: 0.95rem; text-align: left; line-height: 1.6;">Notice how we simply added a space between attributes? You can add as many attributes as you want inside the start tag, separated entirely by spaces! The order of attributes does not matter at all.</p>
    </div>

  `,
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
    }
  ]
};
