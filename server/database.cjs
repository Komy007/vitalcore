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
    `);
  console.log('[Database] Schema initialized.');

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
