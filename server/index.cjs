const express = require('express');
const app = express();
const port = parseInt(process.env.PORT) || 8080;

console.log('[Server] Starting "Hello World" Isolation Mode...');

app.get('*', (req, res) => {
    console.log(`[Server] Request received: ${req.url}`);
    res.send('Hello from Cloud Run! Infrastructure is Healthy.');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`[Server] LISTENING on http://0.0.0.0:${port}`);
});
