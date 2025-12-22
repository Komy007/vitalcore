const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const db = new Database(path.join(dbDir, 'vitalcore.db'));

// Initialize Schema
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
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create Default Admin if not exists
const createAdmin = () => {
  const adminEmail = 'cambodia.bae@gmail.com';
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const admin = stmt.get(adminEmail);

  if (!admin) {
    const hashedPassword = bcrypt.hashSync('123456', 10);
    const insert = db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)');
    insert.run(adminEmail, hashedPassword, 'Admin', 'admin');
    console.log('Default admin account created.');
  }
};

createAdmin();

module.exports = db;
