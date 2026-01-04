require('dotenv').config(); // Load environment variables first
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

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
// Cloud Run / Load Balancer Proxy Trust
app.set('trust proxy', 1);

const JWT_SECRET = process.env.JWT_SECRET || 'vitalcore-secret-key-change-this-production';

// --- Security Middleware ---
app.use(helmet({
    contentSecurityPolicy: false, // Allow inline scripts/images (Relaxed for now to prevent breaking UI)
    crossOriginResourcePolicy: { policy: "cross-origin" } // Allow resources to be loaded
}));

// CORS Configuration
const allowedOrigins = [
    'https://linteus.com',
    'https://www.linteus.com',
    'http://localhost:5173', // Local Dev
    'http://localhost:8080'  // Local Prod Test
];

// Add Cloud Run dynamically if needed, or allow all for now but prefer specific
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.run.app')) {
            callback(null, true);
        } else {
            console.warn('[CORS] External Access Blocked:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Rate Limiting
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Limit each IP to 300 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { error: 'Too many requests, please try again later.' }
});

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 7, // Limit each IP to 7 login/register attempts per hour
    message: { error: '비밀번호를 7회 이상 틀리셨습니다. 보안을 위해 잠금 처리되었으니 관리자에게 문의해주세요.' }
});

app.use('/api/', globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('dist'));
app.use('/img', express.static('img')); // Serve images

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
} else {
    console.log('[Server] Google Translate API Key is configured.');
}

const axios = require('axios');

app.post('/api/translate', async (req, res) => {
    try {
        const { text, targetLang } = req.body;
        if (!text) return res.json({ translatedText: '' });

        if (!TRANSLATE_API_KEY) {
            throw new Error('Server missing GOOGLE_TRANSLATE_API_KEY');
        }

        // 1. Extract Images (Base64 strings are too large for Google Translate API)
        const imgTags = [];
        // Match <img ... > tags. capturing the full tag.
        const cleanText = text.replace(/<img[^>]*>/g, (match) => {
            imgTags.push(match);
            return `__IMG_${imgTags.length - 1}__`; // Placeholder
        });

        // 2. Translate text content
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2`,
            {
                q: cleanText,
                target: targetLang,
                format: 'html' // Treat input as HTML to preserve other tags (b, i, p, etc.)
            },
            {
                params: { key: TRANSLATE_API_KEY },
                headers: { 'Content-Type': 'application/json' }
            }
        );

        if (response.data.error) {
            console.error('[Translation API Error]', response.data.error);
            return res.status(500).json({ error: response.data.error.message });
        }

        let translatedText = response.data.data.translations[0].translatedText;

        // 3. Restore Images
        // Google Translate might add spaces around the placeholder, e.g. "__ IMG_0 __"
        // We use a regex to be flexible with spaces around the marker
        translatedText = translatedText.replace(/__\s*IMG_(\d+)\s*__/g, (match, index) => {
            const i = parseInt(index);
            return imgTags[i] || ''; // Restore original <img ...> tag
        });

        res.json({ translatedText });
    } catch (e) {
        console.error('[Translation Server Error]', e.response ? e.response.data : e.message);
        res.status(500).json({
            error: e.message,
            details: e.response ? e.response.data : 'No details',
            keyConfigured: !!TRANSLATE_API_KEY
        });
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

    app.post('/api/auth/change-password', authenticateToken, (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const stmt = db.prepare('SELECT password FROM users WHERE id = ?');
            const user = stmt.get(req.user.id);

            if (!bcrypt.compareSync(currentPassword, user.password)) {
                return res.status(401).json({ error: 'Current password is incorrect' });
            }

            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, req.user.id);
            res.json({ message: 'Password changed successfully' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.post('/api/auth/reset-request', (req, res) => {
        try {
            const { email, name } = req.body;
            // Verify user exists and name matches (simple verification)
            const user = db.prepare('SELECT id FROM users WHERE email = ? AND name = ?').get(email, name);

            if (!user) {
                // Return success even if failed to prevent enumeration, or specific error if internal app
                return res.status(404).json({ error: 'User not found with matching name and email.' });
            }

            // Check if pending request exists
            const existing = db.prepare("SELECT id FROM password_resets WHERE user_id = ? AND status = 'pending'").get(user.id);
            if (existing) {
                return res.status(400).json({ error: 'A reset request is already pending.' });
            }

            db.prepare('INSERT INTO password_resets (user_id, email) VALUES (?, ?)').run(user.id, email);
            res.json({ message: 'Reset request submitted. Please contact admin for approval.' });
        } catch (e) { res.status(500).json({ error: e.message }); }
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
    app.get('/api/admin/users', authenticateToken, isAdmin, (req, res) => {
        try {
            const stmt = db.prepare('SELECT id, email, name, role, country, phone, created_at FROM users ORDER BY created_at DESC');
            res.json(stmt.all());
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // --- Admin Password Resets ---
    app.get('/api/admin/resets', authenticateToken, isAdmin, (req, res) => {
        try {
            const stmt = db.prepare(`
                SELECT pr.*, u.name as user_name 
                FROM password_resets pr 
                JOIN users u ON pr.user_id = u.id 
                WHERE pr.status = 'pending' 
                ORDER BY pr.created_at DESC
            `);
            res.json(stmt.all());
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.post('/api/admin/resets/:id/approve', authenticateToken, isAdmin, (req, res) => {
        try {
            const { id } = req.params;
            const resetRequest = db.prepare('SELECT user_id FROM password_resets WHERE id = ?').get(id);

            if (!resetRequest) return res.status(404).json({ error: 'Request not found' });

            // Set temporary password "vital1234"
            const tempPassword = bcrypt.hashSync('vital1234', 10);

            db.transaction(() => {
                db.prepare('UPDATE users SET password = ? WHERE id = ?').run(tempPassword, resetRequest.user_id);
                db.prepare("UPDATE password_resets SET status = 'completed' WHERE id = ?").run(id);
            })();

            res.json({ message: 'Password reset to default (vital1234)' });
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
            const stmt = db.prepare(`
                SELECT 
                    id, title, summary, key_point, image_url, views, created_at,
                    title_en, summary_en, key_point_en,
                    title_zh, summary_zh, key_point_zh,
                    title_ja, summary_ja, key_point_ja
                FROM health_reports 
                ORDER BY created_at DESC
            `);
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

    app.put('/api/notices/:id', authenticateToken, isAdmin, (req, res) => {
        try {
            const { id } = req.params;
            const {
                title, content, type, is_active,
                title_en, content_en,
                title_zh, content_zh,
                title_ja, content_ja
            } = req.body;

            const stmt = db.prepare(`
                UPDATE notices SET
                    title = ?, content = ?, type = ?, is_active = ?,
                    title_en = ?, content_en = ?,
                    title_zh = ?, content_zh = ?,
                    title_ja = ?, content_ja = ?
                WHERE id = ?
            `);

            stmt.run(
                title, content, type || 'normal', is_active !== undefined ? is_active : 1,
                title_en || '', content_en || '',
                title_zh || '', content_zh || '',
                title_ja || '', content_ja || '',
                id
            );
            res.json({ message: 'Notice updated' });
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

// --- Email Service (Nodemailer) ---
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Email Pw Reset 1: Request Link
app.post('/api/auth/forgot-password-email', async (req, res) => {
    const { email } = req.body;
    try {
        if (!db) return res.status(503).json({ error: 'Database unavailable' });
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const crypto = require('crypto');
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hr

        const stmt = db.prepare('INSERT INTO password_resets (user_id, email, status, token, expires_at) VALUES (?, ?, ?, ?, ?)');
        stmt.run(user.id, email, 'pending', token, expiresAt);

        const origin = 'https://linteus.com';
        const link = `${origin}?resetToken=${token}`;

        const mailOptions = {
            from: `"VitalCore" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Password Reset Request',
            html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${link}" style="display:inline-block;padding:12px 24px;background:#d97706;color:white;text-decoration:none;border-radius:4px;font-weight:bold;">Reset Password</a>
        <p>Expires in 1 hour.</p>
      `
        };
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Reset link sent' });
    } catch (err) {
        console.error('Email Error:', err);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Email Pw Reset 2: Reset
app.post('/api/auth/reset-password-email', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        if (!db) return res.status(503).json({ error: 'Database unavailable' });
        const request = db.prepare('SELECT * FROM password_resets WHERE token = ? AND status = "pending"').get(token);

        if (!request) return res.status(400).json({ error: 'Invalid or expired token' });
        if (new Date(request.expires_at) < new Date()) return res.status(400).json({ error: 'Token expired' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, request.user_id);
        db.prepare('UPDATE password_resets SET status = "completed" WHERE id = ?').run(request.id);

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

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
