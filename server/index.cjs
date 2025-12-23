const express = require('express');
const cors = require('cors');
const path = require('path');

console.log('[Server] Starting Minimal Server (No DB Mode)...');

const app = express();
const port = parseInt(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
    console.log('[Server] Health check requested');
    res.status(200).send('OK (Minimal Mode)');
});

// Mock API routes to prevent frontend crashes
app.use((req, res, next) => {
    if (req.path.startsWith('/api') && req.path !== '/api/health') {
        res.status(503).json({
            error: 'System Maintenance',
            message: 'Database is temporarily disabled for deployment debugging.'
        });
        return;
    }
    next();
});

// Serve Static Files
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '../dist');
    console.log(`[Server] Serving static files from: ${distPath}`);
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(distPath, 'index.html'));
        }
    });
}

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`[Server] LISTENING on http://0.0.0.0:${port}`);
    console.log('[Server] Ready to handle requests.');
});
