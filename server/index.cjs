const express = require('express');

console.log('[Server] Require Express success.');
console.log('[Server] Starting Express Hello World...');

const app = express();
const port = parseInt(process.env.PORT) || 8080;

app.get('*', (req, res) => {
    console.log(`[Server] Request: ${req.url}`);
    res.send('Hello from Express! (No DB, No Static)');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`[Server] Express listening on http://0.0.0.0:${port}`);
});
