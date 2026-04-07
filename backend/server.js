// =============================================
// SKILL-ORBIT — server.js
// Main Express application entry point
// =============================================

const express    = require('express');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────────────────────

// CORS — allow local file:// origin and localhost for dev
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, file://)
    if (!origin) return callback(null, true);
    const allowed = [
      /^http:\/\/localhost/,
      /^http:\/\/127\.0\.0\.1/,
      /^file:\/\//,
      /^null$/, // file:// pages send 'null' as origin
    ];
    const ok = allowed.some((pattern) =>
      typeof pattern === 'string' ? origin === pattern : pattern.test(origin)
    );
    callback(null, true); // allow all — tighten in production
  },
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Static Files ─────────────────────────────────────────────────────────────

app.use(express.static(path.join(__dirname, '..')));

// ── Rate Limiting ────────────────────────────────────────────────────────────

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max:      20,
  message:  { error: 'Too many authentication attempts. Please wait 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max:      200,
  message:  { error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Request Logging (dev) ────────────────────────────────────────────────────

if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    const ts = new Date().toISOString().slice(11, 19);
    console.log(`[${ts}] ${req.method} ${req.path}`);
    next();
  });
}

// ── Health Check ─────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({
    status:  'ok',
    service: 'skill-orbit-api',
    version: '1.0.0',
    time:    new Date().toISOString(),
  });
});

// ── Routes ────────────────────────────────────────────────────────────────────

app.use('/api/auth',         authLimiter, require('./routes/auth'));
app.use('/api/progress',     apiLimiter,  require('./routes/progress'));
app.use('/api/leaderboard',  apiLimiter,  require('./routes/leaderboard'));

app.use('/api/lessons',      apiLimiter,  require('./routes/lessons').router);

// ── Serve frontend static files (optional — for production) ──────────────────
// When running from the backend/ folder, serve the parent directory.
// Comment this out if you're using a separate static server / file:// protocol.

if (process.env.SERVE_STATIC === 'true') {
  const frontendPath = path.join(__dirname, '..');
  app.use(express.static(frontendPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ── 404 handler ───────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

// ── Error handler ─────────────────────────────────────────────────────────────

app.use((err, req, res, _next) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║   🚀  Skill-Orbit API  v1.0.0        ║');
  console.log(`  ║   http://localhost:${PORT}             ║`);
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
  console.log('  Endpoints:');
  console.log('  POST  /api/auth/register');
  console.log('  POST  /api/auth/login');
  console.log('  GET   /api/auth/profile');
  console.log('  GET   /api/progress');
  console.log('  POST  /api/progress/lesson');
  console.log('  POST  /api/progress/quiz');
  console.log('  POST  /api/progress/challenge');
  console.log('  POST  /api/progress/sync');
  console.log('  GET   /api/leaderboard');
  console.log('  GET   /api/leaderboard/me');
  console.log('  GET   /api/badges');
  console.log('  GET   /api/lessons');
  console.log('');
});

module.exports = app;
