const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// --- Database Path Configuration ---
// Cloud Run filesystem is read-only except for /tmp.
// For production, we use /tmp/vitalcore.db.
// For development, we use ./data/vitalcore.db (relative to this file).

let dbPath;
// Check for Cloud Run environment variables or Production mode
if (process.env.NODE_ENV === 'production' || process.env.K_SERVICE || process.env.PORT) {
  // Cloud Run / Production -> Use /tmp (Writable)
  dbPath = path.join('/tmp', 'vitalcore.db');
  console.log('[Database] Running in Production/Cloud Run mode. Using /tmp');
} else {
  // Local Development -> Use ./data
  const dbDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log(`Created local database directory: ${dbDir}`);
    } catch (err) {
      console.error('Error creating database directory:', err);
    }
  }
  dbPath = path.join(dbDir, 'vitalcore.db');
  console.log('[Database] Running in Development mode. Using ./data');
}

console.log(`[Database] Initializing SQLite at: ${dbPath}`);

let db;
try {
  db = new Database(dbPath, { verbose: console.log });
  console.log('[Database] Connection successful.');

  // --- Initialize Schema ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      country TEXT,
      phone TEXT,
      role TEXT DEFAULT 'user', -- 'admin' or 'user'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      is_secret INTEGER DEFAULT 0, -- 0: public, 1: secret
      answer TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS health_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      summary TEXT,
      key_point TEXT,
      image_url TEXT,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS notices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('[Database] Schema initialized.');

  // --- Migrations for Multi-Language Support ---

  const tableInfo = db.prepare("PRAGMA table_info(health_reports)").all();
  const columns = tableInfo.map(c => c.name);
  // ... logic for health reports ...

  // Migrations for Notices
  const noticeInfo = db.prepare("PRAGMA table_info(notices)").all();
  const noticeCols = noticeInfo.map(c => c.name);

  const languages = ['en', 'zh', 'ja'];
  const fields = ['title', 'content'];

  languages.forEach(lang => {
    fields.forEach(field => {
      const colName = `${field}_${lang}`;
      if (!noticeCols.includes(colName)) {
        console.log(`[Database] Adding column ${colName} to notices...`);
        db.prepare(`ALTER TABLE notices ADD COLUMN ${colName} TEXT`).run();
      }
    });
  });

  // Migration for Notice Type
  if (!noticeCols.includes('type')) {
    console.log('[Database] Adding column type to notices...');
    db.prepare("ALTER TABLE notices ADD COLUMN type TEXT DEFAULT 'normal'").run(); // 'normal', 'banner', 'popup'
  }
  if (!noticeCols.includes('is_active')) {
    console.log('[Database] Adding column is_active to notices...');
    db.prepare("ALTER TABLE notices ADD COLUMN is_active INTEGER DEFAULT 1").run();
  }
  try {
    const tableInfo = db.prepare("PRAGMA table_info(health_reports)").all();
    const columns = tableInfo.map(c => c.name);

    const languages = ['en', 'zh', 'ja'];
    const fields = ['title', 'content', 'summary', 'key_point'];

    languages.forEach(lang => {
      fields.forEach(field => {
        const colName = `${field}_${lang}`;
        if (!columns.includes(colName)) {
          console.log(`[Database] Adding column ${colName} to health_reports...`);
          db.prepare(`ALTER TABLE health_reports ADD COLUMN ${colName} TEXT`).run();
        }
      });
    });
  } catch (err) {
    console.error('[Database] Migration Failed:', err);
  }

  // --- Seed Data (Welcome Question) ---
  try {
    const count = db.prepare('SELECT count(*) as count FROM questions').get();
    if (count && count.count === 0) {
      // Need a dummy user first
      db.exec("INSERT OR IGNORE INTO users (id, email, password, name, role) VALUES (1, 'system@vitalcore.com', 'system', 'VitalCore Admin', 'admin')");
      // db.exec("INSERT INTO questions (user_id, title, content, is_secret, answer) VALUES (1, 'Welcome to Vital Core Q&A', 'This is a test question to verify the database connection. If you see this, the system is working!', 0, 'Welcome! Feel free to ask any questions.')");
      console.log('[Database] System User Checked.');
    }
  } catch (e) {
    console.error('[Database] Failed to insert welcome question:', e);
  }

  // --- Create Default Admin ---
  const createAdmin = () => {
    const adminEmail = 'cambodia.bae@gmail.com';
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const admin = stmt.get(adminEmail);

    if (!admin) {
      const hashedPassword = bcrypt.hashSync('123456', 10);
      const insert = db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)');
      insert.run(adminEmail, hashedPassword, 'Admin', 'admin');
      console.log('[Database] Default admin account created.');
    }
  };
  createAdmin();

} catch (err) {
  console.error('[Database] Initialization FAILED:', err);
  // Do NOT exit here. Throw error so index.cjs can catch it and Soft Start.
  throw err;
}

module.exports = db;
