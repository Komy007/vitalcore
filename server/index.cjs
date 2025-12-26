require('dotenv').config(); // Load environment variables first
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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// --- Health Check (Critical) ---
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        mode: 'Monolith',
        db_connected: !!db
    });
});

// Ensure API Key is loaded
const TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

if (!TRANSLATE_API_KEY) {
    console.warn('[Server] WARNING: GOOGLE_TRANSLATE_API_KEY is not set in .env. Translation features will fail.');
}

app.post('/api/translate', async (req, res) => {
    try {
        const { text, targetLang } = req.body;
        if (!text) return res.json({ translatedText: '' });

        // Dynamic import for node-fetch if needed, or use global fetch (Node 18+)
        const fetch = global.fetch || (await import('node-fetch')).default;

        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: text,
                target: targetLang,
                format: 'text'
            })
        });

        const data = await response.json();
        if (data.error) {
            console.error('[Translation API Error]', data.error);
            return res.status(500).json({ error: data.error.message });
        }

        const translatedText = data.data.translations[0].translatedText;
        res.json({ translatedText });
    } catch (e) {
        console.error('[Translation Server Error]', e);
        res.status(500).json({ error: e.message });
    }
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

    // --- Admin User Management ---
    app.get('/api/users', authenticateToken, isAdmin, (req, res) => {
        try {
            const stmt = db.prepare('SELECT id, email, name, role, country, phone, created_at FROM users ORDER BY created_at DESC');
            res.json(stmt.all());
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.put('/api/users/:id', authenticateToken, isAdmin, (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, role, password, country, phone } = req.body;

            // Optional Password Update
            if (password) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                const stmt = db.prepare('UPDATE users SET name = ?, email = ?, role = ?, password = ?, country = ?, phone = ? WHERE id = ?');
                stmt.run(name, email, role, hashedPassword, country, phone, id);
            } else {
                const stmt = db.prepare('UPDATE users SET name = ?, email = ?, role = ?, country = ?, phone = ? WHERE id = ?');
                stmt.run(name, email, role, country, phone, id);
            }
            res.json({ message: 'User updated successfully' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.delete('/api/users/:id', authenticateToken, isAdmin, (req, res) => {
        try {
            const { id } = req.params;
            if (parseInt(id) === req.user.id) return res.status(400).json({ error: 'Cannot delete yourself' });

            db.prepare('DELETE FROM questions WHERE user_id = ?').run(id); // Delete user's questions first
            db.prepare('DELETE FROM users WHERE id = ?').run(id);
            res.json({ message: 'User deleted successfully' });
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
            const {
                title, content, summary, key_point, image_url,
                title_en, content_en, summary_en, key_point_en,
                title_zh, content_zh, summary_zh, key_point_zh,
                title_ja, content_ja, summary_ja, key_point_ja
            } = req.body;

            if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

            const stmt = db.prepare(`
              INSERT INTO health_reports (
                title, content, summary, key_point, image_url,
                title_en, content_en, summary_en, key_point_en,
                title_zh, content_zh, summary_zh, key_point_zh,
                title_ja, content_ja, summary_ja, key_point_ja
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            const info = stmt.run(
                title, content, summary || '', key_point || '', image_url || '',
                title_en || '', content_en || '', summary_en || '', key_point_en || '',
                title_zh || '', content_zh || '', summary_zh || '', key_point_zh || '',
                title_ja || '', content_ja || '', summary_ja || '', key_point_ja || ''
            );
            res.json({ id: info.lastInsertRowid, message: 'Report created successfully' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // Update Report (Admin Only)
    app.put('/api/health-reports/:id', authenticateToken, isAdmin, (req, res) => {
        try {
            const { id } = req.params;
            const {
                title, content, summary, key_point, image_url,
                title_en, content_en, summary_en, key_point_en,
                title_zh, content_zh, summary_zh, key_point_zh,
                title_ja, content_ja, summary_ja, key_point_ja
            } = req.body;

            if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

            const stmt = db.prepare(`
              UPDATE health_reports SET 
                title = ?, content = ?, summary = ?, key_point = ?, image_url = ?,
                title_en = ?, content_en = ?, summary_en = ?, key_point_en = ?,
                title_zh = ?, content_zh = ?, summary_zh = ?, key_point_zh = ?,
                title_ja = ?, content_ja = ?, summary_ja = ?, key_point_ja = ?
              WHERE id = ?
            `);

            stmt.run(
                title, content, summary || '', key_point || '', image_url || '',
                title_en || '', content_en || '', summary_en || '', key_point_en || '',
                title_zh || '', content_zh || '', summary_zh || '', key_point_zh || '',
                title_ja || '', content_ja || '', summary_ja || '', key_point_ja || '',
                id
            );
            res.json({ message: 'Report updated successfully' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // Delete Report (Admin Only)
    app.delete('/api/health-reports/:id', authenticateToken, isAdmin, (req, res) => {
        try {
            const { id } = req.params;
            db.prepare('DELETE FROM health_reports WHERE id = ?').run(id);
            res.json({ message: 'Report deleted' });
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
            res.json({ id: info.lastInsertRowid, message: 'Question submitted' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // 4. Admin Answer (Special PUT)
    app.put('/api/questions/:id/answer', authenticateToken, isAdmin, (req, res) => {
        try {
            const { id } = req.params;
            const { answer } = req.body;
            db.prepare('UPDATE questions SET answer = ? WHERE id = ?').run(answer, id);
            res.json({ message: 'Answer updated' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.delete('/api/questions/:id', authenticateToken, (req, res) => {
        try {
            const { id } = req.params;
            const q = db.prepare('SELECT user_id FROM questions WHERE id = ?').get(id);
            if (!q) return res.status(404).json({ error: 'Question not found' });

            if (q.user_id !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized' });
            }

            db.prepare('DELETE FROM questions WHERE id = ?').run(id);
            res.json({ message: 'Question deleted' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // 4. Admin Notices
    app.get('/api/notices', (req, res) => {
        try {
            const notices = db.prepare('SELECT * FROM notices ORDER BY created_at DESC').all();
            res.json(notices);
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.post('/api/notices', authenticateToken, isAdmin, (req, res) => {
        try {
            const {
                title, content, type, is_active,
                title_en, content_en,
                title_zh, content_zh,
                title_ja, content_ja
            } = req.body;

            if (!title || !content) return res.status(400).json({ error: 'Title and content required' });

            const stmt = db.prepare(`
                INSERT INTO notices (
                    title, content, type, is_active,
                    title_en, content_en,
                    title_zh, content_zh,
                    title_ja, content_ja
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);
            const info = stmt.run(
                title, content, type || 'normal', is_active !== undefined ? is_active : 1,
                title_en || '', content_en || '',
                title_zh || '', content_zh || '',
                title_ja || '', content_ja || ''
            );
            res.json({ id: info.lastInsertRowid });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.delete('/api/notices/:id', authenticateToken, isAdmin, (req, res) => {
        try {
            db.prepare('DELETE FROM notices WHERE id = ?').run(req.params.id);
            res.json({ message: 'Notice deleted' });
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

            // --- Security & Moderation ---
            if (req.user.role !== 'admin') {
                // 1. Rate Limit (Cool-down 3 minutes)
                const lastQ = db.prepare("SELECT (strftime('%s','now') - strftime('%s', created_at)) as diff FROM questions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1").get(req.user.id);
                if (lastQ && lastQ.diff < 180) { // 180 seconds = 3 minutes
                    return res.status(429).json({ error: 'Please wait 3 minutes before posting again (Anti-Spam).' });
                }

                // 2. Daily Quota (Max 5 per day)
                const dailyCount = db.prepare("SELECT count(*) as count FROM questions WHERE user_id = ? AND date(created_at) = date('now')").get(req.user.id);
                if (dailyCount && dailyCount.count >= 5) {
                    return res.status(429).json({ error: 'You have reached the daily limit of 5 questions.' });
                }

                // 3. Duplication Check
                const dupCheck = db.prepare('SELECT count(*) as count FROM questions WHERE user_id = ? AND title = ? AND content = ?').get(req.user.id, title, content);
                if (dupCheck && dupCheck.count > 0) {
                    return res.status(400).json({ error: 'You have already posted this exact question.' });
                }

                // 4. Content Filter (Ads, Links, Bad Words)
                const BAD_WORDS = ['sex', 'porn', 'casino', 'gambling', 'viagra', '섹스', '포르노', '카지노', '도박', '바카라', '비아그라', '성인용품', '조건만남', '19금'];
                const SPAM_PATTERN = /https?:\/\/|www\.|[a-zA-Z0-9-]+\.(com|net|org|xyz|info|biz|ru)|010-\d{3,4}-\d{4}|\+82/i;

                const combinedText = (title + ' ' + content).toLowerCase();
                const hasBadWord = BAD_WORDS.some(w => combinedText.includes(w));
                const hasSpamLink = SPAM_PATTERN.test(combinedText);

                if (hasBadWord || hasSpamLink) {
                    console.warn(`[Moderation] Blocked content from User ${req.user.id}. Title: ${title}`);
                    return res.status(400).json({ error: 'Post rejected: Contains prohibited words, links, or contact info.' });
                }
            }

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
