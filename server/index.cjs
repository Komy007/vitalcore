const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

console.log('[Server] Starting Full Monolithic Server...');

// --- Database Loading (Soft Start) ---
console.log('[Server] Loading database module...');
let db;
try {
    db = require('./database.cjs');
    console.log('[Server] Database module loaded success.');
} catch (err) {
    console.error('[Server] CRITICAL FAIL: Could not load database:', err);
    // Soft Start: Continue without DB
    db = null;
}

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'vitalcore-secret-key-change-this-production';

app.use(cors());
app.use(express.json());

// --- Health Check (Critical) ---
app.get('/api/health', (req, res) => {
    res.status(200).send('OK (Full Monolith)');
});

// --- Middleware ---
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
    if (req.user && req.user.role === 'admin') next();
    else res.sendStatus(403);
};

// --- Database Guard Middleware ---
app.use((req, res, next) => {
    if (!db && req.path.startsWith('/api') && req.path !== '/api/health') {
        return res.status(503).json({ error: 'Database service unavailable' });
    }
    next();
});

// --- API Routes ---
if (db) {
    app.post('/api/auth/register', (req, res) => {
        try {
            const { email, password, name, country, phone } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const stmt = db.prepare('INSERT INTO users (email, password, name, country, phone) VALUES (?, ?, ?, ?, ?)');
            const info = stmt.run(email, hashedPassword, name, country, phone);
            const user = { id: info.lastInsertRowid, email, role: 'user', name };
            const token = jwt.sign(user, JWT_SECRET);
            res.json({ token, user });
        } catch (e) {
            if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') return res.status(400).json({ error: 'Email already exists' });
            res.status(500).json({ error: e.message });
        }
    });

    app.post('/api/auth/login', (req, res) => {
        try {
            const { email, password } = req.body;
            const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
            const user = stmt.get(email);
            if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid credentials' });
            const tokenUser = { id: user.id, email: user.email, role: user.role, name: user.name };
            const token = jwt.sign(tokenUser, JWT_SECRET);
            res.json({ token, user: tokenUser });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.get('/api/auth/me', authenticateToken, (req, res) => {
        const stmt = db.prepare('SELECT id, email, name, role, country, phone FROM users WHERE id = ?');
        const user = stmt.get(req.user.id);
        res.json(user);
    });

    app.get('/api/health-reports', (req, res) => {
        const stmt = db.prepare('SELECT id, title, summary, key_point, image_url, created_at, views FROM health_reports ORDER BY created_at DESC');
        res.json(stmt.all());
    });

    app.get('/api/health-reports/:id', (req, res) => {
        try {
            const { id } = req.params;
            db.prepare('UPDATE health_reports SET views = views + 1 WHERE id = ?').run(id);
            const report = db.prepare('SELECT * FROM health_reports WHERE id = ?').get(id);
            if (!report) return res.status(404).json({ error: 'Report not found' });
            res.json(report);
        } catch (e) { res.status(500).json({ error: e.message }); }
    });
}

// --- Serve Frontend ---
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '../dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(distPath, 'index.html'));
        }
    });
}

// --- Start Server ---
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`[Server] LISTENING on http://0.0.0.0:${port}`);
});
