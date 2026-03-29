// =============================================
// SKILL-ORBIT — routes/lessons.js
// GET /api/lessons         — full curriculum
// GET /api/lessons/:id     — single lesson metadata
// =============================================

const express = require('express');
const router  = express.Router();

const { optionalAuth } = require('../middleware/auth');
const { queries }       = require('../db/database');

// ── Curriculum data (mirrors frontend data/curriculum.js) ─────────────────────
// Kept as JSON here so the server owns the source of truth for lesson metadata.

const CURRICULUM = [
  // --- HTML MODULE ---
  { id: 'html-01', module: 'html', section: 'HTML Basic',    title: 'What is HTML?',            xp: 20 },
  { id: 'html-02', module: 'html', section: 'HTML Basic',    title: 'HTML Editors',             xp: 15 },
  { id: 'html-03', module: 'html', section: 'HTML Basic',    title: 'HTML Document Structure',  xp: 30 },
  { id: 'html-04', module: 'html', section: 'HTML Basic',    title: 'HTML Elements',            xp: 25 },
  { id: 'html-05', module: 'html', section: 'HTML Basic',    title: 'HTML Attributes',          xp: 25 },
  { id: 'html-06', module: 'html', section: 'HTML Basic',    title: 'Headings & Paragraphs',    xp: 20 },
  { id: 'html-07', module: 'html', section: 'HTML Styles',   title: 'HTML Styles (CSS Intro)',  xp: 25 },
  { id: 'html-08', module: 'html', section: 'HTML Styles',   title: 'HTML Formatting',          xp: 20 },
  { id: 'html-09', module: 'html', section: 'HTML Styles',   title: 'HTML Quotations',          xp: 20 },
  { id: 'html-10', module: 'html', section: 'HTML Styles',   title: 'HTML Comments',            xp: 10 },
  { id: 'html-11', module: 'html', section: 'HTML Styles',   title: 'HTML Colors',              xp: 20 },
  { id: 'html-12', module: 'html', section: 'HTML Media',    title: 'HTML Links',               xp: 25 },
  { id: 'html-13', module: 'html', section: 'HTML Media',    title: 'HTML Images',              xp: 25 },
  { id: 'html-14', module: 'html', section: 'HTML Media',    title: 'HTML Favicon',             xp: 15 },
  { id: 'html-15', module: 'html', section: 'HTML Media',    title: 'HTML Tables',              xp: 30 },
  { id: 'html-16', module: 'html', section: 'HTML Media',    title: 'HTML Lists',               xp: 20 },
  { id: 'html-17', module: 'html', section: 'HTML Layout',   title: 'Block & Inline Elements',  xp: 25 },
  { id: 'html-18', module: 'html', section: 'HTML Layout',   title: 'The Div Element',          xp: 20 },
  { id: 'html-19', module: 'html', section: 'HTML Layout',   title: 'HTML Classes',             xp: 25 },
  { id: 'html-20', module: 'html', section: 'HTML Layout',   title: 'HTML Id',                  xp: 25 },
  { id: 'html-21', module: 'html', section: 'HTML Advanced', title: 'HTML Iframes',             xp: 25 },
  { id: 'html-22', module: 'html', section: 'HTML Advanced', title: 'HTML JavaScript',          xp: 30 },
  { id: 'html-23', module: 'html', section: 'HTML Advanced', title: 'HTML File Paths',          xp: 20 },
  { id: 'html-24', module: 'html', section: 'HTML Advanced', title: 'HTML Head',                xp: 20 },
  { id: 'html-25', module: 'html', section: 'HTML Advanced', title: 'HTML Layout Semantics',   xp: 30 },
  { id: 'html-26', module: 'html', section: 'HTML Advanced', title: 'HTML Responsive Design',  xp: 35 },
  { id: 'html-finish', module: 'html', section: 'HTML Advanced', title: 'HTML — Final Quiz',   xp: 100},

  // --- CSS MODULE ---
  { id: 'css-01', module: 'css', section: 'CSS Basic',     title: 'What is CSS?',              xp: 20 },
  { id: 'css-02', module: 'css', section: 'CSS Basic',     title: 'CSS Syntax & Selectors',    xp: 25 },
  { id: 'css-03', module: 'css', section: 'CSS Basic',     title: 'How to Add CSS',            xp: 25 },
  { id: 'css-04', module: 'css', section: 'CSS Styling',   title: 'CSS Colors',                xp: 20 },
  { id: 'css-05', module: 'css', section: 'CSS Styling',   title: 'CSS Backgrounds',           xp: 25 },
  { id: 'css-06', module: 'css', section: 'CSS Styling',   title: 'CSS Borders & Margins',     xp: 25 },
  { id: 'css-07', module: 'css', section: 'CSS Box Model', title: 'CSS Padding',               xp: 20 },
  { id: 'css-08', module: 'css', section: 'CSS Box Model', title: 'Height, Width & Max-width', xp: 20 },
  { id: 'css-09', module: 'css', section: 'CSS Box Model', title: 'The Box Model',             xp: 35 },
  { id: 'css-10', module: 'css', section: 'CSS Advanced',  title: 'CSS Flexbox',               xp: 40 },
  { id: 'css-11', module: 'css', section: 'CSS Advanced',  title: 'CSS Grid',                  xp: 40 },
  { id: 'css-12', module: 'css', section: 'CSS Advanced',  title: 'CSS — Final Quiz',          xp: 100},
];

// Group by module and section for easy consumption
function groupCurriculum() {
  const modules = {};
  CURRICULUM.forEach((lesson) => {
    if (!modules[lesson.module]) {
      modules[lesson.module] = { id: lesson.module, sections: {} };
    }
    if (!modules[lesson.module].sections[lesson.section]) {
      modules[lesson.module].sections[lesson.section] = [];
    }
    modules[lesson.module].sections[lesson.section].push({
      id:      lesson.id,
      title:   lesson.title,
      xp:      lesson.xp,
      section: lesson.section,
    });
  });
  return modules;
}

// ── GET /api/lessons ──────────────────────────────────────────────────────────

router.get('/', optionalAuth, (req, res) => {
  try {
    // If user is authenticated, enrich with their completion status
    let completedLessons = [];
    if (req.userId) {
      const progress = queries.getProgress.get(req.userId);
      if (progress) {
        completedLessons = JSON.parse(progress.completed_lessons || '[]');
      }
    }

    const enriched = CURRICULUM.map((l) => ({
      ...l,
      completed: completedLessons.includes(l.id),
    }));

    return res.json({
      lessons:    enriched,
      modules:    groupCurriculum(),
      totalCount: CURRICULUM.length,
    });
  } catch (err) {
    console.error('[lessons/]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ── GET /api/lessons/:id ──────────────────────────────────────────────────────

router.get('/:id', optionalAuth, (req, res) => {
  try {
    const lesson = CURRICULUM.find((l) => l.id === req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found.' });

    let completed = false;
    if (req.userId) {
      const progress = queries.getProgress.get(req.userId);
      if (progress) {
        const completedLessons = JSON.parse(progress.completed_lessons || '[]');
        completed = completedLessons.includes(lesson.id);
      }
    }

    // Find next/prev
    const idx  = CURRICULUM.indexOf(lesson);
    const prev = idx > 0 ? CURRICULUM[idx - 1] : null;
    const next = idx < CURRICULUM.length - 1 ? CURRICULUM[idx + 1] : null;

    return res.json({
      lesson:    { ...lesson, completed },
      prev:      prev ? { id: prev.id, title: prev.title } : null,
      next:      next ? { id: next.id, title: next.title } : null,
    });
  } catch (err) {
    console.error('[lessons/:id]', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = { router, CURRICULUM };
