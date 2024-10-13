const express = require('express');
const next = require('next');
const https = require('https');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        // Serve your Next.js app
        server.all('*', (req, res) => {
            return handle(req, res);
        });

        const httpsOptions = {
            key: fs.readFileSync('sslCert/server.key'),
            cert: fs.readFileSync('sslCert/server.crt'),
        };

        https.createServer(httpsOptions, server).listen(PORT, (err) => {
            if (err) throw err;
            console.log(`> Ready on https://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error starting server:', error);
    });
