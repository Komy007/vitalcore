const http = require('http');

console.log('[Server] Starting Zero-Dependency HTTP Server...');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    console.log(`[Server] Request received: ${req.url}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Cloud Run is working! Native HTTP Server active.\n');
});

server.listen(port, '0.0.0.0', () => {
    console.log(`[Server] LISTENING on http://0.0.0.0:${port}`);
});

// Prevent process from closing instantly
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});
