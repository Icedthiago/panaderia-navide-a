const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};
function serveStatic(filePath, res) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 - Not Found');
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('500 - Internal Server Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  });
}
const server = http.createServer((req, res) => {
  // Prevent path traversal
  const safePath = path.normalize(decodeURIComponent(req.url)).replace(/^\.+/, '');
  let requested = safePath.split('?')[0];
  if (requested === '/' || requested === '') requested = '/index.html';
  const filePath = path.join(__dirname, requested);
  serveStatic(filePath, res);
});



server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});