const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

console.log('[Server] Starting Full Monolithic Server (Safe Mode)...');

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
    global.dbLoadError = err;
}

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'vitalcore-secret-key-change-this-production';

app.use(cors());
app.use(express.json());

// --- Health Check (Critical) ---
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        mode: 'Monolith',
        db_connected: !!db
    });
});

// --- Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access token required' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') next();
    else res.status(403).json({ error: 'Admin access required' });
};

// --- Database Guard Middleware ---
app.use((req, res, next) => {
    if (!db && req.path.startsWith('/api') && req.path !== '/api/health') {
        const errorMsg = global.dbLoadError ? (global.dbLoadError.message + '\n' + global.dbLoadError.stack) : 'Unknown DB Error';
        return res.status(503).json({ error: 'Database service unavailable', details: errorMsg });
    }
    next();
});

// --- API Routes ---
if (db) {
    // 1. Auth
    app.post('/api/auth/register', (req, res) => {
        try {
            const { email, password, name, country, phone } = req.body;
            if (!email || !password || !name) return res.status(400).json({ error: 'Missing required fields' });

            const hashedPassword = bcrypt.hashSync(password, 10);
            const stmt = db.prepare('INSERT INTO users (email, password, name, country, phone) VALUES (?, ?, ?, ?, ?)');
            const info = stmt.run(email, hashedPassword, name, country, phone);
            const user = { id: info.lastInsertRowid, email, role: 'user', name };
            const token = jwt.sign(user, JWT_SECRET);
            res.json({ token, user });
        } catch (e) {
            console.error('[Register Error]', e);
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
        } catch (e) {
            console.error('[Login Error]', e);
            res.status(500).json({ error: e.message });
        }
    });

    app.get('/api/auth/me', authenticateToken, (req, res) => {
        try {
            const stmt = db.prepare('SELECT id, email, name, role, country, phone FROM users WHERE id = ?');
            const user = stmt.get(req.user.id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json(user);
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // 2. Health Reports (Blog Style)
    app.get('/api/health-reports', (req, res) => {
        try {
            const stmt = db.prepare('SELECT id, title, summary, key_point, image_url, created_at, views FROM health_reports ORDER BY created_at DESC');
            res.json(stmt.all());
        } catch (e) { res.status(500).json({ error: e.message }); }
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

    // Create Report (Admin Only)
    app.post('/api/health-reports', authenticateToken, isAdmin, (req, res) => {
        try {
            const { title, content, summary, key_point, image_url } = req.body;
            if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

            const stmt = db.prepare('INSERT INTO health_reports (title, content, summary, key_point, image_url) VALUES (?, ?, ?, ?, ?)');
            const info = stmt.run(title, content, summary || '', key_point || '', image_url || '');
            res.json({ id: info.lastInsertRowid, message: 'Report created successfully' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // 3. Questions (Q&A)
    app.get('/api/questions', (req, res) => {
        try {
            // Get all questions with user info
            const stmt = db.prepare(`
                SELECT q.*, u.name as user_name 
                FROM questions q 
                JOIN users u ON q.user_id = u.id 
                ORDER BY q.created_at DESC
            `);
            const questions = stmt.all();

            // Filter logic: 
            // - Public (is_secret=0): Visible to everyone
            // - Secret (is_secret=1): Visible only to Admin OR the Author
            // Use header token to determine current user (optional for public viewing)
            const authHeader = req.headers['authorization'];
            let currentUserId = null;
            let isAdminUser = false;

            if (authHeader) {
                const token = authHeader.split(' ')[1];
                try {
                    const decoded = jwt.verify(token, JWT_SECRET);
                    currentUserId = decoded.id;
                    isAdminUser = decoded.role === 'admin';
                } catch (e) { /* ignore invalid token for listing */ }
            }

            const filtered = questions.map(q => {
                if (q.is_secret === 0) return q; // Public
                if (isAdminUser || (currentUserId && q.user_id === currentUserId)) return q; // Authorized
                // Mask secret content
                return {
                    ...q,
                    title: 'Secret Question',
                    content: 'This content is private.',
                    answer: q.answer ? 'This answer is private.' : null,
                    is_accessible: false
                };
            });

            res.json(filtered);
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.put('/api/questions/:id', authenticateToken, (req, res) => {
        try {
            const { id } = req.params;
            const { title, content, is_secret } = req.body;

            // Verify ownership
            const existing = db.prepare('SELECT user_id FROM questions WHERE id = ?').get(id);
            if (!existing) return res.status(404).json({ error: 'Question not found' });
            if (existing.user_id !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized' });
            }

            const stmt = db.prepare('UPDATE questions SET title = ?, content = ?, is_secret = ? WHERE id = ?');
            stmt.run(title, content, is_secret ? 1 : 0, id);
            res.json({ message: 'Question updated' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.post('/api/questions', authenticateToken, (req, res) => {
        try {
            const { title, content, is_secret } = req.body;
            console.log(`[Q&A] Received submission from User ${req.user.id}: ${title} (Secret: ${is_secret})`);

            if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

            const stmt = db.prepare('INSERT INTO questions (user_id, title, content, is_secret) VALUES (?, ?, ?, ?)');
            const info = stmt.run(req.user.id, title, content, is_secret ? 1 : 0);

            console.log(`[Q&A] Created Question ID: ${info.lastInsertRowid}`);
            res.json({ id: info.lastInsertRowid, message: 'Question created' });
        } catch (e) {
            console.error('[Q&A] Submission Error:', e);
            res.status(500).json({ error: e.message });
        }
    });

    app.delete('/api/questions/:id', authenticateToken, (req, res) => {
        try {
            const { id } = req.params;

            // Verify ownership
            const existing = db.prepare('SELECT user_id FROM questions WHERE id = ?').get(id);
            if (!existing) return res.status(404).json({ error: 'Question not found' });

            if (existing.user_id !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized' });
            }

            const stmt = db.prepare('DELETE FROM questions WHERE id = ?');
            stmt.run(id);
            res.json({ message: 'Question deleted' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // Answer Question (Admin Only)
    app.post('/api/questions/:id/answer', authenticateToken, isAdmin, (req, res) => {
        try {
            const { id } = req.params;
            const { answer } = req.body;
            const stmt = db.prepare('UPDATE questions SET answer = ? WHERE id = ?');
            stmt.run(answer, id);
            res.json({ message: 'Answer updated' });
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
