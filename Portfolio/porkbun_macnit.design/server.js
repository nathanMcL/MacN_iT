const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { log } = require('console');

// Set the port to 443 for HTTPS (you can also use 3000 for testing)
const PORT = process.env.PORT || 443;

// Use absolute paths for the key and cert files
const keyPath = 'C:/Users/natha/MacNserver/macn_it/server.key';
const certPath = 'C:/Users/natha/MacNserver/macn_it/server.cert';

let options;

try {
    const key = fs.readFileSync(keyPath, 'utf8');
    console.log('server.key loaded successfully');
    const cert = fs.readFileSync(certPath, 'utf8');
    console.log('server.cert loaded successfully');
    options = {
        key: key,
        cert: cert
    };
} catch (err) {
    console.error('Error loading file:', err);
    process.exit(1); // Exit if the key or cert file cannot be loaded
}

// Define the MIME types for the different file types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

// Serve files securely
const serveFile = (filePath, res) => {
    // Check if the file exists before trying to stat or read it
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
        return;
    }

    // Handle directory requests by serving index.html
    if (fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath);
    const mimeType = mimeTypes[ext] || 'text/plain';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('500 Internal Server Error');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.write(data);
            res.end();
        }
    });
};

// Log request to monitor server activity errors
const logRequest = (req) => {
    const logData = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile('server.log', logData, (err) => {
        if (err) throw err;
    });
};

// Create the server
const server = https.createServer(options, (req, res) => {
    let parsedUrl = url.parse(req.url);
    let sanitizedPath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.join(__dirname, sanitizedPath);

    console.log('filePath:', filePath);
    console.log('__dirname:', __dirname);

    // Log the request
    logRequest(req);

    // Skip requests for favicon.ico if the file does not exist
    if (sanitizedPath === '/favicon.ico') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
        return;
    }

    // Security: Prevent directory traversal attacks
    if (!path.resolve(filePath).startsWith(path.resolve(__dirname))) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.write('403 Forbidden');
        res.end();
        return;
    }

    // Serve the requested file
    serveFile(filePath, res);
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
