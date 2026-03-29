// =============================================
// SKILL-ORBIT — db/database.js
// SQLite connection, migrations & helpers
// =============================================

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname);
const DB_PATH = path.join(DB_DIR, 'skill-orbit.db');

// Ensure the db directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── Migrations ────────────────────────────────────────────────────────────────

const MIGRATIONS = [
  // v1 — Initial schema
  `
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    UNIQUE NOT NULL COLLATE NOCASE,
    password    TEXT    NOT NULL,
    avatar      TEXT    NOT NULL DEFAULT '🚀',
    joined_at   TEXT    NOT NULL DEFAULT (datetime('now')),
    last_seen   TEXT    NOT NULL DEFAULT (datetime('now')),
    is_active   INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS progress (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id            INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    xp_total           INTEGER NOT NULL DEFAULT 0,
    streak             INTEGER NOT NULL DEFAULT 0,
    last_visit         TEXT,
    completed_lessons  TEXT    NOT NULL DEFAULT '[]',
    lesson_xp          TEXT    NOT NULL DEFAULT '{}',
    quiz_xp            TEXT    NOT NULL DEFAULT '{}',
    challenge_xp       TEXT    NOT NULL DEFAULT '{}',
    activity_log       TEXT    NOT NULL DEFAULT '{}',
    updated_at         TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS badges (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id   TEXT    NOT NULL,
    earned_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, badge_id)
  );

  CREATE TABLE IF NOT EXISTS schema_migrations (
    version    INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
  CREATE INDEX IF NOT EXISTS idx_progress_xp ON progress(xp_total DESC);
  CREATE INDEX IF NOT EXISTS idx_badges_user_id ON badges(user_id);
  `,
];

// Run migrations
function runMigrations() {
  db.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
    version    INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  const applied = db
    .prepare('SELECT version FROM schema_migrations ORDER BY version')
    .all()
    .map((r) => r.version);

  MIGRATIONS.forEach((sql, idx) => {
    const version = idx + 1;
    if (!applied.includes(version)) {
      db.exec(sql);
      db.prepare('INSERT INTO schema_migrations (version) VALUES (?)').run(version);
      console.log(`[DB] Applied migration v${version}`);
    }
  });
}

runMigrations();

// ── Leaderboard View (computed) ───────────────────────────────────────────────

// Returns top N users joined with their progress stats (+ badge count)
function getLeaderboard(limit = 50) {
  return db
    .prepare(
      `SELECT
        u.id, u.name, u.avatar, u.joined_at,
        COALESCE(p.xp_total, 0)                   AS xp,
        COALESCE(p.streak, 0)                     AS streak,
        COALESCE(p.last_visit, u.last_seen)       AS last_seen,
        COALESCE(json_array_length(p.completed_lessons), 0) AS lessons_count,
        COALESCE(p.updated_at, u.joined_at)       AS updated_at,
        COALESCE(bc.badge_count, 0)               AS badge_count
       FROM users u
       LEFT JOIN progress p ON p.user_id = u.id
       LEFT JOIN (
         SELECT user_id, COUNT(*) AS badge_count FROM badges GROUP BY user_id
       ) bc ON bc.user_id = u.id
       WHERE u.is_active = 1
       ORDER BY xp DESC, u.joined_at ASC
       LIMIT ?`
    )
    .all(limit);
}

// Returns top N users ranked by XP earned in the current ISO week (Mon–Sun)
function getWeeklyLeaderboard(limit = 50) {
  // Compute Mon 00:00 of this week
  const now = new Date();
  const day = now.getUTCDay(); // 0=Sun,1=Mon,...
  const diffToMon = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - diffToMon);
  monday.setUTCHours(0, 0, 0, 0);
  const mondayStr = monday.toISOString().slice(0, 10); // "YYYY-MM-DD"

  // Pull all users' activity_log JSON and sum keys >= mondayStr
  const rows = db
    .prepare(
      `SELECT
        u.id, u.name, u.avatar, u.joined_at,
        COALESCE(p.xp_total, 0)                   AS xp_total,
        COALESCE(p.streak, 0)                     AS streak,
        COALESCE(p.last_visit, u.last_seen)       AS last_seen,
        COALESCE(json_array_length(p.completed_lessons), 0) AS lessons_count,
        COALESCE(p.activity_log, '{}')            AS activity_log,
        COALESCE(bc.badge_count, 0)               AS badge_count
       FROM users u
       LEFT JOIN progress p ON p.user_id = u.id
       LEFT JOIN (
         SELECT user_id, COUNT(*) AS badge_count FROM badges GROUP BY user_id
       ) bc ON bc.user_id = u.id
       WHERE u.is_active = 1`
    )
    .all();

  // Compute weekly XP in JS
  const enriched = rows.map((row) => {
    let weeklyXP = 0;
    try {
      const log = JSON.parse(row.activity_log);
      for (const [date, xpAmt] of Object.entries(log)) {
        if (date >= mondayStr) weeklyXP += (xpAmt || 0);
      }
    } catch (_) {}
    return { ...row, xp: weeklyXP };
  });

  // Sort by weekly XP desc, then join date asc
  enriched.sort((a, b) => b.xp - a.xp || a.joined_at.localeCompare(b.joined_at));
  return enriched.slice(0, limit);
}

function getUserRank(userId) {
  const row = db
    .prepare(
      `SELECT COUNT(*) + 1 AS rank
       FROM users u
       LEFT JOIN progress p ON p.user_id = u.id
       WHERE u.is_active = 1
         AND COALESCE(p.xp_total, 0) > (
           SELECT COALESCE(xp_total, 0) FROM progress WHERE user_id = ?
         )`
    )
    .get(userId);
  return row ? row.rank : null;
}

// Public profile for any user (for the leaderboard profile modal)
function getUserPublicProfile(userId) {
  return db
    .prepare(
      `SELECT
        u.id, u.name, u.avatar, u.joined_at,
        COALESCE(p.xp_total, 0)                   AS xp,
        COALESCE(p.streak, 0)                     AS streak,
        COALESCE(p.last_visit, u.last_seen)       AS last_seen,
        COALESCE(json_array_length(p.completed_lessons), 0) AS lessons_count,
        COALESCE(bc.badge_count, 0)               AS badge_count
       FROM users u
       LEFT JOIN progress p ON p.user_id = u.id
       LEFT JOIN (
         SELECT user_id, COUNT(*) AS badge_count FROM badges GROUP BY user_id
       ) bc ON bc.user_id = u.id
       WHERE u.id = ? AND u.is_active = 1`
    )
    .get(userId);
}

// ── Named query helpers ───────────────────────────────────────────────────────

const queries = {
  // Users
  findUserByEmail: db.prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE'),
  findUserById:    db.prepare('SELECT id, name, email, avatar, joined_at, last_seen FROM users WHERE id = ?'),
  createUser:      db.prepare('INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)'),
  updateUserSeen:  db.prepare("UPDATE users SET last_seen = datetime('now') WHERE id = ?"),
  updateUserProfile: db.prepare('UPDATE users SET name = ?, avatar = ? WHERE id = ?'),

  // Progress
  getProgress:     db.prepare('SELECT * FROM progress WHERE user_id = ?'),
  createProgress:  db.prepare(
    'INSERT OR IGNORE INTO progress (user_id) VALUES (?)'
  ),
  updateProgress:  db.prepare(
    `UPDATE progress SET
       xp_total = ?, streak = ?, last_visit = ?,
       completed_lessons = ?, lesson_xp = ?, quiz_xp = ?,
       challenge_xp = ?, activity_log = ?,
       updated_at = datetime('now')
     WHERE user_id = ?`
  ),

  // Badges
  getUserBadges:   db.prepare('SELECT badge_id, earned_at FROM badges WHERE user_id = ?'),
  awardBadge:      db.prepare('INSERT OR IGNORE INTO badges (user_id, badge_id) VALUES (?, ?)'),
  hasBadge:        db.prepare('SELECT 1 FROM badges WHERE user_id = ? AND badge_id = ?'),
};

module.exports = { db, queries, getLeaderboard, getWeeklyLeaderboard, getUserRank, getUserPublicProfile };
