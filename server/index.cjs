const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./database.cjs');

const path = require('path');
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'vitalcore-secret-key-change-this-production'; // Use env var

app.use(cors());
app.use(express.json());

// Serve Static Files (React Build) for Cloud Run / Production
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../dist')));
}

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
};

// --- Auth Routes ---

app.post('/api/auth/register', (req, res) => {
    const { email, password, name, country, phone } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const stmt = db.prepare('INSERT INTO users (email, password, name, country, phone) VALUES (?, ?, ?, ?, ?)');
        const info = stmt.run(email, hashedPassword, name, country, phone);

        // Auto login after register
        const user = { id: info.lastInsertRowid, email, role: 'user', name };
        const token = jwt.sign(user, JWT_SECRET);
        res.json({ token, user });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokenUser = { id: user.id, email: user.email, role: user.role, name: user.name };
    const token = jwt.sign(tokenUser, JWT_SECRET);
    res.json({ token, user: tokenUser });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
    const stmt = db.prepare('SELECT id, email, name, role, country, phone FROM users WHERE id = ?');
    const user = stmt.get(req.user.id);
    res.json(user);
});

// --- User Management (Admin) ---

app.get('/api/users', authenticateToken, isAdmin, (req, res) => {
    const stmt = db.prepare('SELECT id, email, name, country, phone, role, created_at FROM users');
    const users = stmt.all();
    res.json(users);
});

app.delete('/api/users/:id', authenticateToken, isAdmin, (req, res) => {
    // Prevent deleting self? Maybe.
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
});

app.put('/api/users/:id/password', authenticateToken, isAdmin, (req, res) => {
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('UPDATE users SET password = ? WHERE id = ?');
    stmt.run(hashedPassword, req.params.id);
    res.json({ success: true });
});



// --- Health Report Routes ---

app.get('/api/health-reports', (req, res) => {
    const stmt = db.prepare('SELECT id, title, summary, key_point, image_url, created_at, views FROM health_reports ORDER BY created_at DESC');
    const reports = stmt.all();
    res.json(reports);
});

app.get('/api/health-reports/:id', (req, res) => {
    const { id } = req.params;

    // Increment view count
    const update = db.prepare('UPDATE health_reports SET views = views + 1 WHERE id = ?');
    update.run(id);

    const stmt = db.prepare('SELECT * FROM health_reports WHERE id = ?');
    const report = stmt.get(id);

    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
});

app.post('/api/health-reports', authenticateToken, isAdmin, (req, res) => {
    const { title, content, summary, key_point, image_url } = req.body;
    const stmt = db.prepare('INSERT INTO health_reports (title, content, summary, key_point, image_url) VALUES (?, ?, ?, ?, ?)');
    stmt.run(title, content, summary, key_point, image_url);
    res.json({ success: true });
});

// --- Q&A Routes ---

app.get('/api/qna', (req, res) => {
    // Public endpoint but filters secrets if not owner/admin? 
    // Easier: Fetch all, frontend hides content? No, insecure.
    // Better: If has token, show own secrets + public. If admin, show all.

    // Implementation for simplicity: Just list all public. Authenticated users can see their own secrets via separate call or logic here.
    // Let's make it simple: This endpoint returns LIST of questions.
    // Content of secret questions is hidden unless it's yours or you are admin.

    const authHeader = req.headers['authorization'];
    let user = null;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try { user = jwt.verify(token, JWT_SECRET); } catch (e) { }
    }

    const stmt = db.prepare(`
    SELECT q.id, q.title, q.is_secret, q.created_at, q.answer, u.name as author_name, q.user_id,
    CASE 
      WHEN q.is_secret = 0 THEN q.content
      WHEN ? = 'admin' THEN q.content 
      WHEN q.user_id = ? THEN q.content
      ELSE 'Non-visible content' 
    END as content
    FROM questions q
    JOIN users u ON q.user_id = u.id
    ORDER BY q.created_at DESC
  `);

    const role = user ? user.role : '';
    const userId = user ? user.id : 0;

    const questions = stmt.all(role, userId);
    res.json(questions);
});

app.post('/api/qna', authenticateToken, (req, res) => {
    const { title, content, is_secret } = req.body;
    const stmt = db.prepare('INSERT INTO questions (user_id, title, content, is_secret) VALUES (?, ?, ?, ?)');
    stmt.run(req.user.id, title, content, is_secret ? 1 : 0);
    res.json({ success: true });
});

// Admin Answer
app.put('/api/qna/:id/answer', authenticateToken, isAdmin, (req, res) => {
    const { answer } = req.body;
    const stmt = db.prepare('UPDATE questions SET answer = ? WHERE id = ?');
    stmt.run(answer, req.params.id);
    res.json({ success: true });
});


// Start Server
// Use PORT env (Cloud Run requirement) or default 8080
const port = process.env.PORT || 8080;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
