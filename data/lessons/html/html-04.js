window.LESSON_DATA_html_04 = {
  "id": "html-04",
  "module": "html",
  "title": "HTML Elements",
  "xp": 40,
  "theory": `
    <div class="theory-hero">
      <i class="fa-solid fa-puzzle-piece theory-hero-icon" style="color: #ec4899;"></i>
      <h2>The Building Blocks of Webpages</h2>
      <p>By now, you understand the mandatory 'skeleton' of a webpage. The next logical step is to understand the individual building blocks—the "Elements"—that make up everything from text headers to buttons and images. In this lesson, we will master HTML elements, how they nest within each other like Russian dolls, and the strange case of 'empty' elements.</p>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">What Exactly is an Element?</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      In Lesson 1, we talked about <em>Tags</em>. Many beginners confuse tags and elements. 
    </p>

    <div style="background: rgba(236, 72, 153, 0.05); border-left: 4px solid #ec4899; padding: 25px; margin: 30px 0; border-radius: 0 12px 12px 0;">
      <p style="margin: 0; font-size: 1.2rem; line-height: 1.7; color: rgba(255,255,255,0.9);">
        An <strong>HTML Element</strong> is the <em>entire package</em> from the Start Tag to the End Tag, including everything physically inside it.
      </p>
    </div>

    <p style="font-size: 1.1rem; line-height: 1.8;">
      For example, <code>&lt;h1&gt;</code> is just a start tag. But <code>&lt;h1&gt;Welcome to my site!&lt;/h1&gt;</code> is a complete HTML Element. It represents the fully formed idea that the browser will render.
    </p>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">Nested Elements (Russian Dolls)</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      HTML elements can (and almost always do) contain other HTML elements inside them. This is called <strong>Nesting</strong>. Imagine a set of Russian matryoshka dolls, where a smaller doll fits perfectly inside a larger one.
    </p>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      If you want to make a single word bold inside a paragraph, you simply "nest" a <code>&lt;b&gt;</code> (bold) element entirely inside a <code>&lt;p&gt;</code> (paragraph) element.
    </p>

    <div style="background: rgba(15, 23, 42, 0.6); padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
      <h3 style="color: #cbd5e1; margin-top: 0; font-size: 1.1rem; text-transform: uppercase;">Correct Nesting Order</h3>
      
      <div style="font-family: 'Fira Code', monospace; font-size: 1.5rem; display: inline-block; text-align: left;">
        <span style="color: #89ddff;">&lt;p&gt;</span>
        <span style="color: #c3e88d;">This text is normal, but </span>
        <span style="color: #fca7ea;">&lt;b&gt;</span>
        <span style="color: #ffffff; font-weight: bold;">this word</span>
        <span style="color: #fca7ea;">&lt;/b&gt;</span>
        <span style="color: #c3e88d;"> is bold!</span>
        <span style="color: #89ddff;">&lt;/p&gt;</span>
      </div>
    </div>

    <div class="callout callout-warning" style="margin: 30px 0; border-left-color: #facc15;">
      <i class="fa-solid fa-triangle-exclamation" style="color: #facc15;"></i>
      <div>
        <strong>The "First In, Last Out" Rule</strong><br>
        When you nest tags, the most recently opened tag MUST be closed first. 
        <br><br>
        <strong style="color: #4ade80;">Correct:</strong> <code>&lt;h1&gt;&lt;u&gt;Title&lt;/u&gt;&lt;/h1&gt;</code><br>
        <strong style="color: #f87171;">Wrong:</strong> <code>&lt;h1&gt;&lt;u&gt;Title&lt;/h1&gt;&lt;/u&gt;</code> (Tags criss-crossing creates absolute chaos for the browser!).
      </div>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">

    <h2 style="font-size: 2rem; margin-bottom: 20px;">The Weird Case of Empty Elements</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      Now that we have drilled the importance of closing tags into your memory, it is time to throw a wrench into the system. Some HTML elements don't wrap around text at all. Because they hold zero content, they are called <strong>Empty Elements</strong>. 
    </p>

    <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
      Because they have no content to wrap, empty elements <em>do not have a closing tag!</em> They stand alone. Look at these two common examples:
    </p>

    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 30px 0;">
      <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.05); padding: 25px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <h4 style="color: #60a5fa; margin-top: 0; font-size: 1.4rem;"><code>&lt;br&gt;</code> (The Line Break)</h4>
        <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 15px; color: #cbd5e1;">Pressing "Enter" inside your code editor doesn't actually create a new line on the webpage (browsers ignore massive spaces). To force a line break, you drop a standalone <code>&lt;br&gt;</code> element like dropping a brick!</p>
        <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; font-family: monospace; color: #a6accd;">&lt;p&gt;Poetry is awesome&lt;br&gt;This is on a new line!&lt;/p&gt;</div>
      </div>
      
      <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.05); padding: 25px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <h4 style="color: #60a5fa; margin-top: 0; font-size: 1.4rem;"><code>&lt;hr&gt;</code> (The Horizontal Rule)</h4>
        <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 15px; color: #cbd5e1;">It simply draws a full-width line across the screen to separate content sections. It doesn't wrap around text, it just "exists" as a line. So it has absolutely no closing tag!</p>
        <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; font-family: monospace; color: #a6accd;">&lt;p&gt;Section 1&lt;/p&gt;<br>&lt;hr&gt;<br>&lt;p&gt;Section 2&lt;/p&gt;</div>
      </div>
    </div>

    <hr style="margin: 40px 0; border: none; height: 1px; background: rgba(255,255,255,0.1);">
    
    <h2 style="font-size: 2rem; margin-bottom: 20px;">Is HTML Case-Sensitive?</h2>
    
    <p style="font-size: 1.1rem; line-height: 1.8;">
      HTML is surprisingly forgiving. It actually doesn't care if you write <code>&lt;P&gt;</code> or <code>&lt;p&gt;</code>. However, the World Wide Web Consortium (the group of super-nerds who define web standards) highly recommends writing all HTML in <strong>lowercase</strong>. It is much easier to read and prevents incredibly ugly massive codes! Let's stick strictly to lowercase tags in this journey!
    </p>

  `,
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
